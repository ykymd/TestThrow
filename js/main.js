enchant();

window.onload = function() {
    var game = new Game(320, 480);
    game.fps = 30;
    game.preload('./js/img/paper.png');
    
    game.onload = function() {
        game.replaceScene(createSelectScene(game));
    };
    game.start();
};
