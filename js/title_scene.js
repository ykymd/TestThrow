var createTitleScene = function(game) {
    console.log("Title Scene");
    var scene = new Scene();

    var sound = game.assets[SND_THROW];
    var title_image = [game.assets[IMG_TITLE[0]],game.assets[IMG_TITLE[1]]];
    var sprite = new Sprite(title_image[0].width, title_image[0].height);
    sprite.image = title_image[0];
    sprite.originX = 0;
    sprite.originY = 0;
    sprite.scaleX = game.width / title_image[0].width;
    sprite.scaleY = game.height / title_image[0].height;
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
                           sound.play();
                           sprite.image = title_image[1];

                           var curtain = new Sprite(game.width, game.height);
                           curtain.backgroundColor = '#000';
                           curtain.opacity = 0.0;
                           scene.addChild(curtain);

                           curtain.tl.delay(.25 * game.fps).fadeIn(.25 * game.fps).exec(function(){game.pushScene(createSelectScene(game));});
                           });

    return scene;
};
