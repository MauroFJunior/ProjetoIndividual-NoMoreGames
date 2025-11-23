var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/buscarMaisJogados", function (req, res) {
    dashController.buscarMaisJogados(req, res);
})

router.post("/buscarHighscoreOverview", function (req, res) {
    dashController.buscarHighscoreOverview(req, res);
})

router.post("/buscarConquistas", function (req, res) {
    dashController.buscarConquistas(req, res);
})

module.exports = router;