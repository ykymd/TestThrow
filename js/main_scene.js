var createMainScene = function( game ) {
    
    var scene = new Scene();
    scene.backgroundColor = '#FFF';
    
    var paper = new Sprite( 200, 300 );
    paper.image = game.assets['./js/img/paper.png'];
    paper.x = 60;
    paper.y = 90;
    scene.addChild(paper);
    
    return scene;
};
