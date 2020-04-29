var gameStarted = false
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const juego = {
    //color="",
    bolas: [],
    //bolasRecolectadas=[],
    nivel: 0,
    contadorTick: 0,
    velocidad: 100,
    vidas: 3,



    tick: function () {
        this.nivel = parseInt(this.contadorTick / 100)
        juego.bolas.forEach(el => el.moverBola());
        if (this.contadorTick % 10== 0){
            let bola = new BolaDeHelado;
            juego.bolas.push(bola);
        }
        this.render();
        setTimeout(function () {
            juego.tick()
        }, this.velocidad - this.nivel * 10);
        this.contadorTick++;
        juego.checkCollision();

        //window.requestAnimationFrame(tick);
    },

    render: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bolas.forEach(function (el) {
            el.pintarBola()
        });
        cono.dibujoCono();
    },

    collision: function (cono, bola) {
        let collisionX = (bola.x - 15) < cono.x  && (bola.x + 15) > cono.x;
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
                juego.pierdevida();
                juego.bolas.splice(index,1);
                console.log("COLISION");
            }
            // else if (el.y >= cono.y){
            //     juego.bolas.splice(index,1);
            // }

        });
    },

    pierdevida: function () {
        juego.vidas -= 1;
        let mostrarVida = document.querySelector("#vidas")
        mostrarVida.innerHTML = juego.vidas;
    },
}


let mostrarVida = document.querySelector("#vidas")
mostrarVida.innerHTML = juego.vidas;




const cono = {
    //img : new Image
    x: 250,
    y: 650,
    speed: 20,


    dibujoCono() {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, 650);
        ctx.lineTo(this.x - 25, 600);
        ctx.lineTo(this.x + 25, 600);
        ctx.closePath();
        ctx.stroke();
    },

    //inicializar: function () {
    //    this.img = new Image();
    //    this.img.src = "/images/car.png";
    //    this.width = 50;
    //    this.height = 100;
    //  },

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
        this.vel = 3;

    }
    pintarBola() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, (Math.PI / 180) * 360);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 10;
        ctx.closePath();
        ctx.stroke();
    }
    moverBola() {
        this.y += this.vel;
    }
}



function startGame() {
    if (gameStarted) {
        return
    }
    gameStarted = true;
    juego.tick();

}

function ocultar() {
    document.querySelector('#start-button').style.display = 'none';
    document.querySelector('#canvas').style.display = 'block';
}


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        ocultar();
        startGame();
    };

    document.onkeydown = function (event) {
        cono.trataEventoTeclado(event);
        if (cono.x <= 10 || cono.x >= 470) {
            cono.speed = -cono.speed
        }
    }
};


