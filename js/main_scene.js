var createMainScene = funtion( Game game ) {
    var scene = new Scene();
    var paper = new Sprite( 200, 300 );
    paper.image = game.assets['./img/paper.png'];
    
    scene.addChild(paper);
    scene.backgroundColor = 'rgba( 0, 0, 0, 0 )';
    
    return scene;
}
