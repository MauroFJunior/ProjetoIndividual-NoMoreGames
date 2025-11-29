var vidaMax = 100;
var vidaAtual = 1;
var escudo = 0;
var ataque = 10;
var rodada = 1;
var historicoFases = [];
var telaAtual = [];
var faseAtual = 0;
var pontuacao = 0;
var icons = ['../assets/slotKnight/x.jpg', '../assets/slotKnight/bau.jpg', '../assets/slotKnight/rest.jpg', '../assets/slotKnight/combat.jpg', '../assets/slotKnight/boss.jpg']
var inimigos = [
    ["Goblin", 5], ["Slime", 8], ["Bandido", 5],
    ["Esqueleto", 7], ["Lobo", 5], ["Orc", 10],
    ["Escorpião Gigante", 12], ["Fantasma", 13], ["Zumbi", 15],
    ["Morcego", 3]
];

var itensDrop = [
    ["Pedaço de Couro", 0, 5, 5], ["Adaga Quebrada", 8, 0, 0], ["Escudo Enferrujado", 0, 7, 0],
    ["Amuleto Simples", 5, 0, 5], ["Porrete de Carvalho", 10, 0, 0], ["Túnica Rasgada", 0, 6, 4],
    ["Pedra de Amolar", 5, 0, 0], ["Pequeno Frasco", 0, 0, 10], ["Sapatos Gastos", 0, 3, 3],
    ["Luva de Pano", 2, 2, 0]
];

var itensLoot = [
    ["Cajado de Ébano de Tsuvago", 30, 0, 0], ["Cota de Malha Leve de Aplou", 0, 20, 10], ["Anel da Determinação de Gobedi", 8, 8, 25],
    ["Machado de Batalha de Emasthu", 25, 0, 5], ["Tiara Élfica de Vanagoni", 5, 18, 15], ["Diadema de Rodalen", 0, 12, 30],
    ["Manopla de Ferro de Zoken", 15, 10, 0], ["Medalhão de Amanir", 20, 0, 15], ["Capacete com Chifres de Asclu", 10, 15, 10],
    ["Gema de Vitalidade de Loesing", 0, 0, 30], ["Bolsa de guardar de Rikec", 5, 5, 30], ["Sapatos Alados de Eafarl", 10, 10, 10], 
    ["Navalha de Duraade", 30, 0, 0]
];

var tela = `
<div class="navbarJogo">
<div class="vida" id="score"></div>
<div class="vida" id="hudVida">
<img src="../assets/slotKnight/vida.webp"> Vida: 100
</div>
<div class="escudo" id="hudEscudo">
<img src="../assets/slotKnight/escudo.png">Escudo: 0</div>
<div class="ataque" id="hudAtaque">
<img src="../assets/slotKnight/ataque.png">Ataque: 10</div>
<div class="mapa" id="hudMapa">
</div>
</div>
<div class="tela" id="tela">
<div id="msg"></div>
    <div class="slotMachine">
        <div class="slot">
            <img id="1" src="" alt="">
        </div>
        <div class="slot">
            <img id="2" src="" alt="">
        </div>
        <div class="slot">
            <img id="3" src="../assets/slotKnight/boss.jpg" alt="">
        </div>
    </div>
    <button onclick="roll()" id="rolar">Rolar</button>
    <button onclick="gotoFase()" id="fase" style="display: none;">Seguir em frente...</button>
</div>
    <div class="fase" id="rest" style="display: none;">
    <img src="../assets/slotKnight/restfase.gif">
    <div class="containerFase" id="msgRest">
    </div>
    <button id="buttonFase" onclick="gotoFase()">Seguir em frente...</button>
    </div>
    <div class="fase" id="chest" style="display: none;">
    <img src="../assets/slotKnight/lootfase.gif">
    <div class="containerFase" id="msgChest">
    </div>
    <button id="buttonFase" onclick="gotoFase()">Seguir em frente...</button>
    </div>
    <div class="fase" id="combat" style="display: none;">
    <img src="../assets/slotKnight/combatfase.gif">
    <div class="containerFase" id="msgCombat">
    </div>
    <button id="buttonFase" onclick="gotoFase()">Seguir em frente...</button>
    </div>
    <div class="fase" id="boss" style="display: none;">
    <img src="../assets/slotKnight/bossfase.gif">
    <div class="containerFase">
    <button id="buttonFase" onclick="gotoFase()">Seguir em frente...</button>
    Boss!
    </div>
    </div>
    `


function updateHUD() {
    score.innerHTML = `Pontuação = ${pontuacao}`;
    hudVida.innerHTML = `<img src="../assets/slotKnight/vida.webp"> Vida: ${vidaAtual}/${vidaMax}`;
    hudEscudo.innerHTML = `<img src="../assets/slotKnight/escudo.png"> Escudo: ${escudo}`;
    hudAtaque.innerHTML = `<img src="../assets/slotKnight/ataque.png"> Ataque: ${ataque}`;

    hudMapa.innerHTML += `<img style="border: 1px solid black" src="${icons[telaAtual[faseAtual]]}" alt="">`;
}

