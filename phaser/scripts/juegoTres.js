
var raton; // variable para el raton actual
var nRat; // cantidad de ratones
var ratBien; // cantidad de ratones que estan en la zona corrrecta
var potencia = 0; // potencia del movimiento
var c; // array de corazones

var juegoTres = {

    preload: function(){ // se cargan los recursos
        juego.load.image("fondo", "imagenes/fondotres.jpg");
        juego.load.image("titulo", "imagenes/Titulo.png");
        juego.load.image("raton", "imagenes/raton.png");
        juego.load.image("corazon", "imagenes/corazon.png");
        
    },

    create: function(){
        c = []; // se inicializa el array de corazones
        fondo = juego.add.tileSprite(-20, -20, 500, 500, "fondo"); // se agrega el fondo
        
        nRat = 1; // se inicializa el numero de ratones
        ratBien = 0; // se inicializa
        this.crearRatones(); // se crea el primer raton

        c.push(juego.add.sprite(290, 465, "corazon")); // se crean los corazones y se agregan al arra c
        c.push(juego.add.sprite(310, 465, "corazon"));
        c.push(juego.add.sprite(330, 465, "corazon"));


        this.camera.flash(0x000000, 500, false); // aparece el estado lentamente

    },

    update: function(){ // se ejecuta reiterativamente
        if(juego.input.activePointer.isDown) { // si el mouse o la pantalla está oprimida, se aumenta en 1 la potencia del movimiento
            potencia++;
        }

        else if(potencia>0){ // si el raton no está oprimido y hay potencia
            this.mover(); // ejecuta la funcion mover
        }


        if(raton.y < -31 || raton.y < 30 && potencia == 0){ // si el raton esta por fuera de la pantalla, o fuera de la zona y no tiene potencia
            if(c.length == 1){ // si no hay corazones
             this.perder(); // pierde
            }else{ // si tiene corazones         
                c.pop().alpha = 0; // saca un corazon y lo desvanece
                nRat++; // aumenta el num de ratones
                raton.alpha = 0; // desvanece el raton que no esta en la zona adecuada
                this.crearRatones(); // crea un nuevo raton
                this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true); //hace temblar el canvas
            }
        }

        else if(potencia ==0 && raton.y> 30 && raton.y<80){ // si no hay potencia y el raton esta en la zona establecida(dentro de las coordenadas)
            if(ratBien == 2){ // si ya tiene 3 ratones en la zona gana
                this.ganar();  
            }else{ // si no hay 3 ratones en la zona
                nRat++; // aumenta la cantidad de ratones
                ratBien++; // aumenta la cantidad de ratones en la zona correcta
                this.crearRatones(); // crea otro raton
            }
        }



    },

    ganar: function(){ // funcion para pasar al estado de ganar (termina el juego)
        this.camera.fade(0x000000, 200, false); // desvanece el estado
		juego.state.start("ganar");//va al estado ganar
    },

    perder : function(){ // funcion para el estado perder
        this.camera.fade(0x000000, 200, false); // desvanece el estado
		juego.state.start("perder");//va al estado perder
    },

    mover: function () { // funcion para mover al raton
        potencia--;
        raton.y -=5;

    },

    crearRatones: function () { // funcion para crear ratones 
        potencia = 0; // se establece nuevamente la potencia en 0 para el nuevo raton
        x = 50*nRat; // cambia coordenada en x
        y = 100 + 70*nRat; // cambia coordenada en y
        raton = juego.add.sprite(x,y, "raton"); // se crea el raton

    }

}