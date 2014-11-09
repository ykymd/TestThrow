var createSelectScene = function(game) {
    console.log("Select Scene");
    var scene = new Scene();
    scene.backgroundColor = '#0DD';

    var select_button = game.assets[SELECT_MENU];
    var enterSound = game.assets[SND_THROW];  //決定時の効果音
    var numOfStages = (localStorage.stages) ? localStorage.stages : 1;
    var buttons = new Group();
    var size = { 'width': 225, 'height': 100 };
    var margin = 30;
    var pressedButton = null;
    for (var i = 0; i < numOfStages; i++) {
        var sprite = new Button(SELECT_BTN_WIDTH, SELECT_BTN_HEIGHT);
        sprite.image = select_button;
        sprite.frame = i; //画像指定
        sprite.originX = 0;
        sprite.originY = 0;
        sprite.scaleX = size.width / SELECT_BTN_WIDTH;
        sprite.scaleY = size.height / SELECT_BTN_HEIGHT;
        sprite.backgroundColor = '#0' + i + i;
        sprite.moveTo((game.width - size.width) / 2, i * (size.height + margin) + margin);
        sprite.addEventListener('tap', function() {
                                var curtain = new Sprite(game.width, game.height);
                                curtain.backgroundColor = '#0';
                                curtain.opacity = 0;
                                enterSound.play();
                                curtain.tl.fadeIn(.25 * game.fps).exec(function(){
                                                                       game.removeScene(scene);
                                                                       game.replaceScene(createMainScene(game));
                                                                       });
                                scene.addChild(curtain);
                                });
        sprite.addEventListener(Event.TOUCH_START, function() { pressedButton = this; });
        buttons.addChild(sprite);
    }
    scene.addChild(buttons);

    var curtain = new Sprite(game.width, game.height);
    curtain.backgroundColor = '#000';
    curtain.tl.fadeOut(.25 * game.fps).removeFromScene();
    scene.addChild(curtain);

    buttons.height = numOfStages * (size.height + margin) + margin;
    var touchPosition;
    var startY;
    scene.addEventListener(Event.TOUCH_START, function(e) {
                           touchPosition = e;
                           startY = buttons.y;
                           });
    scene.addEventListener(Event.TOUCH_MOVE, function(e) {
                           if (touchPosition) {
                           if (pressedButton) {
                           pressedButton.up();
                           pressedButton = null;
                           }
                           buttons.y = startY + e.y - touchPosition.y;
                           if (buttons.y < game.height - buttons.height) { buttons.y = game.height - buttons.height; }
                           if (buttons.y > 0) { buttons.y = 0; }
                           }
                           });
    scene.addEventListener(Event.TOUCH_END, function(e) {
                           touchPosition = null;
                           });

    return scene;
};
