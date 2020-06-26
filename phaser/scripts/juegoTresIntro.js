var juegoTresIntro = {

    preload: function(){ // se cargan los recursos
        juego.load.image("fondo", "imagenes/nivel3Intro.jpg");
    },
    
    create: function(){
        fondo = juego.add.tileSprite(0, 0 , 360, 480, "fondo"); // se agrega el fondo

        juego.tiempo = 0; // se inicializa el tiempo
        juego.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this); // se ejecuta la funcion updateCounter cada que pasa un seg


        this.camera.flash(0x000000, 500, false); // muestra lentamente el estado
    }, 

    update: function(){
        if(juego.tiempo == 8){ // si transcurren 8 seg
            this.play(); // cambia de estado
        }
    },

    updateCounter: function() { // aumenta el tiempo en 1 seg 
        juego.tiempo++; 
    },

    play : function(){ // cambia de estado
		juego.state.start("juegoTres");//va al estado del juego 3
	},

}