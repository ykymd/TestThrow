TestThrow.prototype.gotoTitleScene = function() {
    console.log("Title Scene");
    var thi$ = this;
    var scene = new Scene();

    var sound = this.assets[SND_THROW];
    var title_image = this.assets[IMG_TITLE];
    var sprite = new Sprite(TITLE_IMG_WIDTH, TITLE_IMG_HEIGHT);
    sprite.image = title_image;
    sprite.frame = 0;
    sprite.fitToSize(this.width, this.height);
    scene.addChild(sprite);

    scene.backgroundColor = '#FFF';
    scene.addEventListener('touchend', function() {
        sound.play();
        sprite.frame++;

        var curtain = new Sprite(thi$.width, thi$.height);
        curtain.backgroundColor = '#000';
        curtain.opacity = 0.0;
        scene.addChild(curtain);

        curtain.tl.delay(.25 * thi$.fps).fadeIn(.25 * thi$.fps).exec(function() {
            thi$.gotoSelectScene();
        });
    });

    this.replaceScene(scene);
};