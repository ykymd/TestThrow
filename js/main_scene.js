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

    var newPaperImg = new Sprite( PAPER_IMG_W, PAPER_IMG_H );
    newPaperImg.image = game.assets[IMG_PAPER];
    newPaperImg.frame = Paper_frame.ALC;
    newPaperImg.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
    
    var oldPaperImg = new Sprite( PAPER_IMG_W, PAPER_IMG_H );
    oldPaperImg.image = game.assets[IMG_PAPER];
    oldPaperImg.frame = Paper_frame.ALC;
    oldPaperImg.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );

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
    const THRS = 6;
    const MOVE_TIME = 0.4;
    const VELOCITY = -130;
    
    // game main
    scene.addEventListener( Event.TOUCH_START, function(e) {
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
            console.log("thrown");
            
            
            oldPaperImg.frame = paper.pic.frame;
            paper.pic.frame = Math.floor(Math.random()*3)%3+1;
            
            oldPaperImg.moveTo( paper.pic.x, paper.pic.y );
            paper.pic.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
            paper.state = "new";
            
            oldPaperImg.tl.moveBy( 0, VELOCITY*MOVE_TIME*game.fps, Math.floor(MOVE_TIME*game.fps) );
            paper.pic.tl.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(MOVE_TIME*game.fps) );
            
        }
        if ( paper.state == "new" &&  prevPoint[PREV_COUNT-1].x - touch.end.x >= THRS ) {
            paper.state = "get";
            console.log("got");
            
            oldPaperImg.frame = paper.pic.frame;
            paper.pic.frame = Math.floor(Math.random()*3)%3+1;
            
            oldPaperImg.moveTo( paper.pic.x, paper.pic.y );
            paper.pic.moveTo( game.width + PAPER_DEFAULT_X, PAPER_DEFAULT_Y );
            paper.state = "new";
            
            oldPaperImg.tl.moveBy( VELOCITY*MOVE_TIME*game.fps, 0, Math.floor(MOVE_TIME*game.fps) );
            paper.pic.tl.moveTo( PAPER_DEFAULT_X, PAPER_DEFAULT_Y , Math.floor(MOVE_TIME*game.fps) );
            
        }

    } );

    scene.addEventListener( Event.ENTER_FRAME, function(e) {
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
    scene.addChild(oldPaperImg);
    scene.addChild(newPaperImg);
    scene.addChild(pauseButton);
    scene.addChild(debugLabel);

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

    var startFrame = game.frame;
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
                          }, 30 * game.fps);
    scene.addChild(timerCircle);
    scene.addChild(timerArc);

    return scene;
};
