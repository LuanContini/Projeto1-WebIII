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

app.post('/produtos/', (req, res) => {

    const id = randomBytes(4).toString("hex");

    const { nome, preco } = req.body;

    posts[id] = {
        id, 
        nome, 
        preco,
    }

    res.status(201).send(produtos[id]);
});
