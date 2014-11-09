var createTitleScene = function(game) {
    console.log("Title Scene");
    var scene = new Scene();

    var sound = game.assets[SND_THROW];
    var title_image = game.assets[IMG_TITLE];
    var sprite = new Sprite(TITLE_IMG_WIDTH, TITLE_IMG_HEIGHT);
    sprite.image = title_image;
    sprite.frame = 0;
    sprite.originX = 0;
    sprite.originY = 0;
    sprite.scaleX = game.width / TITLE_IMG_WIDTH;
    sprite.scaleY = game.height / TITLE_IMG_HEIGHT;
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
                           sound.play();
                           sprite.frame++;

                           var curtain = new Sprite(game.width, game.height);
                           curtain.backgroundColor = '#000';
                           curtain.opacity = 0.0;
                           scene.addChild(curtain);

                           curtain.tl.delay(.25 * game.fps).fadeIn(.25 * game.fps).exec(function(){game.pushScene(createSelectScene(game));});
                           });

    return scene;
};
