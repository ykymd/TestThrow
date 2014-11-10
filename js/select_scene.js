TestThrow.prototype.gotoSelectScene = function() {
    console.log("Select Scene");
    var thi$ = this;
    var scene = new Scene();
    scene.backgroundColor = '#0DD';

    var select_button = thi$.assets[SELECT_MENU];
    var enterSound = thi$.assets[SND_THROW]; //決定時の効果音
    var numOfStages = (localStorage.stages) ? localStorage.stages : 1;
    numOfStages = 8;
    var buttons = new Group();
    var size = {
        'width': 225,
        'height': 100
    };
    var margin = 30;
    var pressedButton = null;
    for (var i = 0; i < numOfStages; i++) {
        var sprite = new Button(SELECT_BTN_WIDTH, SELECT_BTN_HEIGHT);
        sprite.image = select_button;
        sprite.frame = i; //画像指定
        sprite.fitToSize(size.width, size.height);
        sprite.backgroundColor = '#0' + i + i;
        sprite.moveTo((thi$.width - size.width) / 2, i * (size.height + margin) + margin);
        sprite.addEventListener('tap', function() {
            var curtain = new Sprite(thi$.width, thi$.height);
            curtain.backgroundColor = '#0';
            curtain.opacity = 0;
            enterSound.play();
            curtain.tl.fadeIn(.25 * thi$.fps).exec(function() {
                thi$.stage = this.frame;
                thi$.removeScene(scene);
                thi$.gotoMainScene();
            });
            scene.addChild(curtain);
        });
        sprite.addEventListener(Event.TOUCH_START, function() {
            pressedButton = this;
        });
        buttons.addChild(sprite);
    }
    scene.addChild(buttons);

    var curtain = new Sprite(thi$.width, thi$.height);
    curtain.backgroundColor = '#000';
    curtain.tl.fadeOut(.25 * thi$.fps).removeFromScene();
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
            if (buttons.y < thi$.height - buttons.height) {
                buttons.y = thi$.height - buttons.height;
            }
            if (buttons.y > 0) {
                buttons.y = 0;
            }
        }
    });
    scene.addEventListener(Event.TOUCH_END, function(e) {
        touchPosition = null;
    });

    this.pushScene(scene);
};
