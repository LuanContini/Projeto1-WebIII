const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let pedidos = {};

// Rota para obter pedidos
app.get("/pedidos", (req, res) => {
  res.send(pedidos);
});

// Rota para criar um novo pedido
app.post("/pedidos", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { produto, quantidade } = req.body;
  const dataAtual = new Date().toISOString();

  pedidos[id] = {
    id,
    nome: produto,
    quantidade,
    dataAtual,
  };

  // Enviando evento para o Event Bus
  await axios.post("http://localhost:4005/events", {
    type: "PedidoCreated",
    id,
    nome: produto,
    dataAtual,
  });

  res.status(201).send(pedidos[id]);
});

let produtosRecebidos = {};

// Rota para receber eventos
app.post("/events", (req, res) => {
  const { type, dados } = req.body;

  if (type === "ProdutoCreated") {
    const { id, nome, preco } = dados;
    produtosRecebidos[id] = { id, nome, preco };
  }

  res.send({ status: "OK" });
});

// Iniciando o servidor
app.listen(4001, () => {
  console.log("PedidoService listening on port 4001");
});
