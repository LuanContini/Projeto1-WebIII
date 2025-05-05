const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const produtos = {};
const pedidos = {};

// Rota para obter produtos
app.get('/produtos', (req, res) => {
    res.send(produtos);
});

// Rota para receber eventos
app.post('/events', (req, res) => {
    const { type } = req.body;
    console.log("Evento recebido no QueryService:", req.body);

    if(type === 'ProdutoCreated'){
        const { dados } = req.body;
        const {id, nome, preco} = dados;

        produtos[id] = {id, nome, preco};
        console.log("Produto adicionado ao QueryService:", produtos[id]);
    }
    if(type === 'PedidoCreated'){
        const {id, produto, quantidade} = req.body;
        pedidos[id] = {produto, quantidade};
        console.log("Pedido adicionado ao QueryService:", pedidos[id]);
    }

    res.send({msg: `Evento ${type} recebido e tratado`});
});

// Iniciando o servidor
app.listen(4002, () => {
    console.log('Query service listening on port 4002');
})