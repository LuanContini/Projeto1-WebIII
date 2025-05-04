const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

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

app.get('/pedidos', (req, res) => {
    res.send(pedidos);
});

app.post('/pedidos', (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { produto, quantidade } = req.body;

    pedidos[id] = {
        id,
        produto,
        quantidade,
    };

    res.status(201).send(pedidos[id]);
});

let produtosRecebidos = {};

app.post('/eventos', (req, res) => {
    const { tipo, dados } = req.body;

    if (tipo === "ProdutoCriado") {
        const { id, nome, preco } = dados;
        produtosRecebidos[id] = { id, nome, preco };
        console.log("Produto recebido:", produtosRecebidos[id]);
    }

    res.send({ status: "OK" });
});

app.listen(4001, () => {
    console.log("PedidoService listening on port 4001");
});
