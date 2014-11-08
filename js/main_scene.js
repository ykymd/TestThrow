var createMainScene = function( game ) {
    console.log("Main Scene");
    
    // initialize
    var scene = new Scene();
    
    var bgImage = new Sprite( 1280, 1920 );
    bgImage.image = game.assets['./img/trash.png'];
    bgImage.originX = 0;
    bgImage.originY = 0;
    bgImage.scaleX = ( game.width / bgImage.width );
    bgImage.scaleY = ( game.height/ bgImage.height );
    bgImage.moveTo(0,0);
    scene.addChild(bgImage);
    
    var bgRayer = new Sprite( game.width, game.height );
    bgRayer.backgroundColor = '#FFF';
    bgRayer.opacity = 0.5;
    scene.addChild(bgRayer);
    
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
    paper.pic.image = game.assets['./img/paper.png'];
    paper.pic.frame = Paper_frame.ALC;
    // paper.pic.originX = 0;
    // paper.pic.originY = 0;
    // paper.pic.scaleX = ( PAPER_W / PAPER_IMG_W );
    // paper.pic.scaleY = ( PAPER_H / PAPER_IMG_H );
    paper.pic.moveTo(PAPER_DEFAULT_X,PAPER_DEFAULT_Y);
    scene.addChild(paper.pic);
    
    
    function TouchProperty() {
        this.x = 0;
        this.y = 0;
        this.time = 0;
        return this;
    }
    
    
    var touched = false;
    var touching = false;
    var touch = { 'begin': new TouchProperty(),
                  'end': new TouchProperty(),
                  'current': new TouchProperty()};
    
    var debugLabel = new Label("");
    debugLabel.moveTo(0,0);
    debugLabel.color = "#F0F";
    scene.addChild(debugLabel);
    
    var prevPoint = [];
    const PREV_COUNT = 10;
    for ( var i = 0; i < PREV_COUNT; i++ ) {
        prevPoint[i] = new TouchProperty();
    }
    var from = new TouchProperty();
    
    
    // game main
    scene.addEventListener( Event.TOUCH_START, function(e) {
        touch.begin.x = e.x;
        touch.begin.y = e.y;
        touch.begin.time = (new Date()).getTime();
        touch.current.x = e.x;
        touch.current.y = e.y;
        from.x = paper.pic.x;
        from.y = paper.pic.y;
        if ( e.x >= paper.pic.x && e.x <= paper.pic.x + paper.pic.width &&
             e.y >= paper.pic.y && e.y <= paper.pic.y + paper.pic.height ) {
            touching = true;
        }
    } );
    scene.addEventListener( Event.TOUCH_MOVE, function(e) {
        touch.current.x = e.x;
        touch.current.y = e.y;
        
    } );
    scene.addEventListener( Event.TOUCH_END, function(e) {
        touch.end.x = e.x;
        touch.end.y = e.y;
        touch.end.time = (new Date()).getTime();
        touching = false;
        if ( touch.begin.x == touch.end.x && touch.begin.y == touch.end.y  && 
             e.x >= paper.pic.x && e.x <= paper.pic.x + paper.pic.width &&
             e.y >= paper.pic.y && e.y <= paper.pic.y + paper.pic.height ) {
            touched = true;
        }
        
        console.log(prevPoint[PREV_COUNT-1].x+","+prevPoint[PREV_COUNT-1].y);
        
        if ( paper.state == "wasted" &&  touch.end.y < prevPoint[PREV_COUNT-1].y ) {
            paper.state = "throw";
            console.log("thrown");
        }
        if ( paper.state == "new" &&  touch.end.x < prevPoint[PREV_COUNT-1].x ) {
            paper.state = "get";
            console.log("got");
        }
        
    } );
    
    scene.addEventListener( Event.ENTER_FRAME, function(e) {
        debugLabel.text = Math.floor(touch.current.x)+","+Math.floor(touch.current.y);
        // console.log("tick past");
        if ( touched == true ) {
            paper.state = "wasted";
            paper.pic.frame = Paper_frame.CRASH;
            touched = false;
        }
        if ( touching == true ) {
            if ( paper.state == "wasted" ) {
                paper.pic.moveTo ( from.x ,  from.y + touch.current.y - touch.begin.y );
            } else if ( paper.state == "new" ){
                paper.pic.moveTo ( from.x + touch.current.x - touch.begin.x, from.y);
            }
        }
        if ( paper.state == "get" || paper.state == "throw" ) {
            paper.frame = Paper_frame.ALC;
            paper.state = "new";
        }
        
        for ( var i = PREV_COUNT-1; i > 0; i-- ) {
            prevPoint[i] = prevPoint[i-1];
        }
        prevPoint[0] = touch.current;
    } );
    
    
    // pause menu
    var pauseImage = game.assets['./img/pause.png'];
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
    scene.addChild(pauseButton);
    
    return scene;
};
