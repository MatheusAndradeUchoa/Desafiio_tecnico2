const { prisma } = require('../../database/PrismaClient');


    async function BuscarCliente( id_user ) {
        console.log(id_user)
      try {
        const res = await prisma.user.findUnique({
          where: {
            id: id_user
          },
        });
  
        return res;

      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        throw error;
      }
    }

  
  module.exports =  {BuscarCliente} ;