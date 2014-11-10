TestThrow.prototype.gotoPauseScene = function() {
    console.log("Pause Scene");
    var scene = new Scene();
    var thi$ = this;

    var curtain = new Sprite(thi$.width, thi$.height);
    curtain.backgroundColor = '#000';
    curtain.opacity = .25;
    scene.addChild(curtain);

    const size = {
        'width': 225,
        'height': 75
    };
    const gap = 50;
    const resume_image = thi$.assets['./img/pause_continue.png'];
    const back_image = thi$.assets['./img/pause_giveup.png'];

    var resume = new Button(resume_image.width, resume_image.height);
    resume.image = resume_image;
    resume.fitToSize(size.width, size.height);
    resume.moveTo((thi$.width - size.width) / 2, (thi$.height - size.height - gap) / 2 - size.height);
    resume.addEventListener('tap', function() {
        thi$.popScene();
    });
    scene.addChild(resume);

    var back = new Button(back_image.width, back_image.height);
    back.image = back_image;
    back.fitToSize(size.width, size.height);
    back.moveTo((thi$.width - size.width) / 2, (thi$.height - size.height - gap) / 2 + gap / 2);
    back.addEventListener('tap', function() {
        thi$.removeScene(scene);
        thi$.gotoTitleScene();
    });
    scene.addChild(back);

    this.pushScene(scene);
};