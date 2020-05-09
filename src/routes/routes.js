const express = require('express');
const routes = express.Router();

const usuarioController = require("../controllers/usuarios");

//toda vez q o usuario acessar a rota (rota raiz), tem a funcao que recebe o req e res
//req simboliza a requisicao que esta sendo feita ao servidor 
//req contém os dados dessa requisicao, parametros, corpo, cabecalho, autenticacao, usuario, ip, etc.)
//res - resposta que vai ser dada a requisicao (resposta do servidor)

//quando criar algo, usa post
//insert
routes.post('/usuarios', usuarioController.insert);

//quando for pegar algo, usa Get
//Select
routes.get('/usuarios', usuarioController.index);

//selecionar um só
routes.get('/usuarios/:id', usuarioController.details);

//selecionar um só e atualizar
routes.put('/usuarios/:id', usuarioController.update);

routes.delete('/usuarios/:id', usuarioController.delete);

module.exports = routes;