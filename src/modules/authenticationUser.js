const { verify } = require("jsonwebtoken");

async function AutenticacaoCliente(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não existe" });
  }

  const [, token] = authHeader.split(" ");
  
  try {
    const { sub } = verify(token, "chavesecreta");
    
    req.id_user = sub;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = AutenticacaoCliente;