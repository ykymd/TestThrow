enchant();

window.onload = function() {
    var game = new Game(320, 480);
    game.fps = 30;
    game.preload('./img/paper.png');
    
    game.onload = function() {
        game.replaceScene(createMainScene(game));
    };
    game.start();
};
