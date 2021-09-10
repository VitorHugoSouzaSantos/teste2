const express = require('express');
const cors = require('cors');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let servico = models.Servico;
let pedido = models.Pedido;

app.get('/', function (req, res) {
    res.send('Olá Mundo!');
});

app.post('/clientes', async (req, res) => {
    let create = await cliente.create(
        req.body
    )
    res.send('Cliente inserido');
});

app.post('/servicos', async (req, res) => {
    
    await servico.create(
        req.body
    );
    res.send('Serviço foi inserido!');
    await aguardar(3000);
    function aguardar(ms){
        return new Promise((resolve)=>{
        setTimeout(resolve.ms);
    })
    .then(servico => {
        return res.json({
            error: false,
            servico
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Serviço não esta cadastrado!"
        });
    });
}
});

app.post('/pedidos', async (req, res) => {
    let create = await pedido.create(
        req.body
    )
    res.send('Lista de pedidos. Pedidos em execução, pendentes e cancelados.');
});

// ---- Exercícios 30/08/2021

// Exercício 01: Visualize todos os clients.

app.get('/listaclientes', async (req, res) => {
    await cliente.findAll({
        raw:true
        //order: [['nome', 'ASC']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

// Exercício 02: Visualize os clientes em ordem de antiguidade.

app.get('/listaclientesordemantiguidade', async (req, res) => {
    await cliente.findAll({
        order: [['createdAt']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

// Exercício 03: Visualize todos os pedidos.

app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        //include:[[all,true]]
        raw: true
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

// Exercício 04: Visualize o pedido por ordem a partir do maior valor.

app.get('/listamaiorpedidos', async (req, res) => {
    await pedido.findAll({
        order: [['valor', 'DESC']]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

// Exercício 05: Informe quantos clientes estão na nossa basse de dados.

app.get('/quantclientes', async (req, res) => {
    await cliente.count('id')
        .then(function (clientes) {
            res.json({ clientes })
        })
});

// Exercício 06: Informe a quantidade de pedidos solicitados.

app.get('/quantpedidos', async (req, res) => {
    await pedido.count('id')
        .then(function (pedidos) {
            res.json({ pedidos })
        })
});

// Final dos exercícios.

// ---- Desafio 30/08/2021
//const { Op } = require("sequelize");

app.get('/qtotalcliente/:ClienteId', async (req, res) => {
    await pedido.sum('valor', {
        where: { ClienteId: req.params.id }
    }).then(function (pedidos) {
        res.json({ pedidos })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Cliente sem pedidos!"
        });
    });
});

// ---- Fim do desafio 30/08/2021

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        raw:true
        //order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json({ servicos })
    });
});


app.get('/ofertas', async (req, res) => {
    await servico.count('id')
        .then(function (servicos) {
            res.json(servicos);
        });
});

app.get('/servico/:id', async (req, res) => {
    servico.findByPk(req.params.id)
        .then(servico => {
            return res.json({
                error: false,
                servico
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Código não esta cadastrado!"
            });
        });
});

app.get('/pedido/:id', async (req, res) => {
    pedido.findByPk(req.params.id,/*{
        include:[{all:true}]
    }*/)
        .then(pedido => {
            return res.json({
                error: false,
                pedido
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Pedido não esta cadastrado!"
            });
        });
});

// ---- Aula 31/08/2021

app.get('/atualizaservico', async (req, res) => {
    await servico.findByPk(1)
        .then(servico => {
            servico.nome = 'HTMAL/CSS/JS';
            servico.descricao = 'Páginas estáticas e dinâmicas estilizadas';
            servico.save();
            return res.json({ servico });
        });
});

app.put('/editarservico', (req, res) => {
    servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/servicospedidos', async (req, res) => {
    await servico.findByPk(1, {
        include: [{ all: true }]
    }).then(servico => {
        return res.json({ servico });
    });
});

app.put('/editarpedido', (req, res) => {
    pedido.update(req.body, {
        where: { ServicoId: req.body.ServicoId }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido modificado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel modificar o pedido."
        });
    });
});

// ---- Exercícios 31/08/2021

// 1. Faça a busca por serviços de clientes passando o id do cliente no corpo da requisição.

app.get('/clientes/:id', async (req, res) => {
    await pedido.findAll({ where: { ClienteId: [req.params.id] } })
        .then(function (pedidos) {
            res.json(pedidos)
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Código não esta cadastrado!"
            });
        });
});
/*;
    console.log(pedidos, valor, ClienteId)
});
*/
// 2. Utilize a rota para consultar clientes e faça a edição de um cliente pelo método put.

app.put('/editarcliente', (req, res) => {
    cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel modificar o cliente."
        });
    });
});

// 3.Utilize a rota para consultar pedidos e faça a edição de pedido pelo método put.

app.put('/editarpedido/:id', (req, res) => {
    pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel modificar o pedido."
        });
    });
});

// Fim dos exercícios

// Continuação da aula 31/08/2021

app.get('/excluircliente', async (req, res) => {
    cliente.destroy({
        where: { id: 2 }
    });
});

app.delete('/apagarcliente/:id', (req, res) => {
    cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel excluir o cliente."
        });
    });
});

app.delete('/apagarservico/:id', (req, res) => {
    servico.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi excluido com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel excluir o serviço."
        });
    });
});

// ---- Desafio Aula 31/08/2021

// 1. Faça uma rota que liste todos os pedidos de um cliente através do id do cliente.

app.get('/clientetodospedidos/:id', async (req, res) => {
    await pedido.findAll({ where: { ClienteId: [req.params.id] } })
        .then(function (pedidos) {
            res.json(pedidos)
        });
});

// 2. Crie uma nova rota que permite alterar esses pedidos utilizando ClienteId.

app.put('/alteracaoclientetodospedidos/:id', (req, res) => {
    pedido.update(req.body, {
        where: { ClienteId: req.body.ClienteId }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel modificar o pedido."
        });
    });
});

// Fim desafio

// ---- 08/08/2021

app.get('/clienteservicoid/:id', async (req, res) => {
    await servico.findByPk(req.body, {where: {
        include: [{ all: true }]}
    }).then(servico => {
        return res.json({ servico });
    });
});

// ---------------

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo')
});