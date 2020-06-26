
var Principal = {

	preload: function() {        // se cargan todos los recursos a utilizar (imagenes)
		juego.load.image("titulo2", "imagenes/Titulo2.png");
		juego.load.image("titulo", "imagenes/Titulo.png");
		juego.load.image("fondo", "imagenes/fondo.png");
		juego.load.image("botonEmpezar", "imagenes/botonEmpezar.png");
	},
	
	create: function() {           // crea los actores y muestra las imágenes
		
		fondo = juego.add.tileSprite(0, 0, 360, 480, "fondo"); // se agrega el fondo
		titulo = this.add.image(55,80,"titulo"); // se agrega la imagen del titulo
		this.add.button(100,300,"botonEmpezar",this.play,this);  // se agrega el boton para jugar

	},
	
	update: function(){                // ejecuta de manera reiterativa
		fondo.tilePosition.x -= 0.5;	//  mueve el fondo un medio pixel a la izquierda
	},
	
	 play : function(){
		juego.state.start("juegoUnoIntro");//va al estado del intro del juego 1
	},
 
}
