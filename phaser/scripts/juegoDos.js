
var buttons= [];
var ac = 0;
var juegoDos = {

    preload: function () {
        juego.load.image("fondo", "imagenes/fondo3.jpg");
        juego.load.image("raton", "imagenes/raton.png");
        juego.load.image("estrella", "imagenes/estrella.png");
    },

    create: function () {
        fondo = juego.add.tileSprite(-20, -20, 500, 500, "fondo");
        

        juego.ratones = 10;
        this.crearRatones(juego.ratones);
        this.camera.flash(0x000000, 500, false);
        

        var emitter0 = this.add.particles('estrella').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
    
        var emitter1 = this.add.particles('estrella').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800
        });
    
        this.input.on('pointerdown', function (pointer) {
            emitter0.setPosition(pointer.x, pointer.y);
            emitter1.setPosition(pointer.x, pointer.y);
            emitter0.explode();
            emitter1.explode();
        });
















    },

    update: function () {
        ac++;

        if(juego.ratones == 0){
            this.play();
        }

    },


    crearRatones: function(numRatones){
        for(i=0; i<numRatones; i++){
            x = juego.rnd.integerInRange(30, 320);
            y = juego.rnd.integerInRange(30, 420);
            buttons.push(juego.add.button(x,y,"raton",this.destruirRatones,this));
        }
    },      

    destruirRatones: function(button){
        juego.ratones-=1;
        button.kill();
        this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);
        ;
    },

    play : function(){
        this.camera.fade(0x000000, 200, false);
		juego.state.start("juegoTres");//va al estado "level1"
    },



}