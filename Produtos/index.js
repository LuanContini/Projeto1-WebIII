const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Dados em memória
let produtos = {};

// Rota para obter produtos
app.get("/produtos", (req, res) => {
  res.send(produtos);
});

// Rota para criar um novo produto
app.post("/produtos/", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { nome, preco } = req.body;

  produtos[id] = { id, nome, preco };

  // Enviando evento para o Event Bus
  try {
    await axios.post("http://localhost:4005/events", {
      type: "ProdutoCreated",
      dados: { id, nome, preco },
    });
    return res.status(201).send(produtos[id]);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Rota para receber eventos
app.post("/events", (req, res) => {
  const { type } = req.body;

  res.send(`Evento ${type} recebido`);
});

// Iniciando o servidor
app.listen(4000, () => {
  console.log("ProdutoService listening on port 4000");
});
