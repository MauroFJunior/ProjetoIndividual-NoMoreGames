var usuarioModel = require("../models/usuarioModel");
var dashModel = require("../models/dashModel");

function buscarMaisJogados(req, res){
    var id = req.body.id;
    
    if (id == undefined) {
        res.status(400).send("ID UNDEFINED!");
    } else {
        dashModel.buscarMaisJogados(id)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no buscarMaisJogados:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarHighscoreOverview(req, res){
    var id = req.body.id;
    
    if (id == undefined) {
        res.status(400).send("ID UNDEFINED!");
    } else {
        dashModel.buscarHighscoreOverview(id)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no buscarHighscoreOverview:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarConquistas(req, res){
    var id = req.body.id;
    
    if (id == undefined) {
        res.status(400).send("ID UNDEFINED!");
    } else {
        dashModel.buscarConquistas(id)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no buscarConquistas:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarMaisJogados,
    buscarHighscoreOverview,
    buscarConquistas
}