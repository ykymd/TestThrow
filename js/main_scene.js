
function createGameOverScene(game) {
    var gameOverScene = new Scene();

    //"GAMEOVER"の文字の表示
    var l_over = new Sprite(GAMESTART_IMG_WIDTH, GAMESTART_IMG_HEIGHT);
    l_over.image = game.assets[IMG_GAMEOVER];
    l_over.moveTo(game.width, game.height / 2 - l_over.height / 2);
    l_over.tl.moveTo(0, game.height / 2 - l_over.height / 2, 20, enchant.Easing.QUAD_EASYINOUT).delay(60).moveTo(-game.width, game.height / 2 - l_over.height / 2, 20, enchant.Easing.QUAD_EASYINOUT).then(function() {
        game.removeScene(gameOverScene);
        game.replaceScene(createResultScene(game));
    });
    gameOverScene.addChild(l_over);

    return gameOverScene;
}

var createMainScene = function(game) {
    console.log("Main Scene");

    // initialize
    var scene = new Scene();

    var bgImage = new Sprite(1280, 1920);
    bgImage.image = game.assets[IMG_TRASH];
    bgImage.fitToSize(game.width, game.height);
    bgImage.moveTo(0, 0);

    var bgRayer = new Sprite(game.width, game.height);
    bgRayer.backgroundColor = '#FFF';
    bgRayer.opacity = 0.5;

    isGameStart = false; //ゲーム開始中か？

    const Paper_frame = {
        'SAIRI': 0,
        'MATH': 1,
        'ALC': 2,
        'REPORT': 3,
        'CRASH': 4,
    };
    const PAPER_DEFAULT_X = 60;
    const PAPER_DEFAULT_Y = 90;
    const PAPER_W = 200;
    const PAPER_H = 300;
    const PAPER_IMG_W = game.assets[IMG_PAPER].width / Object.keys(Paper_frame).length;
    const PAPER_IMG_H = game.assets[IMG_PAPER].height;
    var paper = {
        sprite: null,
        state: "new",
        numOfQuestion: 3,
        score: 0,
        isSuccessed: function() {
            return this.score;
        }
    };

    function TouchProperty() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    var moved = false;
    var touching = false;
    var touch = {
        'begin': new TouchProperty(),
        'end': new TouchProperty(),
        velocity: {x: 0, y: 0}
    };

    var prevPoint = new TouchProperty();
    var from = new TouchProperty();
    const THRS = 3;
    const MOVE_TIME = 0.4;
    const VELOCITY = -130;

    var scores = {
        ok: 0,
        okMax: 0,
        ng: 0,
        ngMax: 0
    };

    var wasteSound = game.assets[SND_WASTE]; //クシャっとするときの効果音
    var flySound = game.assets[SND_FLY];
    var passSound = game.assets[SND_PASS];

    var markOk = game.assets[IMG_MARK_CIRCLE];
    var markNg = game.assets[IMG_MARK_X];

    var guide = null;

    function placeNewPaper() {
        var pic = new Sprite(PAPER_IMG_W, PAPER_IMG_H);
        pic.image = game.assets[IMG_PAPER];
        pic.frame = Math.floor(Math.random() * 3) % 3 + 1;

        paper.sprite = new Group();
        paper.sprite.addChild(pic);
        paper.sprite.moveTo(game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y);

        paper.state = "new";

        paper.score = Math.random(1) < 0.5;
        for (var i = 0; i < paper.numOfQuestion; i++) {
            var size = {
                'width': 60,
                'height': 44
            };
            var image = (paper.isSuccessed()) ? markOk : markNg;
            var sprite = new Sprite(image.width, image.height);
            sprite.image = image;
            sprite.fitToSize(size.width, size.height);
            sprite.moveTo(20, i * 80 + 20);

            paper.sprite.addChild(sprite);
        }

        scene.addChild(paper.sprite);
        var tl = paper.sprite.tl.moveTo(PAPER_DEFAULT_X, PAPER_DEFAULT_Y, Math.floor(MOVE_TIME * game.fps), enchant.Easing.QUINT_EASEOUT);

        if (game.stage == 0) {
            tl.exec(function() {
                var image = game.assets[IMG_CURSOR];
                var size = {
                    width: image.width / 4,
                    height: image.height / 4
                };
                if (guide) scene.removeChild(guide);
                guide = new Sprite(image.width, image.height);
                guide.image = image;
                if (paper.isSuccessed()) {
                    guide.rotation = -90;
                    guide.moveTo(PAPER_DEFAULT_X - 10 - size.width, PAPER_DEFAULT_Y + PAPER_H / 2 + size.height / 2);
                } else {
                    guide.moveTo(PAPER_DEFAULT_X + PAPER_W / 2 - size.width / 2, PAPER_DEFAULT_Y - 10 - size.height);
                }
                guide.fitToSize(size.width, size.height);
                scene.addChild(guide);
            });
        }
    };

    // game main
    scene.addEventListener(Event.TOUCH_START, function(e) {
        if (!isGameStart) return;
        if (e.y < 60) return;

        touch.begin = e;
        from.x = paper.sprite.x;
        from.y = paper.sprite.y;
        prevPoint = e;
        touching = true;
        moved = false;

        if (guide) scene.removeChild(guide);
    });
    scene.addEventListener(Event.TOUCH_MOVE, function(e) {
        //if (!isGameStart) return;
        if (!touching) return;

        touch.velocity.x = e.x - prevPoint.x;
        touch.velocity.y = e.y - prevPoint.y;
        prevPoint = e;
        if (touching) {
            if (paper.state == "wasted") {
                paper.sprite.moveTo(from.x, from.y + e.y - touch.begin.y);
            } else if (paper.state == "new") {
                paper.sprite.moveTo(from.x + e.x - touch.begin.x, from.y);
            }
        }
        moved = true;
    });
    scene.addEventListener(Event.TOUCH_END, function(e) {
        // for debug
        // gameOver();

        //if (!isGameStart) return;
        if (!touching) return;

        touching = false;

        if (!moved) {
            wasteSound.play();

            paper.state = "wasted";
            var sprite = new Sprite(PAPER_IMG_W, PAPER_IMG_H);
            sprite.image = game.assets[IMG_PAPER];
            sprite.frame = Paper_frame.CRASH;

            var group = new Group();
            group.addChild(sprite);
            group.moveTo(paper.sprite.x, paper.sprite.y);

            scene.addChild(group);

            scene.removeChild(paper.sprite);
            paper.sprite = group;
            return;
        }

        if (paper.state == "wasted" && touch.velocity.y < -THRS) {
            paper.state = "throw";

            // throw old paper away
            var sprite = paper.sprite;
            sprite.tl.moveBy(0, VELOCITY * MOVE_TIME * game.fps, Math.floor(MOVE_TIME * game.fps)).removeFromScene();
            scene.addChild(sprite);

            flySound.play(); //効果音を再生

            if (!paper.isSuccessed()) {
                scores.ng++;
            }

            if (paper.isSuccessed()) {
                scores.okMax++;
            } else {
                scores.ngMax++;
            }

            placeNewPaper();
        } else if (paper.state == "new" && touch.velocity.x < -THRS) {
            paper.state = "get";

            // save old paper
            var sprite = paper.sprite;
            sprite.tl.moveBy(VELOCITY * MOVE_TIME * game.fps, 0, Math.floor(MOVE_TIME * game.fps)).removeFromScene();

            passSound.play(); //効果音を再生

            if (paper.isSuccessed()) {
                scores.ok++;
            }

            if (paper.isSuccessed()) {
                scores.okMax++;
            } else {
                scores.ngMax++;
            }

            placeNewPaper();
        } else {
            paper.sprite.tl.moveTo(PAPER_DEFAULT_X, PAPER_DEFAULT_Y, Math.floor(.25 * game.fps), enchant.Easing.QUINT_EASEOUT);
        }

    });

    var timer = new Timer(game.fps);
    timer.moveTo(250, 10);

    //"START"の文字の表示
    var l_start = new Sprite(GAMESTART_IMG_WIDTH, GAMESTART_IMG_HEIGHT);
    var labelSize = {
        'width': 320,
        'height': 80
    };
    l_start.image = game.assets[IMG_GAMESTART];
    l_start.scaleX = labelSize.width / GAMESTART_IMG_WIDTH;
    l_start.scaleY = labelSize.height / GAMESTART_IMG_HEIGHT;
    l_start.moveTo(0, game.width / 2 - GAMESTART_IMG_HEIGHT / 2);
    l_start.tl.rotateTo(45, 1).scaleTo(5, 1).scaleTo(0.9, 20).and().rotateTo(0, 20).delay(10).fadeOut(10).and().moveBy(0, -50, 10).then(function() {
        l_start.visible = false;
        isGameStart = true;
        //player.canclick = true;

        // After 30 seconds, game is over.
        timer.after(30).then(function() {
            game.scores = scores;
            game.pushScene(createGameOverScene(game));
        });
        this.parentNode.removeChild(l_start);
        placeNewPaper();
    });

    // pause menu
    var pauseImage = game.assets[BTN_PAUSE];
    var pauseSize = {
        'width': 60,
        'height': 60
    };
    var pauseButton = new Button(pauseImage.width, pauseImage.height);
    pauseButton.image = pauseImage;
    pauseButton.fitToSize(pauseSize.width, pauseSize.height);
    pauseButton.moveTo(10, 10);
    pauseButton.addEventListener('tap', function() {
        game.pushScene(createPauseScene(game));
    });

    // drawing
    scene.addChild(bgImage);
    scene.addChild(bgRayer);
    scene.addChild(pauseButton);
    scene.addChild(l_start);
    scene.addChild(timer);

    return scene;
};