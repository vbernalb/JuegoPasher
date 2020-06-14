// Ejemplo de una estructura mínima para un juego creado utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño

//declara todas las variables globales


// Define "jugando", donde va a ocurrir el juego
// El estado jugando tiene tres métodos básicos: preload, create y update
var Principal = {

	preload: function() {        // primero carga todas las imágenes
		juego.load.image("titulo2", "imagenes/Titulo2.png");
		juego.load.image("titulo", "imagenes/Titulo.png");
		juego.load.image("fondo", "imagenes/fondo.png");
		juego.load.image("botonEmpezar", "imagenes/botonEmpezar.png");
	},
	
	create: function() {           // crea los actores y muestra las imágenes
		
		fondo = juego.add.tileSprite(0, 0, 360, 480, "fondo");
		titulo = this.add.image(55,80,"titulo");
		this.add.button(100,300,"botonEmpezar",this.play,this);


	},
	
	update: function(){                // ejecuta de manera reiterativa
		fondo.tilePosition.x -= 0.5;	//  mueve el fondo un pixel a la izquierda
		
		if(juego.input.activePointer.isDown) {
			juego.input.activePointer
		}
	},
	
	 play : function(){
		juego.state.start("juegoDos");//va al estado "level1"
	},
 
}


              // inicia con el estado "jugando"
