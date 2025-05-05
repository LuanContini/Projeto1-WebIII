const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota para receber eventos
app.post("/events", async (req, res) => {
  const evento = req.body;
  console.log("Evento recebido no EventBus:", evento);

  try {
    // Repassando eventos para os serviços
    await axios.post("http://localhost:4000/events", evento);
    console.log("Evento enviado para ProdutoService");
    await axios.post("http://localhost:4001/events", evento);
    console.log("Evento enviado para PedidoService");
    await axios.post("http://localhost:4002/events", evento);
    console.log("Evento enviado para QueryService");
  } catch (err) {
    console.error("Erro ao repassar evento:", err.message);
  }

  res.send({ status: "OK" });
});

// Iniciando o servidor
app.listen(4005, () => {
  console.log("EventBus escutando na porta 4005");
});
