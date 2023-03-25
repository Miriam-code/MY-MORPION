//var titre = document.createElement('h1');

//titre.innerHTML = "TIC TAC TOE";

//document.body.appendChild(titre);

var grid = document.createElement('div');
grid.setAttribute("id","grid");

document.body.appendChild(grid);

var score = document.createElement('div');
score.setAttribute("id","score");

document.body.appendChild(score);

const jeu = ['c1','c2','c3','c4','c5','c6','c7','c8','c9'];

for (var i = 0 ; i < jeu.length ; i++) {   
    const casa = document.createElement('div');
    casa.setAttribute("id",jeu[i]);
    casa.className = 'case';
    grid.appendChild(casa);
}

var p = document.createElement('p');
p.innerHTML = "C'est au tour de Joueur ";
var span = document.createElement('span');
span.innerHTML = "1 X";
span.setAttribute("id","joueur");

var p2 = document.createElement('p');
p2.innerHTML = "Score Joueur 1 : ";
var span2 = document.createElement('span');
span2.innerHTML = "0";
span2.setAttribute("id","scoreX");

var p3 = document.createElement('p');
p3.innerHTML = "Score Joueur 2 : ";
var span3 = document.createElement('span');
span3.innerHTML = "0";
span3.setAttribute("id","scoreO");

var p4 = document.createElement('p');
p4.innerHTML = "Matchs nuls : ";
var span4 = document.createElement('span');
span4.innerHTML = "0";
span4.setAttribute("id","scoreNul");

score.appendChild(p);
score.appendChild(p2);
score.appendChild(p3);
score.appendChild(p4);

p4.appendChild(span4);
p3.appendChild(span3);
p2.appendChild(span2);
p.appendChild(span);


/*****************************************/

// récupérer les éléments du DOM

const cases = [...document.getElementsByClassName("case")]; // nodelist -> array
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("scoreX");
let score2 = document.getElementById("scoreO");
let scoreNul = document.getElementById("scoreNul");
let sound = new Audio('clic.mp3');
let sound1 = new Audio('bravo.mp3');
let sound2 = new Audio('pad.mp3');
let playbox = document.querySelector(".buttonplay");
let scorebox = document.getElementById('score');
let gridbox = document.getElementById('grid');
let cardbox = document.querySelector(".card");
let cardH2 = document.querySelector(".h2");
let body = document.querySelector("body");

score1.style.color = "#ff2d75";
score2.style.color = "#4fc3dc";


// click play 


playbox.addEventListener("click", function() {
    gridbox.style.display = "grid"
    scorebox.style.display = "flex"
    playbox.style.display = "none"
    sound2.play()
    body.requestFullscreen();
})

// mémoire des stats du jeu

let state = {
    joueurEnCours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNul: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0
}

const resetState = () => {
    joueurEnCours = 1;
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
    
};

const verifierVictoire = () => {
    if (
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
        (state.c3 == state.c5 && state.c5 == state.c7 && state.c7 > 0) ||
        (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
        (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
        (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
        (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0)
    ) {
        console.log("winner !");
        return true;
    } else if (
        state.c1 !== 0 &&
        state.c2 !== 0 &&
        state.c3 !== 0 &&
        state.c4 !== 0 &&
        state.c5 !== 0 &&
        state.c6 !== 0 &&
        state.c7 !== 0 &&
        state.c8 !== 0 &&
        state.c9 !== 0
    ) {
        return null;
    } else {
        return false;
    }
};

const jouerCase = (e) => {

    sound.play();

    let idCase = e.target.id;

    // si case déjà jouée on ne fait rien
    if (state[idCase] !== 0) return;

    state[idCase] = state.joueurEnCours;

    let isVctoire = verifierVictoire();

    if (isVctoire === true) {

        // si victoire

        gridbox.style.display = "none";
        scorebox.style.display = "none";
        cardbox.style.display = "flex";
        cardH2.textContent = " BRAVO ! Le gagnant est le joueur "+ state.joueurEnCours;
        sound1.play();

        if (state.joueurEnCours == 1) {
            state.scoreJ1++;
            score1.textContent = state.scoreJ1;
        } else {
            state.scoreJ2++;
            score2.textContent = state.scoreJ2;
        }

        resetState();
        cases.forEach((c) => (c.textContent = ""));
        cases.forEach((c) => (c.style.border = "thick solid white"));

        
    } else if (isVctoire === null) {

        state.matchNul++;

        scoreNul.textContent = state.matchNul;
        joueur.textContent = "1";

        gridbox.style.display = "none";
        scorebox.style.display = "none";
        cardbox.style.display = "flex";
        cardH2.textContent = " MATCH NUL ! ";

        // si nul

        resetState();
        cases.forEach((c) => (c.textContent = ""));
        
    } else if (isVctoire === false) {
        // sinon on continue le jeu
        if (state.joueurEnCours == 1) {
            state.joueurEnCours = 2;
            e.target.textContent = "X";
            e.target.style.color = "#ff2d75";
            e.target.style.border = "thick solid #ff2d75";
            joueur.textContent = "2 O";
            joueur.style.color = "#4fc3dc";
        } else {
            state.joueurEnCours = 1;
            e.target.textContent = "O";
            e.target.style.color = "#4fc3dc";
            e.target.style.border = "thick solid #4fc3dc";
            joueur.textContent = " 1 X";
            joueur.style.color = "#ff2d75";
        }
    }
};

cases.forEach((el) => {
    el.addEventListener("click", jouerCase);

});

const rejouer = () => {
    cases.forEach((c) => (c.textContent = ""));
    cases.forEach((c) => (c.style.border = "thick solid white"));
    gridbox.style.display = "grid";
    scorebox.style.display = "flex";
    cardbox.style.display = "none";
}