var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPartida(id, jogo, pontuacao, resultado) {
    console.log("ACESSEI O JOGOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id, jogo, pontuacao, resultado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO partida (fkUsuario, fkJogo, idPartida, score, dtPartida, result) VALUES
            (${id}, ${jogo}, ((select count(*) from partida as p where p.fkUsuario = ${id}) + 1), ${pontuacao}, CURRENT_DATE(), '${resultado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarConquista(id, conquista) {
    console.log("ACESSEI O JOGOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id, conquista);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO registroConquista (fkUsuario, fkConquista, dtConquista) VALUES
        (${id},${conquista},CURRENT_DATE());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarPartida,
    cadastrarConquista,
};