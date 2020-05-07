//Crea el cono, y los movimientos posibles 
const cono = {
    img: new Image,
    x: 250,
    y: 600,
    speed: 25,

    inicializarCono() {
        this.img = new Image();
        this.img.src = "imagenes/cono2.png";
        this.width = 50;
        this.height = 100;
    },

    mostrarCono() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },

    trataEventoTeclado(evento) {
        if (evento.code == "ArrowRight") {
            this.x += this.speed;
        }
        if (evento.code == "ArrowLeft") {
            this.x -= this.speed;
        }
        juego.render();
    },
}