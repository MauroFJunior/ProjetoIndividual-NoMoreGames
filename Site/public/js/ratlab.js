var html = `
    <div id="timer">30000</div>
    <div id="telaRat"></div>
    <div class="fase" id="gameover" style="display: none;">
    <img src="../assets/labrat/gameover.gif">
    <div class="containerFase" id="msgOver">
    Um momento de descuido e um passo em falso<br>
    O ratinho se encontra novamente no laboratório...<br>
    FIM DE JOGO
    </div>
    </div>
    <div class="fase" id="gamewin" style="display: none;">
    <img src="../assets/labrat/gamewin.gif">
    <div class="containerFase" id="msgWin">
    Com a saudação do sol nascente, e uma barriga cheia de queijo<br>
    O ratinho finalmente encontra a saída do laboratório...<br>
    VOCÊ VENCEU!
    </div>
    </div>
    <input type="text" id="get_input" oninput="checkInput()">
    <button onclick="move(get_input.value.split(''))" id="start">Start</button>
    <button class="butVis" onclick="setVisuals()" id="vis">DEV MODE</button>
    `

var pontuacao = 10000;
var timerInicial = 45000;
var timer = 45000;
var fase = 0;
var ganhou;
var perdeu;
var mapas =
    [[
        [1, 0, 2, 2],
        [2, 0, 0, 2],
        [2, 0, 0, 0],
        [2, 0, 2, 3]
    ], [
        [1, 0, 0, 2, 2],
        [2, 2, 0, 0, 2],
        [0, 0, 0, 0, 2],
        [0, 2, 2, 0, 0],
        [0, 2, 2, 2, 3]
    ], [
        [1, 0, 2, 0, 2, 0],
        [2, 0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0],
        [2, 2, 0, 2, 2, 3]
    ], [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 0, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 3]
    ]];

var mapa = mapas[fase];

var player = [0, 0];
var visuals = true;
var ativo = true;


function drawRatlab(idDiv) {
    var div = document.getElementById(`${idDiv}`);
    div.innerHTML = html;
    drawTela();
    
    if(!window.timerDown) {
        startTimer()
    }
}

function startTimer(){
    var timerDown = setInterval(() => {
    if (timer >= 0) {
        timer -= 100
        var totalSegundos = Math.floor(timer / 1000);
        var minutos = Math.floor(totalSegundos / 60);
        var segundos = totalSegundos % 60;
        var centesimos = Math.floor((timer % 1000) / 10);

        var div = document.getElementById("timer");

        div.innerHTML = `${Math.max(0, minutos)}:${Math.max(0, segundos).toString().padStart(2, '0')}.${Math.max(0, centesimos).toString().padStart(2, '0')}`;
    } else {
        clearInterval(timerDown);
        gameOver()
    }

}, 100);
}

function setVisuals() {
    if (visuals == false) visuals = true;
    else visuals = false;

    drawTela();

}

function checkInput() {
    if (!'cbed'.includes(get_input.value[get_input.value.length - 1])) {
        get_input.value = get_input.value.slice(0, -1);
    }
}

function move(command) {
    var input = document.getElementById("get_input")
    input.value = ''
    ativo = true;
    for (let i = 0; i < command.length; i++) {
        setTimeout(() => checkCondition(command[i].toLowerCase()), i * 300);
    }
}

function gameOver() {
    if (perdeu) {
    pontuacao = pontuacao / 5
    var aux = 1;
    gameover = document.getElementById("gameover")
    timer = document.getElementById("timer")
    tela = document.getElementById("telaRat")
    botao1 = document.getElementById("start")
    botao2 = document.getElementById("vis")
    input = document.getElementById("get_input")
    var jogador = document.getElementById("jogador");
    jogador.style.backgroundImage = `url("../assets/labRat/rat.png"), url("..//assets/labRat/crack.png"), url("..//assets/labRat/path.jpg")`
    var deathAnim = setInterval(() => {
            if (aux >= 0.1) {
                jogador.style.transform = `scale(${aux = aux - .1})`
                jogador.style.filter = `brightness(${aux})`
            } else {
                gameover.style.display = "flex"
                tela.style.display = "none"
                botao1.style.display = "none"
                botao2.style.display = "none"
                timer.style.display = "none"
                input.style.display = "none"
                clearInterval(deathAnim)
            }
        }, 70);

    mandarproBancoRat(pontuacao, "Perdeu")
    }
}

function gameWin() {
    if (ganhou) {
    clearInterval(window.timerDown)
    var aux = 1;
    gamewin = document.getElementById("gamewin");
    timer = document.getElementById("timer");
    tela = document.getElementById("telaRat");
    botao1 = document.getElementById("start");
    botao2 = document.getElementById("vis");
    input = document.getElementById("get_input");

    gamewin.style.display = "flex";
    tela.style.display = "none";
    botao1.style.display = "none";
    botao2.style.display = "none";
    timer.style.display = "none";
    input.style.display = "none";

    mandarproBancoRat(pontuacao, "Venceu")
    }
}

