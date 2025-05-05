const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const produtos = {};
const pedidos = {};

app.get('/produtos', (req, res) => {
    res.send(produtos);
});

app.post('/events', (req, res) => {
    console.log('[Query Service] Início do recebimento de evento');
    console.log('Evento ', req.body.type);

    const { type } = req.body;

    if(type === 'ProdutoCreated'){
        const { dados } = req.body;
        const {id, nome, preco} = dados;

        produtos[id] = {id, nome, preco};
    }
    if(type === 'PedidoCreated'){
        const {id, produto, quantidade} = req.body;
        pedidos[id] = {produto, quantidade};
        
        console.log('Pedido recebido Query: ', id, produto, quantidade);
    }


    res.send({msg: `Evento ${type} recebido e tratado`});
    console.log('[Query Service] all produtos: ', produtos);
    console.log('[Query Service] all pedidos: ', pedidos);
});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
})