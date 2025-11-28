
var rodada = 1;
var telaAtual = []
var faseAtual = 0;
var icons = ['../assets/slotKnight/x.jpg', '../assets/slotKnight/bau.jpg', '../assets/slotKnight/rest.jpg', '../assets/slotKnight/combat.jpg', '../assets/slotKnight/boss.jpg']
var tela = `
<div class="tela" id="tela">
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
    <button onclick="gotoFase()" id="fase" style="display: none;">Próxima fase</button>
    <div id="msg"></div>
</div>
    <div id="rest" style="display: none;">
    <button onclick="gotoFase()">Próxima fase</button>
    Descanso!
    </div>
    <div id="chest" style="display: none;">
    <button onclick="gotoFase()">Próxima fase</button>
    Loot!
    </div>
    <div id="combat" style="display: none;">
    <button onclick="gotoFase()">Próxima fase</button>
    Combate!
    </div>
    <div id="boss" style="display: none;">
    <button onclick="gotoFase()">Próxima fase</button>
    Boss!</div>
    
    `

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
            tela.style.display = "none";
            chest.style.display = "block";
            rest.style.display = "none";
            combat.style.display = "none";
            boss.style.display = "none";
            faseAtual++
        } else if (telaAtual[faseAtual] == 2) {
            tela.style.display = "none";
            chest.style.display = "none";
            rest.style.display = "block";
            combat.style.display = "none";
            boss.style.display = "none";
            faseAtual++
        } else if (telaAtual[faseAtual] == 3) {
            tela.style.display = "none";
            chest.style.display = "none";
            rest.style.display = "none";
            combat.style.display = "block";
            boss.style.display = "none";
            faseAtual++
        } else {
            tela.style.display = "none";
            chest.style.display = "none";
            rest.style.display = "none";
            combat.style.display = "none";
            boss.style.display = "block";
            faseAtual = 3;
        }
    }
}