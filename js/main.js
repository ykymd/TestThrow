enchant();

var TestThrow = Class.create(Game, {});

window.onload = function() {
    var game = new TestThrow(320, 480);

    game.preload(IMG_PAPER, IMG_TRASH,
                 IMG_TITLE,
                 BTN_PAUSE,
                 IMG_MARK,
                 BTN_PAUSEMENU[0], BTN_PAUSEMENU[1],
                 SELECT_MENU,
                 IMG_MARK_CIRCLE, IMG_MARK_X,
                 IMG_BACK,
                 IMG_GAMESTART,
                 IMG_GAMEOVER,
                 IMG_CURSOR,
                 SND_THROW,
                 SND_WASTE,
                 SND_FLY,
                 SND_PASS);

    game.onload = function() {
        game.gotoTitleScene();
    };
    game.start();
};
