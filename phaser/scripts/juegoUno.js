
var txtPuntaje; // variable para el texto del puntaje
var c; // array para los corazones

var juegoUno = {

	preload: function() {        // primero carga todas las imágenes
		juego.load.image("titulo2", "imagenes/Titulo2.png");
		juego.load.image("titulo", "imagenes/Titulo.png");
		juego.load.image("fondo", "imagenes/fondo3.jpg");
        juego.load.image("botonEmpezar", "imagenes/botonEmpezar.png");
        juego.load.image("piso", "imagenes/platform2.png");
        juego.load.image("raton", "imagenes/raton.png");        
        juego.load.image("corazon", "imagenes/corazon.png");
        juego.load.spritesheet('juanito', 
        'imagenes/michi2.png',
        48, 39);
	},
	
	create: function() {   
        c = [];        // se inicializa el array de corazones
		
        fondo = juego.add.tileSprite(0, 0, 360, 480, "fondo"); // se agrega el fondo
        personaje = juego.add.sprite(150, 325, "juanito"); // se agrega el sprite del personaje
        personaje.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true); // se agregan las animaciones, la velocidad
        personaje.anchor.setTo(0.5); // se establece la mitad
        diamantes = juego.add.group(); // se crea un grupo (perdon por el nombre, deberia ser ratones)
        txtPuntaje = juego.add.text(25, 16, 'Puntaje: 0', { font: '24px Arial', fill: '#000' }); // se crea el texto para el puntaje

        juego.physics.startSystem(Phaser.Physics.ARCADE);  // activa la capacidad de reconocer coliciones, bordes, gravedad, etc
		juego.physics.arcade.enable(personaje); // se aplica la fisica al personaje
        personaje.body.collideWorldBounds = true; // no puede salir de la pantalla
 
        c.push(juego.add.sprite(290, 15, "corazon")); // se agregan los corazones al array
        c.push(juego.add.sprite(310, 15, "corazon"));
        c.push(juego.add.sprite(330, 15, "corazon"));


        plataforma = juego.add.sprite(0, 360, 'piso'); // se crea la plataforma sobre la que esta el personaje

        juego.physics.arcade.enable(plataforma); // se aplica fisica a la plataforma
        personaje.body.gravity.y = 300; // se aplica gravedad al personaje
        plataforma.body.immovable = true; // es un cuerpo que no se puede atravesar

        juego.gravedadDiamantes = 150; // gravedad de los ratones (diamantes)
        juego.puntaje = 0; // se inicializa el puntaje
        juego.perdidos = 0; // se inicializa el contador de ratones (diamantes) perdidos



        flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);  // activa la tecla izquierda

        juego.ac = 0; // contador para saber cada cuanto botar ratones
        juego.numRatones = 0; // contador numero de ratones
        
        this.camera.flash(0x000000, 500, false); // aparece el estado lentamente
	},
	
    update: function(){                // ejecuta de manera reiterativa

        juego.ac += 1; // contador para mostrar ratones
        juego.physics.arcade.collide(personaje, plataforma); // detecta colision  entre personaje y plataforma, no permite que se atraviesen
        juego.physics.arcade.overlap(personaje, diamantes, this.recogerDiamante, null, this); // detecta que se tocan el personaje y el raton, llama la funcion recogerDiamante
        juego.physics.arcade.overlap(plataforma, diamantes, this.perderDiamante, null, this); // detecta que se tocan la plataforma y el raton, llama la funcion perderDiamante

        if(juego.puntaje==20){ // si ha recogido 10 ratones
            this.play(); //pasa al siguiente nivel
        }

        if(juego.perdidos == 5){ // si perdio 5 ratones
            this.perder();  //pierde
        }

        if(juego.ac%70 == 0){ // cada 70 con el contador
            juego.numRatones++; // aumenta el num de ratones
            this.soltarDiamante(juego.rnd.integerInRange(20, 340)); // crea un raton en pos aleatoria
        }
        
        
    	if(flechaderecha.isDown){  // si la flecha derecha esta oprimida
			this.caminader(); // funcion camina a la derecha
		}
		else if(flechaizquierda.isDown){ // si la flecha izquierda esta oprimida
			this.caminaizq(); // funcion camina a la izquierda
        }
        else{
            this.parar(); // si ninguna flecha esta oprimida, no camina
        }
	},
	
	 play : function(){ // cambiarde estad
        this.camera.fade(0x000000, 200, false); // desvanece el estado actual
		juego.state.start("juegoDosIntro");//va al estado intro del juego 2
    },

    perder : function(){ // pasa al estado de perder
        this.camera.fade(0x000000, 200, false);  // desvanece el estado actual
		juego.state.start("perder");//va al estado perer
    },

    
    caminader: function(){ 
        this.andar(); 
        personaje.position.x += 4;       // mueve la animación hacia la dercha
        personaje.scale.setTo(1, 1);    // define la orientación de la animación
    },

    caminaizq: function(){  // funcion para caminar a la izquierda
        this.andar(); // llama a la funcion andar
            personaje.position.x -= 4; // desplaza en -2 en x
            personaje.scale.setTo(-1, 1); // voltea la imagen
    },
    parar: function(){   
        personaje.animations.stop(); // detiene la animación
    },
    andar: function(){  
            personaje.animations.play("caminar");  // pone la animación en play
    },
    soltarDiamante: function(pos) { // genera los ratones que caen
        var diamante = diamantes.create(pos, 20, 'raton'); // crea un raton
        juego.physics.arcade.enable(diamante); // activa la fisica
        diamante.body.gravity.y = juego.gravedadDiamantes; // le asigna la gravedad
    },
    recogerDiamante: function (_, diamante){ // cuando se tocan el personaje y el raton
        diamante.kill(); // destruye el raton
        juego.puntaje += 2; // aumenta el puntaje
        txtPuntaje.setText('Puntaje: '+juego.puntaje); // cambia el texto del puntaje
       },
    perderDiamante: function (_, diamante){ // cuando se tocan el raton y la plataforma
        if(c.length==1){ // si no hay corazones
            this.perder(); //pierde
        }else{ // si hay corazones 
            c.pop().alpha = 0; // saca el corazon del array y lo desvanece
            diamante.kill(); // destruye el raton
            this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true); // tiembla el canvas
        }
    },
    
 
}

