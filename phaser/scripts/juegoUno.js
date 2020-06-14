
var txtPuntaje;

var juegoUno = {

	preload: function() {        // primero carga todas las imágenes
		juego.load.image("titulo2", "imagenes/Titulo2.png");
		juego.load.image("titulo", "imagenes/Titulo.png");
		juego.load.image("fondo", "imagenes/fondo3.jpg");
        juego.load.image("botonEmpezar", "imagenes/botonEmpezar.png");
        juego.load.image("piso", "imagenes/platform2.png");
        juego.load.image("raton", "imagenes/raton.png");
        juego.load.spritesheet('juanito', 
        'imagenes/michi2.png',
        48, 39);
	},
	
	create: function() {           // crea los actores y muestra las imágenes
		
        fondo = juego.add.tileSprite(0, 0, 360, 480, "fondo");
        personaje = juego.add.sprite(150, 325, "juanito");
        personaje.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        personaje.anchor.setTo(0.5); 
        diamantes = juego.add.group();
        txtPuntaje = juego.add.text(25, 16, 'Puntaje: 0', { font: '24px Arial', fill: '#000' });

        juego.physics.startSystem(Phaser.Physics.ARCADE);  // activa la capacidad de reconocer coliciones, bordes, gravedad, etc
		juego.physics.arcade.enable(personaje);
        personaje.body.collideWorldBounds = true;
 


        plataforma = juego.add.sprite(0, 360, 'piso');

        juego.physics.arcade.enable(plataforma);
        personaje.body.gravity.y = 300;
        plataforma.body.immovable = true;

        juego.gravedadDiamantes = 150;
        juego.puntaje = 0;



        flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT); 

        juego.ac = 0;
        juego.numRatones = 0;
        
        this.camera.flash(0x000000, 500, false);
	},
	
    update: function(){                // ejecuta de manera reiterativa

        juego.ac += 1;
        juego.physics.arcade.collide(personaje, plataforma);
        juego.physics.arcade.overlap(personaje, diamantes, this.recogerDiamante, null, this);
        juego.physics.arcade.overlap(plataforma, diamantes, this.perderDiamante, null, this);

        if(juego.puntaje==20){
            this.play();
        }

        if(juego.numRatones == 50){
            //perdio
        }

        if(juego.ac%70 == 0){
            this.soltarDiamante(juego.rnd.integerInRange(20, 340));
        }
        
        
    	if(flechaderecha.isDown){
			this.caminader();
		}
		else if(flechaizquierda.isDown){
			this.caminaizq();
        }
        else{
            this.parar();
        }
	},
	
	 play : function(){
        this.camera.fade(0x000000, 200, false);
		juego.state.start("juegoDos");//va al estado "level1"
    },

    
    caminader: function(){ 
        this.andar(); 
        personaje.position.x += 2;       // mueve la animación hacia la dercha
        personaje.scale.setTo(1, 1);    // define la orientación de la animación
                // mientras actua el botón se ve al 100%
    },
    caminaizq: function(){  
        this.andar();
            personaje.position.x -= 2;
            personaje.scale.setTo(-1, 1);
    },
    parar: function(){  
        personaje.animations.stop(); // detiene la animación
    },
        andar: function(){  
            personaje.animations.play("caminar");  // pone la animación en play
    },
    soltarDiamante: function(pos) {
        var diamante = diamantes.create(pos, 20, 'raton');
        juego.physics.arcade.enable(diamante);
        diamante.body.gravity.y = juego.gravedadDiamantes;
    },
    recogerDiamante: function (_, diamante){
        diamante.kill();
        juego.puntaje += 2;
        txtPuntaje.setText('Puntaje: '+juego.puntaje);
       },
    perderDiamante: function (_, diamante){
        diamante.kill();
    },
    
 
}


              // inicia con el estado "jugando"