function getLoot(atq, def, hp) {
    ataque += atq;
    escudo += def;
    vidaMax += hp;
    vidaAtual += hp;
}

function gotoRest(tela, chest, rest, combat, boss) {
    var chest = document.getElementById("chest");
    var rest = document.getElementById("rest");
    var combat = document.getElementById("combat");
    var boss = document.getElementById("boss");
    var tela = document.getElementById("tela");

    var percentage = Math.floor(Math.random() * 23 + 1) / 100;
    var cura = Math.floor(vidaMax * percentage) + 20;

    tela.style.display = "none";
    chest.style.display = "none";
    rest.style.display = "flex";
    combat.style.display = "none";
    boss.style.display = "none";
    if (vidaAtual + cura > vidaMax) {
        msgRest.innerHTML = `Você encontrou um local seguro para descansar. <br> Em meio a escuridão incessante e o silêncio ensurdecedor <br> suas feridas encontram tempo valioso para se fechar. <br> Você recuperou ${vidaMax - vidaAtual} pontos de Vida! <br>`

        vidaAtual = vidaMax
    } else {
        vidaAtual = vidaAtual + cura;
        msgRest.innerHTML = `Você encontrou um local seguro para descansar. <br> Em meio a escuridão incessante e o silêncio ensurdecedor <br> suas feridas encontram tempo valioso para se fechar. <br> Você recuperou ${cura} pontos de Vida! <br>`
    }

    pontuacao += 100;
    updateHUD();
    faseAtual++
}

function gotoCombat(tela, chest, rest, combat, boss) {
    tela.style.display = "none";
    chest.style.display = "none";
    rest.style.display = "none";
    combat.style.display = "flex";
    boss.style.display = "none";
    var inimigo = inimigos[Math.floor(Math.random() * inimigos.length)];
    var rollJogador = Math.floor(Math.random() * 99 + ataque);
    var rollInimigo = Math.floor(Math.random() * 99 + 1) + (inimigo[1] * rodada);
    var loot = itensDrop[Math.floor(Math.random() * itensDrop.length)]
    var dano = Math.max(1, (Math.floor((inimigo[1] * rodada) / 2) + 5) - escudo);

    if (rollInimigo > rollJogador) {
        msgCombat.innerHTML = `Sua caminhada é interrompida por um ${inimigo[0]} furioso. <br> Conversa não é uma opção... <br>
        Seu ataque (${rollJogador}) não foi suficiente para superar o avanço do ${inimigo[0]} (${rollInimigo}). <br>
        Fugir é a unica opção... <br><br>
        Suas novas feridas lhe roubaram ${dano} pontos de vida.`
        vidaAtual = vidaAtual - dano;
        pontuacao > 1000 ? pontuacao -= 1000 : pontuacao = 0;
    } else if (rollInimigo < rollJogador) {
        msgCombat.innerHTML = `Sua caminhada é interrompida por um ${inimigo[0]} furioso. <br> Conversa não é uma opção... <br>
        Seu ataque (${rollJogador}) é letal e bem ensaiado, suficiente para superar o avanço do ${inimigo[0]} (${rollInimigo}) <br><br>
        No corpo caído à sua frente você encontra <span title="+${loot[1]} Ataque | +${loot[2]} Defesa | +${loot[3]} Vida Max." style="cursor: pointer"> [${loot[0]}]! </span>`
        getLoot(loot[1], loot[2], loot[3])
        pontuacao += 1000;
    } else {
        msgCombat.innerHTML = `Sua caminhada é interrompida por um ${inimigo[0]} furioso. <br> Conversa não é uma opção... <br>
        Seu ataque (${rollJogador}) é bem intencionado, mas o ${inimigo[0]} (${rollInimigo}) também é competente. <br>
        A batalha é feroz, você viverá mais um dia... <br><br>
        Suas novas feridas lhe roubaram ${Math.floor(dano / 2)} pontos de vida.<br>
        No corpo caído à sua frente você encontra <span title="+${loot[1]} Ataque | +${loot[2]} Defesa | +${loot[3]} Vida Max." style="cursor: pointer"> [${loot[0]}]! </span>`
        getLoot(loot[1], loot[2], loot[3])
        pontuacao += 400;
    }

    updateHUD();
    faseAtual++
}

