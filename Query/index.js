const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//exemplo de estrutura de dados do Query Service
/*
    produtos = {
        p1: {
            id: 'p1',
            title: 'Primeiro Post',
            comments: [
            {
                id: 'c1',
                content: 'comentario 1'
            },
            {
                id: 'c2',
                content: 'comentario 2'
            },
            {
                id: 'c3',
                content: 'comentario 3'
            },
            ]
        }
    }
*/
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
        const { id, nome, preco } = req.body;

        produtos[id] = {id, nome, preco};
    }
    if(type === 'PedidoCreated'){
        const {id, /*dados do pedido que precisam ser pegos do body*/} = req.body;

        pedidos[id] = {/*dados do pedido*/}
    }


    res.send({msg: `Evento ${type} recebido e tratado`});
    console.log('[Query Service] all produtos: ', produtos);
});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
})