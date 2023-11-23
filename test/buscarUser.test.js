const { prisma } = require('../src/database/PrismaClient')
const { BuscarCliente } = require('../src/modules/findUser/findUser');

jest.mock('../src/database/PrismaClient', () => {
    const originalModule = jest.requireActual('../src/database/PrismaClient');
    return {
      ...originalModule,
      prisma: {
        ...originalModule.prisma,
        user: {
          findUnique: jest.fn(),
        },
      },
    };
  });
  
  describe('BuscarCliente', () => {
    test('Deve buscar um cliente pelo ID', async () => {
      const mockUser = {
        id: 1,
        nome: 'Teste Usuario',
        email: 'teste@email.com',
        senha: 'senha123',
        telefone: [],
      };
  
      
      prisma.user.findUnique.mockResolvedValue(mockUser);
  
      const userId = 1;
      const result = await BuscarCliente(userId);
  
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
  
      expect(result).toEqual(mockUser);
    });
  
    test('Deve retornar null ao buscar um cliente inexistente', async () => {
      
      prisma.user.findUnique.mockResolvedValue(null);
  
      const userId = 2; 
      const result = await BuscarCliente(userId);
  
      expect(result).toBeNull();
    });
  
    
  });
  