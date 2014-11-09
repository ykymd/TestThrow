var createTitleScene = function(game) {
    console.log("Title Scene");
    var scene = new Scene();

    var sound = game.assets[SND_THROW];
    var title_image = game.assets[IMG_TITLE];
    var sprite = new Sprite(title_image.width/2, title_image.height/2);
    sprite.image = title_image;
    sprite.frame = 0;
    sprite.originX = 0;
    sprite.originY = 0;
    sprite.scaleX = game.width / title_image.width/2;
    sprite.scaleY = game.height / title_image.height/2;
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
                           sound.play();
                           sprite.frame = 1;

                           var curtain = new Sprite(game.width, game.height);
                           curtain.backgroundColor = '#000';
                           curtain.opacity = 0.0;
                           scene.addChild(curtain);

                           curtain.tl.delay(.25 * game.fps).fadeIn(.25 * game.fps).exec(function(){game.pushScene(createSelectScene(game));});
                           });

    return scene;
};
