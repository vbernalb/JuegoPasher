
var buttons;  // variable para los ratones
var c; // variable que almacena los corazones

var juegoDos = {


    preload: function () { // se cargan los recursos 
        juego.load.image("fondo", "imagenes/fondodos.png");
        juego.load.image("raton", "imagenes/raton.png");
        juego.load.image("ratonera", "imagenes/ratonera.png");
        juego.load.image("estrella", "imagenes/estrella.png");
        juego.load.image("corazon", "imagenes/corazon.png");
    },

    create: function () {
        c = []; // se inicializa el array
        buttons= []; // se inicializa el array
        fondo = juego.add.tileSprite(-20, -20, 500, 500, "fondo"); // se agrega el fondo
        juego.tiempo = 0; // se inicializa la variable donde se almacena el tiempo
        juego.timerText = this.game.add.text(15, 15, "Tiempo: "+juego.tiempo, this.fontBig); // se crea el texto que muestra el tiempo
        
        juego.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this); // es el loop que se ejecuta cada segundo, llama la funcion updateCounter

        c.push(juego.add.sprite(290, 15, "corazon")); // se agrega un corazón al array
        c.push(juego.add.sprite(310, 15, "corazon")); // se agrega un corazón al array
        c.push(juego.add.sprite(330, 15, "corazon")); // se agrega un corazón al array


        juego.ratones = 15; // se define la cantidad de ratones que van a aparecer
        juego.ratoneras = 5; // se define la cantidad de ratoneras que van a aparecer
        this.crearRatones(juego.ratones); // se llama la funcion que crea los ratones
        this.crearRatoneras(juego.ratoneras); // se llama la funcion que crea las ratoneras

        this.camera.flash(0x000000, 500, false); // para que el estado aparezca lentamente
    },

    update: function () {

        if(juego.tiempo==11){ //pierde si se demora mas de 10 seg
            this.perder();
        }

        if(juego.ratones == 0){ // si consigue todos los ratones gana y pasa al siguiente nivel
            this.play();
        }

    },


    crearRatones: function(numRatones){ // funcion para crea los ratones, recibe la cantidad de ratones que se quiere crear
        for(i=0; i<numRatones; i++){
            x = juego.rnd.integerInRange(30, 300); // coordenada aleatoria para x
            y = juego.rnd.integerInRange(80, 420);// coordenada aleatoria para y
            buttons.push(juego.add.button(x,y,"raton",this.destruirRatones,this)); // se crea el raton como un boton con las coordenadas aleatorias y la funcion destruir ratones
        }
    },    
    
    crearRatoneras: function(numRatones){ // funcion para crea las ratoneras, recibe la cantidad de ratoneras que se quiere crear
        for(i=0; i<numRatones; i++){
            x = juego.rnd.integerInRange(30, 320); // coordenada aleatoria para x
            y = juego.rnd.integerInRange(30, 420); // coordenada aleatoria para y
            buttons.push(juego.add.button(x,y,"ratonera",this.destruirRatoneras,this)); // se crea la ratonera como un boton con las coordenadas aleatorias y la funcion destruir ratoneras
        }
    },  

    destruirRatoneras: function(button){ // funcion para destruir ratoneras
        if(c.length==1){ // si ya no quedan corazones, pierde
            this.perder()
        }else{ // si tiene corazones
            c.pop().alpha = 0; // se saca el corazon del array y se desvanece
            button.kill(); // se destruye el boton
            this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true); // se mueve la camara del canvas
        }
        
    },

    destruirRatones: function(button){ // funcion para destruir ratones
        juego.ratones-=1; // se disminuye el contador de ratones
        button.kill(); // se destruye el boton
    },

    play : function(){ // funcion para pasar al siguiente nivel
        this.camera.fade(0x000000, 200, false); // desvanece el estado
		juego.state.start("juegoTresIntro");//va al estado del intro del juego 3
    },

    perder : function(){ // funcion que se ejecuta cuando pierde
        this.camera.fade(0x000000, 200, false); // desvanece el estado
		juego.state.start("perder");//va al estado perder
    },

    updateCounter: function() { // funcion para actualizar el contador de tiempo
        juego.tiempo++; // aumenta 1 seg
        juego.timerText.setText("Tiempo: "+juego.tiempo); // cambia el texto mostrado
    },



}