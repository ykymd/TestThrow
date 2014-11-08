var createTitleScene = function(game) {
    console.log("Title Scene");
    var scene = new Scene();

    var image = game.assets['./img/title_1.png'];
    var sprite = new Sprite(image.width, image.height);
    sprite.image = image;
    sprite.originX = 0;
    sprite.originY = 0;
    sprite.scaleX = game.width / image.width;
    sprite.scaleY = game.height / image.height;
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
                           sprite.image = game.assets['./img/title_2.png'];
                           var curtain = new Sprite(game.width, game.height);
                           curtain.backgroundColor = '#000';
                           curtain.opacity = 0.0;
                           scene.addChild(curtain);

                           curtain.tl.delay(.25 * game.fps).fadeIn(.25 * game.fps).exec(function(){game.pushScene(createSelectScene(game));});
                           });

    return scene;
};
