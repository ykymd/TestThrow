var createSelectScene = function(game) {
    console.log("Select Scene");
    var scene = new Scene();
    scene.backgroundColor = '#FFF';

    var buttons = new Group();
    var size = { 'width': 240, 'height': 90 };
    var margin = 30;
    for (var i = 0; i < 8; i++) {
        var sprite = new Sprite(size.width, size.height);
        sprite.backgroundColor = '#0' + i + i;
        sprite.moveTo((game.width - size.width) / 2, i * (size.height + margin) + margin);
        buttons.addChild(sprite);
    }
    scene.addChild(buttons);

    var touchPosition;
    scene.addEventListener(Event.TOUCH_START, function(e) {
                           touchPosition = e;
                           });
    scene.addEventListener(Event.TOUCH_MOVE, function(e) {
                           if (touchPosition) {
                           buttons.moveBy(0, e.y - touchPosition.y);
                           touchPosition = e;
                           }
                           });
    scene.addEventListener(Event.TOUCH_END, function(e) {
                           touchPosition = null;
                           });

    return scene;
};
