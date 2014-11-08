var createMainScene = function( game ) {
    
    // initialize
    var scene = new Scene();
    scene.backgroundColor = '#00F';
    
    var paper = new Sprite( 200, 300 );
    paper.image = game.assets['./img/paper.png'];
    paper.moveTo(60,90);
    paper.backgroundColor = "#FFF";
    scene.addChild(paper);
    
    var touched = false;
    var touch = { 'x':0, 'y':0 };
    
    var debugLabel = new Label("");
    debugLabel.moveTo(0,0);
    debugLabel.color = "#F0F";
    scene.addChild(debugLabel);
    
    // game main
    
    scene.addEventListener( Event.TOUCH_START, function(e) {
        touched = true;
        touch.x = e.x;
        touch.y = e.y;
    } );
    scene.addEventListener( Event.TOUCH_MOVE, function(e) {
        touch.x = e.x;
        touch.y = e.y;
    } );
    scene.addEventListener( Event.TOUCH_END, function(e) {
        touched = false;
        touch.x = e.x;
        touch.y = e.y;
    } );
    
    scene.addEventListener( Event.ENTER_FRAME, function(e) {
        debugLabel.text = Math.floor(touch.x)+","+Math.floor(touch.y);
    } );
    
    return scene;
};
