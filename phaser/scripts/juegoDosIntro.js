var juegoDosIntro = {

    preload: function(){ // se cargan los recursos
        juego.load.image("fondo", "imagenes/nivel2Intro.jpg");
    },
    
    create: function(){
        fondo = juego.add.tileSprite(0, 0 , 360, 480, "fondo"); // se agrega el fondo

        juego.tiempo = 0; // se inicializa el tiempo
        juego.time.events.loop(Phaser.Timer.SECOND,this.updateCounter, this); // se ejecuta la funcion update counter cada que pasa 1 seg


        this.camera.flash(0x000000, 500, false); // muestra lentamente el estado
    }, 

    update: function(){ // se ejecuta reiterativamente
        if(juego.tiempo == 8){ // si pasan 8 seg
            this.play(); // manda al siguiente estado
        }
    },

    updateCounter: function() { // actualiza la variable de tiempo
        juego.tiempo++; // aumenta 1 seg
    },

    play : function(){ // funcion para ir al siguiente estado
		juego.state.start("juegoDos");//va al estado del juego 2
	},

}