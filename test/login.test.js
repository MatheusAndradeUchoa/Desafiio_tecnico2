const { Login } = require('../src/modules/Login/Login');
const { prisma } = require('../src/database/PrismaClient');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

jest.mock('../src/database/PrismaClient', () => {
    const originalModule = jest.requireActual('../src/database/PrismaClient');
    return {
      ...originalModule,
      prisma: {
        ...originalModule.prisma,
        user: {
          findFirst: jest.fn(),
          update: jest.fn(),
        },
      },
    };
  });
  jest.mock('bcrypt');
  jest.mock('jsonwebtoken');
  
  describe('Login', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Deve autenticar um usuário com sucesso', async () => {
      const loginInstance = new Login();
  
    
      prisma.user.findFirst.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        senha: 'hashedPassword',
        ultimoLogin: null,
      });
  
     
      compare.mockResolvedValue(true);
  
     
      prisma.user.update.mockResolvedValue({
        id: 1,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
        ultimoLogin: new Date(),
      });
  
      
      sign.mockReturnValue('mockedToken');
  
      const result = await loginInstance.execute({
        senha: 'userPassword',
        email: 'test@example.com',
      });
  
    
      expect(sign).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        'chavesecreta',
        {
          subject: 1,
          expiresIn: '1d',
        }
      );
  
     
    });
  
    test('Deve retornar erro se o email não for encontrado', async () => {
      const loginInstance = new Login();
  
    
      prisma.user.findFirst.mockResolvedValue(null);
  
      const result = await loginInstance.execute({
        senha: 'userPassword',
        email: 'nonexistent@example.com',
      });
  
      expect(result).toEqual(new Error('email não encotrado'));
    });
  
    test('Deve retornar erro se a senha for inválida', async () => {
      const loginInstance = new Login();
  
    
      prisma.user.findFirst.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        senha: 'hashedPassword',
        ultimoLogin: null,
      });
  
      
      compare.mockResolvedValue(false);
  
      const result = await loginInstance.execute({
        senha: 'invalidPassword',
        email: 'test@example.com',
      });
  
      expect(result).toEqual(new Error('email de usuário ou senha inválido'));
    });
  });