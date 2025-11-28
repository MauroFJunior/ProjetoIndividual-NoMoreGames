var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/buscarMaisJogados/:id", function (req, res) {
    dashController.buscarMaisJogados(req, res);
})

router.get("/buscarHighscoreOverview/:id", function (req, res) {
    dashController.buscarHighscoreOverview(req, res);
})

router.get("/buscarConquistas/:id", function (req, res) {
    dashController.buscarConquistas(req, res);
})

module.exports = router;