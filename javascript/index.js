var gameStarted = false
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const juego = {
    //color="",
    bolas: [],
    //bolasRecolectadas=[],
    //velocidad=0,
    nivel:0,
    contadorTick:0,  
    velocidad: 1000,
    

    tick: function () {
        this.nivel = parseInt(this.contadorTick/10)
        let bola = new BolaDeHelado;
        juego.bolas.forEach(el=> el.moverBola());
        juego.bolas.push(bola);
        this.render();
        setTimeout(function(){
            juego.tick()
        },this.velocidad - this.nivel *100 );
        this.contadorTick++;   
    },

    render: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bolas.forEach(function (el) {
            el.pintarBola()
        });
        cono.dibujoCono();
    },


}

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
        this.vel=30;
    }
    pintarBola() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, (Math.PI / 180) * 360);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 10;
        ctx.closePath();
        ctx.stroke();
    }
    moverBola(){
        this.y += this.vel;
    }
}



function startGame() {
    if (gameStarted){
        return
    }
    gameStarted=true;
    juego.tick();
    

}

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };


    document.onkeydown = function (event) {
        cono.trataEventoTeclado(event);
        if (cono.x <= 10 || cono.x >= 470) {
            cono.speed = -cono.speed
        }
    }


};

