const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/eventos", async (req, res) => {
  const evento = req.body;

  console.log("EventBus - Evento recebido:", evento.tipo);

  try {
    await axios.post("http://localhost:4000/eventos", evento); // ProdutoService
    await axios.post("http://localhost:4001/eventos", evento); // PedidoService
  } catch (err) {
    console.log("Erro ao repassar evento:", err.message);
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("EventBus escutando na porta 4005");
});