function gotoChest(tela, chest, rest, combat, boss) {
    tela.style.display = "none";
    chest.style.display = "flex";
    rest.style.display = "none";
    combat.style.display = "none";
    boss.style.display = "none";
    var loot = itensLoot[Math.floor(Math.random() * itensLoot.length)]
    var texto = `[${loot[0]}]!`

    msgChest.innerHTML = `Sua caminhada é pausada ao detectar um brilho no horizonte... <br>
    Escondido e esquecido, sabe-se lá por quem: um baú... <br>
    Ninguém por perto... Vai ser mais útil pra você do que estocado aqui. <br>
    Você encontrou <span id="lootTxt" title="+${loot[1]} Ataque | +${loot[2]} Defesa | +${loot[3]} Vida Max." style="cursor: pointer"></span>`;

    var animar = setInterval(() => {
            lootTxt.innerHTML = `[${itensLoot[Math.floor(Math.random() * itensLoot.length)][0]}]!`;
        }, 50)

        setTimeout(() => {
            clearInterval(animar);
            lootTxt.innerHTML = texto;
        }, 2000)

    getLoot(loot[1], loot[2], loot[3])
    pontuacao += 1000;
    updateHUD();
    faseAtual++
    
}


function draw(idDiv) {
    var div = document.getElementById(`${idDiv}`);
    div.innerHTML = tela;

    for (var i = 1; i <= 3; i++) {
        document.getElementById(i).src = icons[0]
    }
}

function randomizarIndex() {
    return Math.floor(Math.random() * (icons.length - 2) + 1);
}

function roll() {
    var aux = 0;
    faseAtual = 0;
    rolar.style.display = 'none';
    msg.innerHTML = `Rodada: ${rodada}.`
    if (rodada % 4 == 0) {
        telaAtual = [4, 4, 4];
        historicoFases.push(4)

        var animar = setInterval(() => {

            for (var i = 1; i <= 3; i++) {
                if (aux >= 200) {
                    aux = -200;
                } else aux += 60;

                document.getElementById(i).src = icons[Math.floor(Math.random() * (icons.length - 1) + 1)];
                document.getElementById(i).style.transform = `translateY(${aux}px)`
            }
        }, 50)

        setTimeout(() => {
            clearInterval(animar);
            for (var i = 1; i <= 3; i++) {
                document.getElementById(i).style.transform = `translateY(0px)`;
                document.getElementById(i).src = icons[4]
            }
            fase.style.display = 'block';
        }, 2000)

        rodada++;
    } else {



        res = [randomizarIndex(), randomizarIndex(), randomizarIndex()];
        historicoFases.push(res[0])
        historicoFases.push(res[1])
        historicoFases.push(res[2])

        telaAtual = res;

        var animar = setInterval(() => {

            for (var i = 1; i <= 3; i++) {
                if (aux >= 200) {
                    aux = -200;
                } else aux += 60;

                document.getElementById(i).src = icons[Math.floor(Math.random() * (icons.length - 1) + 1)];
                document.getElementById(i).style.transform = `translateY(${aux}px)`
            }
        }, 50)

        setTimeout(() => {
            clearInterval(animar);
            for (var i = 1; i <= 3; i++) {
                document.getElementById(i).style.transform = `translateY(0px)`;
                document.getElementById(i).src = icons[res[i - 1]]
            }
            fase.style.display = 'block';
        }, 2000)


        rodada++;

    }

}

function gotoFase() {
    var chest = document.getElementById("chest");
    var rest = document.getElementById("rest");
    var combat = document.getElementById("combat");
    var boss = document.getElementById("boss");
    var tela = document.getElementById("tela");
    var fase = document.getElementById("fase");
    var rolar = document.getElementById("rolar");


    boss.style.opacity = 0
    combat.style.opacity = 0
    chest.style.opacity = 0
    rest.style.opacity = 0
    var aux = 0;
    var transicao = setInterval(() => {
        if (aux >= 1) {
            aux = 1;
            clearInterval(transicao)
        } else {
            aux += .1;
        }

        boss.style.opacity = aux
        combat.style.opacity = aux
        chest.style.opacity = aux
        rest.style.opacity = aux
    }, 50)






    if (faseAtual > 2) {
        chest.style.display = "none";
        rest.style.display = "none";
        combat.style.display = "none";
        boss.style.display = "none";
        tela.style.display = "flex";
        fase.style.display = "none"
        rolar.style.display = "block"
    } else {
        if (telaAtual[faseAtual] == 1) {
            gotoChest(tela, chest, rest, combat, boss);

        } else if (telaAtual[faseAtual] == 2) {
            gotoRest(tela, chest, rest, combat, boss);

        } else if (telaAtual[faseAtual] == 3) {
            gotoCombat(tela, chest, rest, combat, boss);
        } else {
            tela.style.display = "none";
            chest.style.display = "none";
            rest.style.display = "none";
            combat.style.display = "none";
            boss.style.display = "flex";
            updateHUD();
            faseAtual = 3;
        }


    }

}