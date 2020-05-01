var gameStarted = false
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colores = ["#f00", "#56E884", "#6881FF", "#EF50FF"]


const juego = {
    color: "",
    bolas: [],
    bolasRecolectadas: [],
    nivel: 0,
    contadorTick: 0,
    velocidad: 100,
    vidas: 2,
    puntos: 0,


    tick: function () {
        this.nivel = parseInt(this.contadorTick / 100)
        let bola = new BolaDeHelado;
        juego.bolas.forEach(el => el.moverBola());
        if (this.contadorTick % 10 == 0) {
            juego.bolas.push(bola);
        }
        this.render();
        setTimeout(function () {
            juego.tick()
        }, this.velocidad - this.nivel * 10);
        this.contadorTick++;
        juego.checkCollision();

    },

    render: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bolas.forEach(function (el) {
            el.pintarBola()
        });
        cono.inicializarCono ();
        cono.mostrarCono();
        juego.bolasRecolectadas.forEach((bola, index) => {
            bola.x = cono.x;
            bola.y = cono.y - 30 - (index * 30);
            bola.pintarBola();
        });
        //window.requestAnimationFrame(juego.tick);
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
                    if (juego.bolasRecolectadas.length > 3) {
                        juego.sumarPuntos();
                        juego.bolasRecolectadas = [];
                    }
                }
                else {
                    juego.pierdevida();
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
       // if (juego.bolasRecolectadas.length == 3) {
            juego.puntos += 1;
        //}
        let mostrarPuntos = document.querySelector("#puntos")
        mostrarPuntos.innerHTML = juego.puntos;
    },

    gameOver: function () {
        document.querySelector('#canvas').style.display = 'none';
        document.querySelector('#game-over').style.display = 'block';
        document.querySelector('#restart-button').style.display = 'block';

    },
}


let mostrarVida = document.querySelector("#vidas")
mostrarVida.innerHTML = juego.vidas;
let mostrarPuntos = document.querySelector("#puntos")
mostrarPuntos.innerHTML = juego.puntos;



const cono = {
    img : new Image,
    x: 250,
    y: 600,
    speed: 20,

    inicializarCono () {
       this.img = new Image();
       this.img.src = "../imagenes/cono2.png";
       this.width = 50;
       this.height = 100;    
    }, 

     mostrarCono(){
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
        this.x = Math.floor(Math.random() * 500 - 50);
        this.y = 10;
        this.vel = 5;
        this.width = 50;
        this.height = 50; 
        //this.color = colores[Math.floor(Math.random() * (colores.length))]
        this.imagenBola=listaBolas[Math.floor(Math.random() * (listaBolas.length))]
    }


    pintarBola() {
        ctx.drawImage(this.imagenBola, this.x, this.y, this.width, this.height);
    }

    moverBola() {
        this.y += this.vel;
    }
}

const bola1= new Image(); 
bola1.src="../imagenes/helado1.png";

const bola2= new Image(); 
bola2.src="../imagenes/helado2.png";
    
const bola3= new Image(); 
bola3.src="../imagenes/helado3.png";

const bola4= new Image(); 
bola4.src="../imagenes/helado4.png"; 

const bola5= new Image(); 
bola5.src="../imagenes/helado5.png"; 

const bola6= new Image(); 
bola6.src="../imagenes/helado6.png"; 
    
const listaBolas=[bola1, bola2, bola3,bola5,bola6];

function startGame() {
    // if (gameStarted) {
    //     return
    // }
    // gameStarted = true;
    juego.tick();

}

function ocultar() {
    document.querySelector('#start-button').style.display = 'none';
    document.querySelector('#canvas').style.display = 'block';
    //document.querySelector('#restart-button').style.display = 'none';
}


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        ocultar();
        startGame();
    };

    document.getElementById('restart-button').onclick = () => {
        gameStarted = false;
       // document.querySelector('#canvas').style.display = 'block';
        //document.querySelector('#game-over').style.display = 'block';
        //document.querySelector('#restart-button').style.display = 'block';
        startGame();
    };

    document.onkeydown = function (event) {
        cono.trataEventoTeclado(event);
        if (cono.x <= 10 || cono.x >= 470) {
            cono.speed = -cono.speed
        }
    }
};



