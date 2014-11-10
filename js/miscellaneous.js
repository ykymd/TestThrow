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
    down: function() {
        this.pressed = true;
        return;
        var pressedImage = this.image.clone();
        var pixels = pressedImage.context.getImageData(0, 0, pressedImage.width, pressedImage.height);
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] *= 0.5;
            d[i + 1] *= 0.5;
            d[i + 2] *= 0.5;
        }
        pressedImage.context.putImageData(pixels, 0, 0);
        this.overImage = this.image;
        this.image = pressedImage;
    },
    up: function() {
        this.pressed = false;
        return;
        this.image = this.overImage;
    }
});

var Timer = Class.create(Group, {
    initialize: function(fps) {
        Group.call(this);

        this.fps = fps;

        var radius = 30;
        var surface = new Surface(2 * radius + 2, 2 * radius + 2);
        var ctx = surface.context;
        ctx.beginPath();
        ctx.arc(radius + 1, radius + 1, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#CCF';
        ctx.fill();
        ctx.stroke();

        var circle = new Sprite(2 * radius + 2, 2 * radius + 2);
        circle.image = surface;
        this.addChild(circle);

        var arc = new Sprite(2 * radius + 2, 2 * radius + 2);
        this.addChild(arc);

        var number = new MutableText(-30, 18, 100);
        number.fontSize = 32;
        number.scaleX = .5;
        this.addChild(number);

        this.tick = function(duration) {
            var elapsed = this.age - this.startFrame;
            var surface = new Surface(2 * radius + 2, 2 * radius + 2);
            var ctx = surface.context;
            ctx.moveTo(radius + 1, radius + 1);
            ctx.lineTo(radius + 1, 1);
            ctx.arc(radius + 1, radius + 1, radius, -0.5 * Math.PI, -0.48 * Math.PI + 2 * Math.PI * elapsed / (duration * this.fps));
            ctx.lineTo(radius + 1, radius + 1);
            ctx.fillStyle = '#FCC';
            ctx.fill();
            ctx.stroke();
            arc.image = surface;

            var seconds = Math.floor((duration * this.fps - elapsed) / this.fps);
            if (seconds < 10) {
                number.scaleX = 1.0;
                number.x = 18;
            }
            number.setText(seconds.toFixed(0));
        };
    },
    after: function(duration) {
        var tick = function() {
            this.tick(duration);
        };
        this.startFrame = this.age;
        return this.tl.repeat(tick, duration * this.fps);
    }
});
