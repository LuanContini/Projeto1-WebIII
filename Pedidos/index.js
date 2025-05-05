const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*
    pedidos = {
        id: <String/Hex>,
        produto: <String>,
        quantidade: <Int>
    }
*/

let pedidos = {};

app.get("/pedidos", (req, res) => {
  res.send(pedidos);
});

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

  await axios.post("http://localhost:4005/events", {
    type: "PedidoCreated",
    id,
    nome: produto,
    dataAtual,
  });

  console.log(pedidos[id])

  res.status(201).send(pedidos[id]);
});

let produtosRecebidos = {};

app.post("/events", (req, res) => {
  const { type, dados } = req.body;

  if (type === "ProdutoCreated") {
    const { id, nome, preco } = dados;
    produtosRecebidos[id] = { id, nome, preco };
    console.log("Produto recebido:", produtosRecebidos[id]);
  }

  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("PedidoService listening on port 4001");
});
