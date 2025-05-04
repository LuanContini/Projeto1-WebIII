const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const evento = req.body;

  console.log("EventBus - Evento recebido:", evento.type);

  try {
    await axios.post("http://localhost:4000/events", evento); // ProdutoService
    await axios.post("http://localhost:4001/events", evento); // PedidoService
    await axios.post("http://localhost:4002/events", evento); // QueryService
  } catch (err) {
    console.log("Erro ao repassar evento:", err.message);
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("EventBus escutando na porta 4005");
});
