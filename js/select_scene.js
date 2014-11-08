var createSelectScene = function(game) {
    console.log("Select Scene");
    var scene = new Scene();
    scene.backgroundColor = '#FFF';

    var numOfStages = 8;
    var buttons = new Group();
    var size = { 'width': 240, 'height': 90 };
    var margin = 30;
    for (var i = 0; i < numOfStages; i++) {
        var sprite = new Sprite(size.width, size.height);
        sprite.backgroundColor = '#0' + i + i;
        sprite.moveTo((game.width - size.width) / 2, i * (size.height + margin) + margin);
        buttons.addChild(sprite);
    }
    scene.addChild(buttons);

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
