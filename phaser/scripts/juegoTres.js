var juegoTres = {
    precreate: function(){
        juego.load.image("fondo", "imagenes/fondo3.jpg");
    },

    create: function(){
        fondo = juego.add.tileSprite(-20, -20, 500, 500, "fondo");
        txtPuntaje = juego.add.text(25, 16, 'Puntaje: 0', { font: '24px Arial', fill: '#000' });
        this.camera.flash(0x000000, 500, false);
    },

    update: function(){

    },

}