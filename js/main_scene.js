var createMainScene = function( game ) {
    
    // initialize
    var scene = new Scene();
    scene.backgroundColor = '#00F';
    
    var paper = { 'pic': new Sprite( 200, 300 ) ,
                  'wasted': false ,
                  'score': 0 };
    paper.pic.image = game.assets['./img/paper.png'];
    paper.pic.moveTo(60,90);
    paper.pic.backgroundColor = "#FFF";
    scene.addChild(paper.pic);
    
    function TouchProperty() {
        this.x = 0;
        this.y = 0;
        this.time = 0;
        return this;
    }
    
    
    var touched = false;
    var touch = { 'begin': new TouchProperty(),
                  'end': new TouchProperty(),
                  'current': new TouchProperty()};
    
    var debugLabel = new Label("");
    debugLabel.moveTo(0,0);
    debugLabel.color = "#F0F";
    scene.addChild(debugLabel);
    
    
    // game main
    
    scene.addEventListener( Event.TOUCH_START, function(e) {
        touch.begin.x = e.x;
        touch.begin.y = e.y;
        touch.begin.time = (new Date()).getTime();
        touch.current.x = e.x;
        touch.current.y = e.y;
    } );
    scene.addEventListener( Event.TOUCH_MOVE, function(e) {
        touch.current.x = e.x;
        touch.current.y = e.y;
    } );
    scene.addEventListener( Event.TOUCH_END, function(e) {
        touch.end.x = e.x;
        touch.end.y = e.y;
        touch.end.time = (new Date()).getTime();
        if ( touch.begin.x == touch.end.x && touch.begin.y == touch.end.y ) {
            touched = true;
        }
    } );
    
    scene.addEventListener( Event.ENTER_FRAME, function(e) {
        debugLabel.text = Math.floor(touch.current.x)+","+Math.floor(touch.current.y);
        if ( touched == true ) {
            paper.wasted = true;
            paper.pic.image = game.assets['./img/waste.png'];
            touched = false;
        }
    } );
    
    return scene;
};
