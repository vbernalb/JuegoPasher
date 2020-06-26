var juegoUnoIntro = {

    preload: function(){ // se cargan los recursos
        juego.load.image("fondo", "imagenes/nivel1Intro.jpg");
    },
    
    create: function(){
        fondo = juego.add.tileSprite(0, 0 , 360, 480, "fondo"); // se agrega el fondo

        juego.tiempo = 0; // se inicializa el tiempo
        juego.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);  // se ejecuta la funcion updateCounter cada que pasa un seg



        this.camera.flash(0x000000, 500, false); // muestra lentamente el estado
    }, 

    update: function(){
        if(juego.tiempo == 8){ // si pasan 8 seg
            this.play(); // cambia de estado (funcion)
        }
    },

    updateCounter: function() { // aumenta en 1 seg el tiempo
        juego.tiempo++;
    },

    play : function(){ // cambia de estado
		juego.state.start("juegoUno");//va al estado del juego 1
	},

}