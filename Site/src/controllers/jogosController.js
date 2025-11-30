var jogosModel = require("../models/jogosModel");


function cadastrarPartida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var jogo = req.body.jogoServer;
    var pontuacao = req.body.pontuacaoServer;
    var result = req.body.resultadoServer;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (jogo == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua pontuacao está undefined!");
    } else if (result == undefined) {
        res.status(400).send("Seu resultado está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        jogosModel.cadastrarPartida(id, jogo, pontuacao, result)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                        
                    );
                    if (erro.sqlMessage.includes('Duplic')) {
                        res.status(409).json(erro.sqlMessage);
                    } else
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarConquista(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var conquista = req.body.conqServer;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (conquista == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        jogosModel.cadastrarConquista(id, conquista)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                        
                    );
                    if (erro.sqlMessage.includes('Duplic')) {
                        res.status(409).json(erro.sqlMessage);
                    } else
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarPartida,
    cadastrarConquista
}