var ganar = {

    preload: function(){ // carga los recursos (imagenes)
        juego.load.image("fondo", "imagenes/gana.jpg");
        juego.load.image("botonIntentar", "imagenes/volverIntentar.png");
        juego.load.spritesheet('juanito', 
        'imagenes/michi2.png',
        48, 39);
    },

    create: function(){
        fondo = juego.add.tileSprite(00, 0, 360, 480, "fondo"); // agrega el fondo
        
		this.add.button(180,370,"botonIntentar",this.play,this); // agrega el boton para volver a jugar
        
        personaje = juego.add.sprite(-48, 0, "juanito"); // agrega el sprite para que inicie fuera de la pantalla
        personaje.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true); // define las animaciones, la velocidad
        
        this.camera.flash(0x000000, 500, false); // muestra lentamente el estado
    },


    update: function(){ // se ejecuta reiterativamente

        if(personaje.x > 480){ // si el personaje sale de la pantalla vuelve a colocarlos para que inicie nuevamente en -48
            personaje.x = -48;
        }
        this.caminader(); // funcion para caminar a la derecha
    },

    play : function() { // funcion para ir al siguiente estado
        this.camera.fade(0x000000, 200, false); // desvanece el estado
		juego.state.start("juegoUnoIntro");//va al estado del intro del nivel 1
    },

    andar: function(){   // funcion para que el gato camine
        personaje.animations.play("caminar");  // pone la animación en play
    },

    caminader: function(){  // funcion para que camine a la derecha
        this.andar(); 
        personaje.position.x += 2;       // mueve la animación hacia la dercha
        personaje.scale.setTo(1, 1);    // define la orientación de la animación
    },
}