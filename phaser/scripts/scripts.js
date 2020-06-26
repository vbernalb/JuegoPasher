
var juego = new Phaser.Game(360, 480, Phaser.CANVAS, "Juanito"); // se crea la variable del juego con id Juanito

juego.state.add('Principal', Principal); // se crean los estados del juego
juego.state.add('juegoUno', juegoUno); 
juego.state.add('juegoDos', juegoDos); 
juego.state.add('juegoTres', juegoTres); 
juego.state.add('juegoUnoIntro', juegoUnoIntro); 
juego.state.add('juegoDosIntro', juegoDosIntro); 
juego.state.add('juegoTresIntro', juegoTresIntro); 
juego.state.add('perder', perder); 
juego.state.add('ganar', ganar); 

juego.state.start('Principal'); // se carga el primer estado, el principal