var Button = Class.create(Sprite, {
                          initialize: function(width, height) {
                          Sprite.call(this, width, height);
                          this.pressed = false;

                          this.addEventListener(Event.TOUCH_START, function(e) {
                                                this.pressed = true;
                                                });
                          this.addEventListener(Event.TOUCH_MOVE, function(e) {
                                                if (e.localX < 0 || e.localX > this.width || e.localY < 0 || e.localY > this.height) this.pressed = false;
                                                });
                          this.addEventListener(Event.TOUCH_END, function(e) {
                                                if (this.pressed == true) this.dispatchEvent(new enchant.Event('tap'));
                                                });
                          }});

var createPauseScene = function(game) {
    console.log("Pause Scene");
    var scene = new Scene();

    var curtain = new Sprite(game.width, game.height);
    curtain.backgroundColor = '#000';
    curtain.opacity = .25;
    scene.addChild(curtain);

    var size = {'width': 200, 'height': 60};
    var gap = 50;

    var resume = new Button(size.width, size.height);
    resume.moveTo((game.width - size.width) / 2, (game.height - 2 * size.height - gap) / 2 - size.height);
    resume.backgroundColor = '#088';
    resume.addEventListener('tap', function() {
                            game.popScene();
                            });
    scene.addChild(resume);

    var back = new Button(size.width, size.height);
    back.moveTo((game.width - size.width) / 2, (game.height - 2 * size.height - gap) / 2 + gap / 2);
    back.backgroundColor = '#880';
    back.addEventListener('tap', function() {
                          game.replaceScene(createTitleScene(game));
                          });
    scene.addChild(back);
    
    return scene;
};
