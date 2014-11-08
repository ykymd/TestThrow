var createSelectScene = function(game) {
    console.log("Select Scene");
    var scene = new Scene();
    scene.backgroundColor = '#0DD';

    var images = [game.assets['./img/1-1.png'], game.assets['./img/1-2.png'],
                  game.assets['./img/2-1.png'], game.assets['./img/2-2.png'],
                  game.assets['./img/3-1.png'], game.assets['./img/3-2.png'],
                  game.assets['./img/4-1.png'], game.assets['./img/4-2.png']];
    var numOfStages = 8;
    var buttons = new Group();
    var size = { 'width': 225, 'height': 100 };
    var margin = 30;
    for (var i = 0; i < numOfStages; i++) {
        var image = images[i];
        var sprite = new Sprite(image.width, image.height);
        sprite.image = image;
        sprite.originX = 0;
        sprite.originY = 0;
        sprite.scaleX = size.width / image.width;
        sprite.scaleY = size.height / image.height;
        sprite.backgroundColor = '#0' + i + i;
        sprite.moveTo((game.width - size.width) / 2, i * (size.height + margin) + margin);
        buttons.addChild(sprite);
    }
    scene.addChild(buttons);

    var curtain = new Sprite(game.width, game.height);
    curtain.backgroundColor = '#000';
    curtain.tl.fadeOut(.25 * game.fps).removeFromScene();
    scene.addChild(curtain);

    buttons.height = numOfStages * (size.height + margin) + margin;
    var touchPosition;
    scene.addEventListener(Event.TOUCH_START, function(e) {
                           touchPosition = e;
                           });
    scene.addEventListener(Event.TOUCH_MOVE, function(e) {
                           if (touchPosition) {
                           buttons.moveBy(0, e.y - touchPosition.y);
                           touchPosition = e;
                           if (buttons.y > 0) { buttons.y = 0; }
                           if (buttons.y < game.height - buttons.height) { buttons.y = game.height - buttons.height; }
                           }
                           });
    scene.addEventListener(Event.TOUCH_END, function(e) {
                           touchPosition = null;
                           });

    return scene;
};
