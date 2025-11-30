var express = require("express");
var router = express.Router();

var jogosController = require("../controllers/jogosController");

//Recebendo os dados do html e direcionando para a função cadastrar de jogosController.js
router.post("/cadastrarPartida", function (req, res) {
    jogosController.cadastrarPartida(req, res);
})

router.post("/cadastrarConquista", function (req, res) {
    jogosController.cadastrarConquista(req, res);
})

module.exports = router;