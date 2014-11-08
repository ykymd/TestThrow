var Button = Class.create(Sprite, {
                          initialize: function(width, height) {
                          Sprite.call(this, width, height);
                          this.pressed = false;

                          this.addEventListener(Event.TOUCH_START, function(e) {
                                                this.down();
                                                });
                          this.addEventListener(Event.TOUCH_MOVE, function(e) {
                                                if (e.localX < 0 || e.localX > this.width || e.localY < 0 || e.localY > this.height) {
                                                this.up();
                                                }
                                                });
                          this.addEventListener(Event.TOUCH_END, function(e) {
                                                if (this.pressed == true) {
                                                this.dispatchEvent(new enchant.Event('tap'));
                                                this.up();
                                                }
                                                });
                          },
                          down: function(){
                          var pressedImage = this.image.clone();
                          var pixels = pressedImage.context.getImageData(0, 0, pressedImage.width, pressedImage.height);
                          var d = pixels.data;
                          for (var i = 0; i < d.length; i+=4) {
                          d[i] *= 0.5;
                          d[i+1] *= 0.5;
                          d[i+2] *= 0.5;
                          }
                          pressedImage.context.putImageData(pixels, 0, 0);
                          this.overImage = this.image;
                          this.image = pressedImage;
                          this.pressed = true;
                          },
                          up: function() {
                          this.pressed = false;
                          this.image = this.overImage;
                          }
                          });

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
