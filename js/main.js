enchant();

window.onload = function() {
    var game = new Game(320, 480);
    game.fps = 30;
    game.preload(IMG_PAPER, IMG_TRASH,
                 IMG_TITLE,
                 BTN_PAUSE,
                 IMG_MARK,
                 BTN_PAUSEMENU[0], BTN_PAUSEMENU[1],
                 SELECT_MENU,
                 IMG_MARK_CIRCLE, IMG_MARK_X,
                 IMG_GAMESTART,
                 IMG_GAMEOVER,
                 SND_THROW,
                 SND_WASTE,
                 SND_FLY,
                 SND_PASS);

    game.onload = function() {
        game.replaceScene(createTitleScene(game));
    };
    game.start();
};
