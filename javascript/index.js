/*
Este archivo contiene 
*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Audio del juego 
const audio1 = document.getElementById("audio1");
audio1.volume = 0.5;

const audio2 = document.getElementById("audio2");
audio2.volume = 0.5;

const audio3 = document.getElementById("audio3");
audio3.volume = 0.5;


//Muestra el popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}


//Imagenes de las bolas de helado
const bola1 = new Image();
bola1.src = "imagenes/helado1.png";

const bola2 = new Image();
bola2.src = "imagenes/helado2.png";

const bola3 = new Image();
bola3.src = "imagenes/helado3.png";

const bola4 = new Image();
bola4.src = "imagenes/helado4.png";

const bola5 = new Image();
bola5.src = "imagenes/helado5.png";

const bola6 = new Image();
bola6.src = "imagenes/helado6.png";

const bolaComodin1 = new Image();
bolaComodin1.src = "imagenes/comodin1.png";

const bolaComodin2 = new Image();
bolaComodin2.src = "imagenes/comodin2.png";

const listaBolas = [bola1, bola2, bola3, bola5, bola6];
const listaBolasComodin = [bolaComodin1, bolaComodin2];


//Vidas, puntos y nivel del juego 
let mostrarVida = document.querySelector("#vidas")
mostrarVida.innerHTML = juego.vidas;
let mostrarPuntos = document.querySelector("#puntos")
mostrarPuntos.innerHTML = juego.puntos;
let mostrarPuntosGanados = document.querySelector("#puntos-ganados")
mostrarPuntosGanados.innerHTML = juego.puntos;



//Oculta el titulo, el boton start, las instrucciones y muestra el juego
function ocultar() {
    document.querySelector('#imagen-titulo').style.display = 'none';
    document.querySelector('#start-button').style.display = 'none';
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#instrucciones').style.display = 'none';
}

//Ocualta la imagen de game Over, el boton restart y muestra el juego 
function ocultarGameOver() {
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#game-over').style.display = 'none';
    document.querySelector('#restart-button').style.display = 'none';
    document.querySelector('#puntos-ganados').style.display = 'none';

}


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        ocultar();
        audio1.play();
        juego.tick();
    }

    document.getElementById('restart-button').onclick = () => { 
        let mostrarPuntosGanados = document.querySelector("#puntos-ganados")
        mostrarPuntosGanados.innerHTML = juego.puntos;
        ocultarGameOver();
        audio1.play();
        juego.tick();
    }

    document.getElementById('boton-music').onclick = () => { 
        return audio1.paused ? audio1.play() : audio1.pause();
    }

    document.onkeydown = function (event) {
        cono.trataEventoTeclado(event);
        if (cono.x < 0) {
            cono.x = -cono.x;
        } else if (cono.x >= 475) {
            cono.x = 460;
        }
    }
}



