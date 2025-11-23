var database = require("../database/config")

function buscarMaisJogados(id) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id)
    var instrucaoSql = `
        select jogo, sum(numPartidas) as numPartidas from quant_partidas_vw where id = ${id} group by idJogo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHighscoreOverview(id) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id)
    var instrucaoSql = `
        select dtPartida, sum(score) as highscore from score_dia_vw
	        where id = ${id}
            and dtPartida >= current_date() - interval 7 day
		        group by dtPartida
                    order by dtPartida;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarConquistas(id) {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id)
    var instrucaoSql = `
        SELECT c.idConquista, c.nome, c.raridade, c.descricao, c.url from conquista c 
            join registroConquista r on fkConquista = idConquista
            join usuario u on fkUsuario = id
		        where id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMaisJogados,
    buscarHighscoreOverview,
    buscarConquistas
};