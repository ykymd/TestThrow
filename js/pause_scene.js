
var createPauseScene = function(game) {
    console.log("Pause Scene");
    var scene = new Scene();

    var curtain = new Sprite(game.width, game.height);
    curtain.backgroundColor = '#000';
    curtain.opacity = .25;
    scene.addChild(curtain);

    const size = {'width': 225, 'height': 75};
    const gap = 50;
    const resume_image = game.assets['./img/pause_continue.png'];
    const back_image = game.assets['./img/pause_giveup.png'];

    var resume = new Button(resume_image.width, resume_image.height);
    resume.image = resume_image;
    resume.originX = 0;
    resume.originY = 0;
    resume.scaleX = size.width / resume_image.width;
    resume.scaleY = size.height / resume_image.height;
    resume.moveTo((game.width - size.width) / 2, (game.height - size.height - gap) / 2 - size.height);
    resume.addEventListener('tap', function() {
                            game.popScene();
                            });
    scene.addChild(resume);

    var back = new Button(back_image.width, back_image.height);
    back.image = back_image;
    back.originX = 0;
    back.originY = 0;
    back.scaleX = size.width / back_image.width;
    back.scaleY = size.height / back_image.height;
    back.moveTo((game.width - size.width) / 2, (game.height - size.height - gap) / 2 + gap / 2);
    back.addEventListener('tap', function() {
                          game.removeScene(scene);
                          game.replaceScene(createTitleScene(game));
                          });
    scene.addChild(back);
    
    return scene;
};
