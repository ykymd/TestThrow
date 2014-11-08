enchant();

window.onload = function() {
    var game = new Game(320, 480);
    game.fps = 30;
    game.preload('./img/paper.png', './img/waste.png',
                 './img/pause_continue.png', './img/pause_giveup.png',
                 './img/1-1.png', './img/1-2.png', './img/2-1.png', './img/2-2.png');
    
    game.onload = function() {
        game.replaceScene(createMainScene(game));
    };
    game.start();
};