function checkCondition(dir) {

    if (!ativo) return;

    var movimento = [0, 0]
    console.log('entrei no check')
    if (dir == 'd') movimento = [0, 1];
    else if (dir == 'b') movimento = [1, 0];
    else if (dir == 'c') movimento = [-1, 0];
    else movimento = [0, -1];

    if (
        (player[0] + movimento[0]) >= mapa.length ||
        (player[1] + movimento[1]) >= mapa[0].length ||
        (player[0] + movimento[0]) < 0 ||
        (player[1] + movimento[1]) < 0
    ) {
        return;
    }

    if (mapa[player[0] + movimento[0]][player[1] + movimento[1]] == 2) {
        perdeu = true;
        ativo = false;
        console.log('morri!');
        mapa[player[0]][player[1]] = 0;
        mapa[player[0] + movimento[0]][player[1] + movimento[1]] = 1;
        drawTela();
        gameOver()

    } else if (mapa[player[0] + movimento[0]][player[1] + movimento[1]] == 3) {
        ganhou = true;
        ativo = false;

        var tempoRestante = Math.floor(timer / 1000);
        var tempoMaximo = Math.floor(timerInicial / 1000);

        pontuacao = Math.floor(10000 * (tempoRestante / tempoMaximo) * (fase + 1));

        console.log('venci! Pontuação:', pontuacao);
        
        if (fase >= mapas.length - 1) {
            drawTela();
            gameWin();
        } else {
            input = document.getElementById("get_input")
            var aux = 1;
            fase++;
            var telaRat = document.getElementById("telaRat");
            mapa[player[0]][player[1]] = 0;
            mapa[player[0] + movimento[0]][player[1] + movimento[1]] = 1;

            var transicao = setInterval(() => {
                if (aux > 0) {
                    aux -= 0.1;
                    telaRat.style.filter = `brightness(${aux})`;
                } else {
                    clearInterval(transicao);
                    mapa = mapas[fase];
                    player = [0, 0];
                    telaRat.style.filter = 'brightness(1)';
                    drawTela();
                    ativo = true;
                }
            }, 50);
        }
        return;

    } else if (mapa[player[0] + movimento[0]][player[1] + movimento[1]] == 0) {
        pontuacao -= 10;
        console.log('andei');
        mapa[player[0]][player[1]] = 0;
        mapa[player[0] + movimento[0]][player[1] + movimento[1]] = 1;
        drawTela();

        player = [(player[0] + movimento[0]), (player[1] + movimento[1])];
    }

}

function drawTela() {
    tela = document.getElementById("telaRat")
    tela.innerHTML = '';
    var linhaAtual = ''

    tela.style.gridTemplateColumns = `repeat(${mapa[0].length}, 1fr)`;

    if (visuals == false) {
        for (i = 0; i < mapa[0].length; i++) {
            tela.innerHTML += `${mapa[i].join(" ")}<br>`;
        }
    } else {
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] == 0)
                    tela.innerHTML += `<div class="caminho"></div>`;
                else if (mapa[i][j] == 1)
                    tela.innerHTML += `<div class="jogador" id="jogador"></div>`;
                else if (mapa[i][j] == 2)
                    tela.innerHTML += `<div class="rachado"></div>`;
                else {
                    tela.innerHTML += `<div class="queijo"></div>`
                }
            }
        }
    }
}

function mandarproBancoRat(pontos, resultado) {
    if(resultado == "Venceu") {
        fetch("/jogos/cadastrarPartida", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        idServer: sessionStorage.ID_USUARIO,
        jogoServer: 1,
        pontuacaoServer: pontos,
        resultadoServer: resultado
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          
            console.log("Partida cadastrada.")

        } else { // REVISAR ISSO, PODE OFUSCAR ERROS DE CONEXÃO DO BD.
        
          throw "Houve um erro ao tentar realizar o cadastro!";
          
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

      fetch("/jogos/cadastrarConquista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        idServer: sessionStorage.ID_USUARIO,
        conqServer: 1,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          
            console.log("Conquista cadastrada.")

        } else { // REVISAR ISSO, PODE OFUSCAR ERROS DE CONEXÃO DO BD.
        
          throw "Houve um erro ao tentar realizar o cadastro!";
          
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    } else {

    fetch("/jogos/cadastrarPartida", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        idServer: sessionStorage.ID_USUARIO,
        jogoServer: 1,
        pontuacaoServer: pontos,
        resultadoServer: resultado
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          
            console.log("Partida cadastrada.")

        } else { // REVISAR ISSO, PODE OFUSCAR ERROS DE CONEXÃO DO BD.
        
          throw "Houve um erro ao tentar realizar o cadastro!";
          
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    }
}
