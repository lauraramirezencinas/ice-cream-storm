const juego = {
    color: "",
    bolas: [],
    bolasRecolectadas: [],
    nivel: 0,
    contadorTick: 0,
    velocidad: 50,
    vidas: 3,
    puntos: 0,
    frecuencia: 20,
    frecuenciaBolaComodin: 100,
    comodinActivado: false,
    timeouts: [],
    timeInterval:[],
    comodinTimer: 5,

    //Incrementa el nivel y el numero de bolas creadas (frecuencia)
    incrementarNivel: function () {
        const newLevel = parseInt(this.contadorTick / 100);
        if (this.nivel != newLevel) {
            juego.nivel = newLevel;
            if (juego.frecuencia > 13) {
                juego.frecuencia -= 1;
            }
        }
        let mostrarNivel = document.querySelector("#nivel")
        mostrarNivel.innerHTML = juego.nivel;
    },

    //Crea bolas normales 
    crearBola: function () {
        juego.bolas.forEach(el => el.moverBola());
        if (this.contadorTick % this.frecuencia == 0) {
            let bola = new BolaDeHelado(false);
            juego.bolas.push(bola);
        }

    },
    //Crea bolas comodin 
    crearBolaComodin: function () {
        if (this.contadorTick % this.frecuenciaBolaComodin == 0) {
            let bolaComodin = new BolaDeHelado(true);
            juego.bolas.push(bolaComodin);
        }
    },

    //Incia el juego , limitando la velocidad de la caida de las bolas 
    tick: function () {
        this.incrementarNivel();
        this.crearBola();
        this.crearBolaComodin();
        this.render();
        var vel = this.velocidad - this.nivel * 5;
        if (vel < 25) {
            vel = 25;
        }
        this.timeouts.push(setTimeout(function () {
            juego.tick();
        }, vel))
        this.contadorTick++;
        juego.checkCollision();
    },

    //Actualiza el juego, volviendo a pintar todo en el canvas 
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
        document.querySelector("#countdown").innerHTML = `0:0${juego.comodinTimer}`;

    },

    //Verifica si hay choque entre el cono y una bola de helado
    collision: function (cono, bola) {
        let collisionX = ((bola.x / 2) - 30) < cono.x / 2 && ((bola.x / 2) + 30) > cono.x / 2;
        let collisionY = bola.y > (cono.y - 80) && bola.y < cono.y;

        if (collisionX && collisionY) {
            return true;
        } else {
            return false
        }
    },

    //Verifica si hay colision entre el cono y la bola de helado
    checkCollision: function () {
        juego.bolas.forEach((el, index) => {
            if (juego.collision(cono, el)) {
                //Primero verifica si es una bola normal o una bola comodin, aqui es una bola normal 
                if (el.tipo < 0) {
                    //Verifica si ya hay una bola en el cono, si no hay, guarda el color de la bola,
                    if (juego.bolasRecolectadas.length == 0) {
                        juego.color = el.imagenBola;
                        juego.bolasRecolectadas.push(el);
                    } else if (juego.color == el.imagenBola) {
                        juego.bolasRecolectadas.push(el);
                        //cada tres bolas del mismo color suma un punto,
                        if (juego.bolasRecolectadas.length === 3) {
                            juego.sumarPuntos();
                            setTimeout(function () {
                                juego.bolasRecolectadas = [];
                            }, 70)
                        }
                    }
                    //Si colisiona con una bola de otro color pierde una vida
                    else {
                        juego.pierdevida();
                    }
                }
                //Si es una bola comodin, hay 2 opciones, primero gana vida 
                else if (el.tipo == 0) {
                    juego.sumarvida();
                }
                //O cambia todas las bolas que habian y crea nuevas bolas por 5 segundos del color que tenia la bola en los conos 
                else if (el.tipo == 1) {
                    if (juego.bolasRecolectadas.length == 0) {
                        return
                    } else {
                        juego.bolas.forEach(function (bola) {
                            bola.imagenBola = juego.color;
                        })
                        juego.comodinActivado = true;
                        juego.comodinTimer = 5;
                        juego.interval = setInterval(function () {
                            juego.comodinTimer--;
                            console.log(juego.comodinTimer)
                        }, 1000);
                        //this.timeInterval.push(juego.interval);
                        this.timeouts.push(setTimeout(function () {
                            juego.comodinActivado = false;
                            clearInterval(juego.interval);
                        }, 5000))
                    }
                }

                juego.bolas.splice(index, 1);
            }
            //Se Elimina las bolas de la lista 
            else if (el.y >= cono.y) {
                juego.bolas.splice(index, 1);
                //Pierde el juego cuando pierde 3 vidas     
            } else if (this.vidas == 0) {
                this.gameOver()
            }
        });
    },

    //Pierde vida
    pierdevida: function () {
        juego.vidas -= 1;
        let mostrarVida = document.querySelector("#vidas")
        mostrarVida.innerHTML = juego.vidas;

        canvas.style.backgroundColor = "#f45775";
        audio3.play();
        this.timeouts.push(setTimeout(function () {
            canvas.style.backgroundColor = "rgb(243, 233,198, 0.75)";
        }, 100));

    },

    //Suma una vida 
    sumarvida: function () {
        juego.vidas += 1;
        let mostrarVida = document.querySelector("#vidas")
        mostrarVida.innerHTML = juego.vidas;

    },

    //Suma puntos
    sumarPuntos: function () {
        if (juego.bolasRecolectadas.length == 3) {
            juego.puntos += 1;
        }
        let mostrarPuntos = document.querySelector("#puntos")
        mostrarPuntos.innerHTML = juego.puntos;

    },

    //Pierde el juego 
    gameOver: function () {
        clearTimeout(this.timer);
        document.querySelector('#canvas').style.display = 'none';
        document.querySelector('#game').style.display = 'none';
        document.querySelector('#game-over').style.display = 'block';
        document.querySelector('#restart-button').style.display = 'block';
        document.querySelector('#puntos-ganados').style.display = 'block';
        let mostrarPuntosGanados = document.querySelector("#puntos-ganados")
        mostrarPuntosGanados.innerHTML = juego.puntos;
        audio1.pause();
        audio3.pause();
        audio2.play(); 
        this.reiniciar();

    },

    //Reinicializa todas las variables a 0, para volver a comenzar 
    reiniciar: function () {
        this.color = "";
        this.bolas = [];
        this.bolasRecolectadas = [];
        this.nivel = 0;
        this.contadorTick = 0;
        this.velocidad = 50;
        this.vidas = 3;
        this.puntos = 0;
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        canvas.style.backgroundColor = "rgb(243, 233,198, 0.75)";
        this.timeouts = [];
        this.comodinTimer= 5;
        for (let i = 0; i < this.timeInterval.length; i++) {
            clearInterval(this.timeInterval[i]);
        };
        this.timeInterval=[];
        let mostrarVida = document.querySelector("#vidas")
        mostrarVida.innerHTML = juego.vidas;
        let mostrarPuntos = document.querySelector("#puntos")
        mostrarPuntos.innerHTML = juego.puntos;
        let mostrarNivel = document.querySelector("#nivel")
        mostrarNivel.innerHTML = juego.nivel;

    }

}