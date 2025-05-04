const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

/*
    produtos = {
    id: <String/Hex>,
    nome: <String>,
    preco: <Int>,
    }
*/

let produtos = {};


app.get('/produtos', (req, res) => {
    res.send(produtos);
});

app.post('/produtos/', async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { nome, preco } = req.body;

    produtos[id] = { id, nome, preco };

    // Enviar evento para o EventBus
    await axios.post("http://localhost:4005/eventos", {
        tipo: "ProdutoCriado",
        dados: { id, nome, preco },
    });

    res.status(201).send(produtos[id]);
});


app.listen(4000, () => {
    console.log("ProdutoService listening on port 4000");
  });
