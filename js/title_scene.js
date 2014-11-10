TestThrow.prototype.gotoTitleScene = function() {
    this.replaceScene(createTitleScene(this));
};

var createTitleScene = function(game) {
    console.log("Title Scene");
    var scene = new Scene();

    var sound = game.assets[SND_THROW];
    var title_image = game.assets[IMG_TITLE];
    var sprite = new Sprite(TITLE_IMG_WIDTH, TITLE_IMG_HEIGHT);
    sprite.image = title_image;
    sprite.frame = 0;
    sprite.fitToSize(game.width, game.height);
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
        sound.play();
        sprite.frame++;

        var curtain = new Sprite(game.width, game.height);
        curtain.backgroundColor = '#000';
        curtain.opacity = 0.0;
        scene.addChild(curtain);

        curtain.tl.delay(.25 * game.fps).fadeIn(.25 * game.fps).exec(function() {
            game.gotoSelectScene();
        });
    });

    return scene;
};