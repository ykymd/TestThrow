var createMainScene = function( game ) {
    console.log("Main Scene");

    // initialize
    var scene = new Scene();

    var bgImage = new Sprite( 1280, 1920 );
    bgImage.image = game.assets[IMG_TRASH];
    bgImage.originX = 0;
    bgImage.originY = 0;
    bgImage.scaleX = ( game.width / bgImage.width );
    bgImage.scaleY = ( game.height/ bgImage.height );
    bgImage.moveTo(0,0);

    var bgRayer = new Sprite( game.width, game.height );
    bgRayer.backgroundColor = '#FFF';
    bgRayer.opacity = 0.5;

    isGameStart = false;    //ゲーム開始中か？

    const PAPER_DEFAULT_X = 60;
    const PAPER_DEFAULT_Y = 90;
    const PAPER_W = 200;
    const PAPER_H = 300;
    const PAPER_IMG_W = 200;
    const PAPER_IMG_H = 300;
    const Paper_frame = { 'CRASH':4,
                          'ALC':2,
                          'MATH':1,
                          'REPORT':3,
                          'SAIRI':0 };
    var paper = { 'pic': new Sprite( PAPER_IMG_W, PAPER_IMG_H ) ,
                  'state': "new" ,
                  'score': 0 };
    paper.pic.image = game.assets[IMG_PAPER];
    paper.pic.frame = Paper_frame.ALC;
    paper.pic.moveTo(PAPER_DEFAULT_X,PAPER_DEFAULT_Y);

    function TouchProperty() {
        this.x = 0;
        this.y = 0;
        this.time = 0;
        return this;
    }

    var moved = false;
    var touching = false;
    var touch = { 'begin': new TouchProperty(),
                  'end': new TouchProperty(),
                  'current': new TouchProperty()};

    var prevPoint = [];
    const PREV_COUNT = 2;
    for ( var i = 0; i < PREV_COUNT; i++ ) {
        prevPoint[i] = new TouchProperty();
    }
    var from = new TouchProperty();
    const THRS = 6;
    const MOVE_TIME = 0.4;
    const VELOCITY = -130;

    var wasteSound = game.assets[SND_WASTE];    //クシャっとするときの効果音
    
    var startFrame;

    // game main
    scene.addEventListener( Event.TOUCH_START, function(e) {
        if (!isGameStart) return;
        if (e.y < 60) return;

        touch.begin.x = e.x;
        touch.begin.y = e.y;
        touch.begin.time = (new Date()).getTime();
        touch.current.x = e.x;
        touch.current.y = e.y;
        from.x = paper.pic.x;
        from.y = paper.pic.y;
        for ( var i = 0; i < PREV_COUNT; i++ ) {
            prevPoint[i].x = e.x;
            prevPoint[i].y = e.y;
        }
        touching = true;
        moved = false;
    } );
    scene.addEventListener( Event.TOUCH_MOVE, function(e) {
        //if (!isGameStart) return;
        if (!touching) return;

        touch.current.x = e.x;
        touch.current.y = e.y;
        if ( touching ) {
            if ( paper.state == "wasted" ) {
                paper.pic.moveTo ( from.x ,  from.y + touch.current.y - touch.begin.y );
            } else if ( paper.state == "new" ){
                paper.pic.moveTo ( from.x + touch.current.x - touch.begin.x, from.y);
            }
        }
        moved = true;

        for ( var i = PREV_COUNT-1; i > 0; i-- ) {
            prevPoint[i].x = prevPoint[i-1].x;
            prevPoint[i].y = prevPoint[i-1].y;
        }
        prevPoint[0].x = touch.current.x;
        prevPoint[0].y = touch.current.y;
    } );
    scene.addEventListener( Event.TOUCH_END, function(e) {
        //if (!isGameStart) return;
        if (!touching) return;

        touching = false;
        touch.end.x = e.x;
        touch.end.y = e.y;
        touch.end.time = (new Date()).getTime();
        console.log("touch end");

        if ( !moved ) {
            paper.state = "wasted";
            paper.pic.frame = Paper_frame.CRASH;
            wasteSound.play();
            return;
        }

        function placeNewPaper() {
            paper.pic.frame = Math.floor(Math.random()*4)%4;
            paper.pic.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
            paper.state = "new";
            paper.pic.tl.moveTo(PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(MOVE_TIME*game.fps));
        };

        if ( paper.state == "wasted" && prevPoint[PREV_COUNT-1].y - touch.end.y >= THRS ) {
            paper.state = "throw";

            // throw old paper away
            var sprite = new Sprite(PAPER_IMG_W, PAPER_IMG_H);
            sprite.image = game.assets[IMG_PAPER];
            sprite.frame = paper.pic.frame;
            sprite.moveTo( paper.pic.x, paper.pic.y );
            sprite.tl.moveBy( 0, VELOCITY*MOVE_TIME*game.fps, Math.floor(MOVE_TIME*game.fps) ).removeFromScene();
            scene.addChild(sprite);

            placeNewPaper();
        } else if ( paper.state == "new" &&  prevPoint[PREV_COUNT-1].x - touch.end.x >= THRS ) {
            paper.state = "get";

            // save old paper
            var sprite = new Sprite(PAPER_IMG_W, PAPER_IMG_H);
            sprite.image = game.assets[IMG_PAPER];
            sprite.frame = paper.pic.frame;
            sprite.moveTo( paper.pic.x, paper.pic.y );
            sprite.tl.moveBy( VELOCITY*MOVE_TIME*game.fps, 0, Math.floor(MOVE_TIME*game.fps) ).removeFromScene();
            scene.addChild(sprite);

            placeNewPaper();
        } else {
            paper.pic.tl.moveTo(PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(.25*game.fps), enchant.Easing.QUINT_EASEOUT);
        }

    } );
    
    scene.addEventListener( Event.ENTER_FRAME, function(e) {
        if ( game.frame - startFrame == 30*game.fps ) {
            gameOver();
        }
    });

    //"START"の文字の表示
    var l_start = new Sprite(GAMESTART_IMG_WIDTH,GAMESTART_IMG_HEIGHT);
    var labelSize = {'width': 320, 'height': 80};
    l_start.image = game.assets[IMG_GAMESTART];
    l_start.scaleX = labelSize.width / GAMESTART_IMG_WIDTH;
    l_start.scaleY = labelSize.height / GAMESTART_IMG_HEIGHT;
    l_start.moveTo(0,game.width/2-GAMESTART_IMG_HEIGHT/2);
    l_start.tl.rotateTo(45,1).scaleTo(5,1).scaleTo(0.9,20).and().rotateTo(0,20).delay(10).fadeOut(10).and().moveBy(0,-50,10).then(function(){
            l_start.visible = false;
            isGameStart = true;
            //player.canclick = true;
            timerInitialize();
            this.parentNode.removeChild(l_start);
        });

    //"GAMEOVER"の文字の表示
    l_over = new Sprite(GAMESTART_IMG_WIDTH,GAMESTART_IMG_HEIGHT);
    l_over.image = game.assets[IMG_GAMEOVER];
    l_over.visible = true;
    l_over.moveTo(game.width,game.height/2-l_over.height/2);
    var gameOver = function() {
        l_over.tl.moveTo(0,game.height/2-l_over.height/2,20, enchant.Easing.QUAD_EASYINOUT).delay(60).moveTo(-game.width,game.height/2-l_over.height/2,20, enchant.Easing.QUAD_EASYINOUT).then(function(){
            l_over.visible = false;
            game.replaceScene(createResultScene(game));
        });
        isGameStart = false;
    };

    // pause menu
    var pauseImage = game.assets[BTN_PAUSE];
    var pauseSize = {'width': 60, 'height': 60};
    var pauseButton = new Button(pauseImage.width, pauseImage.height);
    pauseButton.image = pauseImage;
    pauseButton.originX = 0;
    pauseButton.originY = 0;
    pauseButton.scaleX = pauseSize.width / pauseImage.width;
    pauseButton.scaleY = pauseSize.height / pauseImage.height;
    pauseButton.moveTo(10, 10);
    pauseButton.addEventListener('tap', function() {
                                 game.pushScene(createPauseScene(game));
                                 });

    var timerCircleRadius = 30;
    var timerCircleSurface = new Surface(2 * timerCircleRadius + 2, 2 * timerCircleRadius + 2);
    var timerCircle = new Sprite(2 * timerCircleRadius + 2, 2 * timerCircleRadius + 2);
    timerCircle.image = timerCircleSurface;
    timerCircle.moveTo(250, 10);
    timerCircleSurface.context.beginPath();
    timerCircleSurface.context.arc(timerCircleRadius + 1, timerCircleRadius + 1, timerCircleRadius, 0, 2 * Math.PI);
    timerCircleSurface.context.fillStyle = '#CCF';
    timerCircleSurface.context.fill();
    timerCircleSurface.context.stroke();
    var timerArc = new Sprite(2 * timerCircleRadius + 2, 2 * timerCircleRadius + 2);
    timerArc.moveTo(250, 10);

    var timerScore = new MutableText(250 - 30, 10 + 18, 100);
    timerScore.fontSize = 32;
    timerScore.scaleX = .5;

    var timerInitialize = function() {
        startFrame = game.frame;
        timerCircle.tl.repeat(function() {
                              var currentTime = game.frame;
                              var surface = new Surface(2 * timerCircleRadius + 2, 2 * timerCircleRadius + 2);
                              var ctx = surface.context;
                              ctx.moveTo(timerCircleRadius + 1, timerCircleRadius + 1);
                              ctx.lineTo(timerCircleRadius + 1, 1);
                              ctx.arc(timerCircleRadius + 1, timerCircleRadius + 1, timerCircleRadius, -0.5 * Math.PI, -0.48 * Math.PI + 2 * Math.PI * (currentTime - startFrame) / (30 * game.fps));
                              ctx.lineTo(timerCircleRadius + 1, timerCircleRadius + 1);
                              ctx.fillStyle = '#FCC';
                              ctx.fill();
                              ctx.stroke();
                              timerArc.image = surface;
        
                              var seconds = Math.floor((30 * game.fps - (currentTime - startFrame)) / game.fps);
                              if (seconds < 10) {
                              timerScore.scaleX = 1.0;
                              timerScore.x = 250 + 18;
                              }
                              timerScore.setText(seconds.toFixed(0));
                              }, 30 * game.fps);
    };

    // drawing
    scene.addChild(bgImage);
    scene.addChild(bgRayer);
    scene.addChild(paper.pic);
    scene.addChild(pauseButton);
    scene.addChild(l_start);
    scene.addChild(timerCircle);
    scene.addChild(timerArc);
    scene.addChild(timerScore);

    scene.addChild(l_over);

    return scene;
};
