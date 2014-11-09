enchant();

window.onload = function() {
    var game = new Game(320, 480);
    game.fps = 30;
    game.preload(IMG_PAPER, IMG_TRASH,
                 IMG_TITLE[0], IMG_TITLE[1],
                 BTN_PAUSE,
                 BTN_PAUSEMENU[0], BTN_PAUSEMENU[1],
                 SELECT_MENU,
                 './img/mark_x.png', './img/mark_circle.png',
                 SND_THROW);

    game.onload = function() {
        game.replaceScene(createResultScene(game));
    };
    game.start();
};
