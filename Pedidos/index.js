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
  console.log("GET /pedidos chamado");
  res.send(pedidos);
});

// Rota para criar um novo pedido
app.post("/pedidos", async (req, res) => {
  console.log("POST /pedidos chamado com body:", req.body);
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
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PedidoCreated",
      id,
      nome: produto,
      dataAtual,
    });
    console.log("Evento PedidoCreated enviado");
    res.status(201).send(pedidos[id]);
  } catch (err) {
    console.error("Erro ao enviar evento PedidoCreated:", err.message);
  }
});

let produtosRecebidos = {};

// Rota para receber eventos
app.post("/events", (req, res) => {
  console.log("Evento recebido no PedidoService:", req.body);
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
