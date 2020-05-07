class BolaDeHelado {
    constructor(comodin) {
        this.x = Math.floor(Math.random() * 460 + 10);
        this.y = 10;
        this.vel = 5;
        this.width = 50;
        this.height = 50;

        if (comodin) {
            this.tipo = Math.floor(Math.random() * (listaBolasComodin.length));
            this.imagenBola = listaBolasComodin[this.tipo];
        } else {
            this.tipo = -1;
            if (juego.comodinActivado) {
                this.imagenBola = juego.color;
            } else {
                this.imagenBola = listaBolas[Math.floor(Math.random() * (listaBolas.length))];
            }
        }
    }

    pintarBola() {
        ctx.drawImage(this.imagenBola, this.x, this.y, this.width, this.height);
    }

    moverBola() {
        this.y += this.vel;
    }
}
