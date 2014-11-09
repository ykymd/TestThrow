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
    // paper.pic.originX = 0;
    // paper.pic.originY = 0;
    // paper.pic.scaleX = ( PAPER_W / PAPER_IMG_W );
    // paper.pic.scaleY = ( PAPER_H / PAPER_IMG_H );
    paper.pic.moveTo(PAPER_DEFAULT_X,PAPER_DEFAULT_Y);

    var newPaperImg = new Sprite( PAPER_IMG_W, PAPER_IMG_H );
    newPaperImg.image = game.assets[IMG_PAPER];
    newPaperImg.frame = Paper_frame.ALC;
    newPaperImg.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );

    function TouchProperty() {
        this.x = 0;
        this.y = 0;
        this.time = 0;
        return this;
    }

    var touching = false;
    var touch = { 'begin': new TouchProperty(),
                  'end': new TouchProperty(),
                  'current': new TouchProperty()};

    var debugLabel = new Label("");
    debugLabel.moveTo(0,0);
    debugLabel.color = "#F0F";

    var prevPoint = [];
    const PREV_COUNT = 2;
    for ( var i = 0; i < PREV_COUNT; i++ ) {
        prevPoint[i] = new TouchProperty();
    }
    var from = new TouchProperty();
    var velocity = 0;
    const THRS = 4;

    // game main
    scene.addEventListener( Event.TOUCH_START, function(e) {
        //if (!isGameStart) return;

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
        if ( e.x >= paper.pic.x && e.x <= paper.pic.x + paper.pic.width &&
             e.y >= paper.pic.y && e.y <= paper.pic.y + paper.pic.height ) {
            touching = true;
        }
    } );
    scene.addEventListener( Event.TOUCH_MOVE, function(e) {
        //if (!isGameStart) return;

        touch.current.x = e.x;
        touch.current.y = e.y;
        if ( touching == true ) {
            if ( paper.state == "wasted" ) {
                paper.pic.moveTo ( from.x ,  from.y + touch.current.y - touch.begin.y );
            } else if ( paper.state == "new" ){
                paper.pic.moveTo ( from.x + touch.current.x - touch.begin.x, from.y);
            }
        }
    } );
    scene.addEventListener( Event.TOUCH_END, function(e) {
        //if (!isGameStart) return;

        touch.end.x = e.x;
        touch.end.y = e.y;
        touch.end.time = (new Date()).getTime();
        touching = false;
        console.log("touch end");
        if ( touch.begin.x == touch.end.x && touch.begin.y == touch.end.y  &&
             e.x >= paper.pic.x && e.x <= paper.pic.x + paper.pic.width &&
             e.y >= paper.pic.y && e.y <= paper.pic.y + paper.pic.height ) {
            paper.state = "wasted";
            paper.pic.frame = Paper_frame.CRASH;
        }

        if ( paper.state == "wasted" && prevPoint[PREV_COUNT-1].y - touch.end.y >= THRS ) {
            paper.state = "throw";
            velocity = touch.end.y - prevPoint[1].y;
            newPaperImg.frame = Math.floor(Math.random()*3)%3+1;
            console.log(newPaperImg.frame);
            console.log("thrown");

            paper.pic.tl.moveBy( 0, velocity*0.66*game.fps, Math.floor(0.66*game.fps) );
            newPaperImg.tl.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(0.66*game.fps) )
                          .delay(2)
                          .exec( function() {
                              paper.state = "new";
                              newPaperImg.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
                              paper.pic.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
                              paper.pic.frame = newPaperImg.frame;
                              console.log("new paper supplied");
                          });
        }
        if ( paper.state == "new" &&  prevPoint[PREV_COUNT-1].x - touch.end.x >= THRS ) {
            paper.state = "get";
            velocity = touch.end.x - prevPoint[1].x;
            newPaperImg.frame = Math.floor(Math.random()*3)%3+1;
            console.log("got");

            paper.pic.tl.moveBy( velocity*0.66*game.fps, 0, Math.floor(0.66*game.fps) );
            newPaperImg.tl.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(0.66*game.fps) )
                          .delay(2)
                          .exec( function() {
                              paper.state = "new";
                              newPaperImg.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
                              paper.pic.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
                              paper.pic.frame = newPaperImg.frame;
                              console.log("new paper supplied");
                          });
        }

    } );

    scene.addEventListener( Event.ENTER_FRAME, function(e) {
        //if (!isGameStart) return;

        debugLabel.text = Math.floor(touch.current.x)+","+Math.floor(touch.current.y);
        for ( var i = PREV_COUNT-1; i > 0; i-- ) {
            prevPoint[i].x = prevPoint[i-1].x;
            prevPoint[i].y = prevPoint[i-1].y;
        }
        prevPoint[0].x = touch.current.x;
        prevPoint[0].y = touch.current.y;
        if ( touching == false &&
             ( paper.pic.x != PAPER_DEFAULT_X || paper.pic.y != PAPER_DEFAULT_Y ) &&
             paper.state != "throw" && paper.state != "get" ){
            paper.pic.moveTo ( (paper.pic.x + PAPER_DEFAULT_X)/2,  (paper.pic.y + PAPER_DEFAULT_Y)/2 );
        }
    } );

    //"START"の文字の表示
    var l_start = new Sprite(GAMESTART_IMG_WIDTH,GAMESTART_IMG_HEIGHT);
    var labelSize = {'width': 320, 'height': 80};
    l_start.image = game.assets[IMG_GAMESTART];
    l_start.scaleX = labelSize.width / GAMESTART_IMG_WIDTH;
    l_start.scaleY = labelSize.height / GAMESTART_IMG_HEIGHT;
    l_start.moveTo(0,game.width/2-GAMESTART_IMG_HEIGHT/2);
    l_start.tl.rotateTo(45,1).scaleTo(5,1).scaleTo(0.9,20).and().rotateTo(0,20).delay(10).fadeOut(10).and().moveBy(0,-50,10).then(function(){
            l_start.visible = false;
            this.isGameStart = true;
            //player.canclick = true;
            this.parentNode.removeChild(l_start);
        });


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

    // drawing
    scene.addChild(bgImage);
    scene.addChild(bgRayer);
    scene.addChild(paper.pic);
    scene.addChild(newPaperImg);
    scene.addChild(pauseButton);
    scene.addChild(debugLabel);
    scene.addChild(l_start);

    return scene;
};
