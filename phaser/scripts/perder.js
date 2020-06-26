var perder = {

    preload: function(){ // carga los recursos
        juego.load.image("fondo", "imagenes/pierde.jpg");
        juego.load.image("botonIntentar", "imagenes/volverIntentar.png");
        juego.load.spritesheet('juanito', 
        'imagenes/michi2.png',
        48, 39);
    },

    create: function(){
        fondo = juego.add.tileSprite(00, 0, 360, 480, "fondo"); // agrga el fondo
        
		this.add.button(100,350,"botonIntentar",this.play,this); // agrega el boton para volver a intentar
        
        personaje = juego.add.sprite(-48, 0, "juanito"); // agrega el sprite de juanito el michi
        personaje.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true); // agrega las animacione del michi
        
        this.camera.flash(0x000000, 500, false); // aparece lentamentee el estado
    },


    update: function(){
        if(personaje.x > 480){ // si el personaje esta por fuera de la pantalla lo vuelve a poner en x -48
            personaje.x = -48;
        }
        this.caminader(); // llama funcion para caminar a la derecha
    },

    play : function(){ // cambia de estado
        this.camera.fade(0x000000, 200, false); // desvanece la estado actual
		juego.state.start("juegoUnoIntro");//va al estado del intro del juego 1
    },

    andar: function(){  
        personaje.animations.play("caminar");  // pone la animación en play
    },

    caminader: function(){ 
        this.andar(); 
        personaje.position.x += 2;       // mueve la animación hacia la dercha
        personaje.scale.setTo(1, 1);    // define la orientación de la animación
    },
}