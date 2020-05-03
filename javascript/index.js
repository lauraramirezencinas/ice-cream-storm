
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bola1 = new Image();
bola1.src = "../imagenes/helado1.png";

const bola2 = new Image();
bola2.src = "../imagenes/helado2.png";

const bola3 = new Image();
bola3.src = "../imagenes/helado3.png";

const bola4 = new Image();
bola4.src = "../imagenes/helado4.png";

const bola5 = new Image();
bola5.src = "../imagenes/helado5.png";

const bola6 = new Image();
bola6.src = "../imagenes/helado6.png";

const listaBolas = [bola1, bola2, bola3, bola5, bola6];




const juego = {
    color: "",
    bolas: [],
    bolasRecolectadas: [],
    nivel: 0,
    contadorTick: 0,
    velocidad: 50,
    vidas: 2,
    puntos: 0,
    timer: null,
    frecuencia: 20,
    
    incrementarNivel: function(){
        const newLevel=parseInt(this.contadorTick / 100);
        if(this.nivel !=newLevel ){
            juego.nivel = newLevel;
            juego.frecuencia-=1; 
        }
        let mostrarNivel = document.querySelector("#nivel")
        mostrarNivel.innerHTML = juego.nivel;
    },

    crearBola:function(){
        let bola = new BolaDeHelado;
        juego.bolas.forEach(el => el.moverBola());
        if (this.contadorTick % this.frecuencia == 0) {
            juego.bolas.push(bola);
        }

    },

    tick: function () {
        this.incrementarNivel();
        this.crearBola();
        this.render();
        this.timer = setTimeout(function () {
            juego.tick();    
        }, this.velocidad - this.nivel * 5);
        this.contadorTick++;
        juego.checkCollision();
    },

    
    

    render: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bolas.forEach(function (el) {
            el.pintarBola()
        });
        cono.inicializarCono();
        cono.mostrarCono();
        juego.bolasRecolectadas.forEach((bola, index) => {
            bola.x = cono.x;
            bola.y = cono.y - 45 - (index * 30);
            bola.pintarBola();
        });
    },



    collision: function (cono, bola) {
        let collisionX = (bola.x - 15) < cono.x && (bola.x + 15) > cono.x;
        let collisionY = bola.y > (cono.y - 100) && bola.y < cono.y;

        if (collisionX && collisionY) {
            return true;
        } else {
            return false
        }
    },

    checkCollision: function () {
        juego.bolas.forEach((el, index) => {
            if (juego.collision(cono, el)) {
                if (juego.bolasRecolectadas.length == 0) {
                    juego.color = el.imagenBola;
                    juego.bolasRecolectadas.push(el);
                } else if (juego.color == el.imagenBola) {
                    juego.bolasRecolectadas.push(el);
                    if (juego.bolasRecolectadas.length === 3) {
                        juego.sumarPuntos();
                        setTimeout(function () {
                            juego.bolasRecolectadas = [];
                        }, 1000)
                    }
                }
                else {
                    juego.pierdevida();
                setTimeout(function(){
                    ctx.body.style.backgroundColor = "red";
                },1000);
                }
                juego.bolas.splice(index, 1);
            }
            else if (el.y >= cono.y) {
                juego.bolas.splice(index, 1);
            } else if (this.vidas == 0) {
                this.gameOver()
            }
        });
    },

    pierdevida: function () {
        juego.vidas -= 1;
        let mostrarVida = document.querySelector("#vidas")
        mostrarVida.innerHTML = juego.vidas;
        
    },

    sumarPuntos: function () {
        if (juego.bolasRecolectadas.length == 3) {
            juego.puntos += 1;
        }
        let mostrarPuntos = document.querySelector("#puntos")
        mostrarPuntos.innerHTML = juego.puntos;
        
    },

    gameOver: function () {
        clearTimeout(this.timer);
        document.querySelector('#canvas').style.display = 'none';
        document.querySelector('#game-over').style.display = 'block';
        document.querySelector('#restart-button').style.display = 'block';

    },

    reiniciar: function () {
        this.color = "";
        this.bolas = [];
        this.bolasRecolectadas = [];
        this.nivel = 0;
        this.contadorTick = 0;
        this.velocidad = 100;
        this.vidas = 3;
        this.puntos = 0;
        this.timer = null;
    }
}

let mostrarVida = document.querySelector("#vidas")
mostrarVida.innerHTML = juego.vidas;
let mostrarPuntos = document.querySelector("#puntos")
mostrarPuntos.innerHTML = juego.puntos;
let mostrarNivel = document.querySelector("#nivel")
mostrarNivel.innerHTML = juego.nivel;


const cono = {
    img: new Image,
    x: 250,
    y: 600,
    speed: 20,

    inicializarCono() {
        this.img = new Image();
        this.img.src = "../imagenes/cono2.png";
        this.width = 50;
        this.height = 100;
    },

    mostrarCono() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },


    trataEventoTeclado(evento) {
        console.log(evento);
        if (evento.code == "ArrowRight") {
            this.x += this.speed;
        }
        if (evento.code == "ArrowLeft") {
            this.x -= this.speed;
        }
        juego.render();
    },
}



class BolaDeHelado {
    constructor() {
        this.x = Math.floor(Math.random() * 460 + 10);
        this.y = 10;
        this.vel = 5;
        this.width = 50;
        this.height = 50;
        this.imagenBola = listaBolas[Math.floor(Math.random() * (listaBolas.length))]
    }


    pintarBola() {
        ctx.drawImage(this.imagenBola, this.x, this.y, this.width, this.height);
    }

    moverBola() {
        this.y += this.vel;
    }
}



function ocultar() {
    document.querySelector('#title').style.display = 'none';
    document.querySelector('#start-button').style.display = 'none';
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('#game').style.display = 'block';
}


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        ocultar();
        juego.tick();
    }

    document.getElementById('restart-button').onclick = () => {
        juego.reiniciar();
        document.querySelector('#canvas').style.display = 'block';
        document.querySelector('#game').style.display = 'block';
        document.querySelector('#game-over').style.display = 'none';
        document.querySelector('#restart-button').style.display = 'none';
        juego.tick();
    }

    document.onkeydown = function (event) {
        cono.trataEventoTeclado(event);
        if (cono.x < 0 || cono.x > 470) {
            cono.x = -cono.x;
        }
    }
}



