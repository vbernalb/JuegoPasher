
var juego = new Phaser.Game(360, 480, Phaser.CANVAS, "pecera");

juego.state.add('Principal', Principal); // se crean los estados del juego
juego.state.add('juegoUno', juegoUno); // se crean los estados del juego
juego.state.add('juegoDos', juegoDos); // se crean los estados del juego
juego.state.add('juegoTres', juegoTres); // se crean los estados del juego

juego.state.start('Principal'); 