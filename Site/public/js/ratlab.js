var html = `
    <div id="timer">30000</div>
    <div id="telaRat"></div>
    <input type="text" id="get_input" oninput="checkInput()">
    <button onclick="move(get_input.value.split(''))">Start</button>
    <button class="butVis" onclick="setVisuals()">DEV MODE</button>`

var timer = 30000
var fase = 0;
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
        [0, 0, 0, 0, 0, 0, 1],
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

var timerDown = setInterval(() => {
    if (timer >= 0) {
        timer -= 100
        var totalSegundos = Math.floor(timer / 1000);
        var minutos = Math.floor(totalSegundos / 60);
        var segundos = totalSegundos % 60;
        var centesimos = Math.floor((timer % 1000) / 10);

        var div = document.getElementById("timer");

        div.innerHTML = `${Math.max(0,minutos)}:${Math.max(0,segundos).toString().padStart(2, '0')}.${Math.max(0,centesimos).toString().padStart(2, '0')}`;
    } else {
        var div = document.getElementById("timer");
        clearInterval(timerDown);
        var aux = 1;
        div.innerHTML = `0:00:00`;
        var deathAnim = setInterval(() => {
            if (aux >= 0.1){
                jogador.style.transform = `scale(${aux = aux - .1})`
                jogador.style.filter = `brightness(${aux})`
            }
        }, 70);
    }

}, 100);

function drawRatlab(idDiv) {
    var div = document.getElementById(`${idDiv}`);
    div.innerHTML = html;
    drawTela();
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

    for (let i = 0; i < command.length; i++) {
        setTimeout(() => checkCondition(command[i].toLowerCase()), i * 300);
    }
}

function checkCondition(dir) {
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
        var aux = 1;
        console.log('morri!');
        mapa[player[0]][player[1]] = 0;
        mapa[player[0] + movimento[0]][player[1] + movimento[1]] = 1;
        drawTela();
        var jogador = document.getElementById("jogador");
        jogador.style.backgroundImage = `url("../assets/labRat/rat.png"), url("..//assets/labRat/crack.png"), url("..//assets/labRat/path.jpg")`

        var deathAnim = setInterval(() => {
            if (aux >= 0.1){
                jogador.style.transform = `scale(${aux = aux - .1})`
                jogador.style.filter = `brightness(${aux})`
            }
        }, 70);

    } else if (mapa[player[0] + movimento[0]][player[1] + movimento[1]] == 3) {
        var aux = 1;
        fase++;
        var telaRat = document.getElementById("telaRat")
        console.log('venci!');
        mapa[player[0]][player[1]] = 0;
        mapa[player[0] + movimento[0]][player[1] + movimento[1]] = 1;

        var transicao = setInterval(() => {
            if (aux >= 1) {
                aux = 1;
                clearInterval(transicao)
                mapa = mapas[fase]
                player = [0, 0];
                drawTela();
            } else {
                aux += .1;
            }

            telaRat.style.opacity = aux
        }, 50)


    } else if (mapa[player[0] + movimento[0]][player[1] + movimento[1]] == 0) {
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
