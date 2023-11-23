const express = require("express");
const cors = require("cors");
const {routes}  = require("./routers");

const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.id_user = '';
  next();
});

app.use(routes);

app.get("/", (req, res) => {
  res.json("Bem Vindo ao Backend -  Desafio Técnico 2")
});

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ status: "erro", message: "Erro interno do Servidor" });
});

app.listen(port, () => console.log("Servidor rodando"));