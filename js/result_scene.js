
var createResultScene = function(game) {
    var score = {'correct': 0, 'fail': 0, 'gpa': 0.0};
    var scene = new Scene();

    var hline = new Surface(300, 1);
    hline.lineWidth = 1;
    hline.context.beginPath();
    hline.context.moveTo(0, 0);
    hline.context.lineTo(300, 0);
    hline.context.stroke();

    var correct = new MutableText(80, 120, 1000);
    correct.fontSize = 32;
    correct.setText('CORRECT');
    scene.addChild(correct);

    var correctScore = new MutableText(120, 155, 100);
    correctScore.fontSize = 32;
    correctScore.setText('' + score.correct + '/100');
    scene.addChild(correctScore);

    var correctBaseline = new Sprite(300, 1);
    correctBaseline.y = 180;
    correctBaseline.image = hline;
    scene.addChild(correctBaseline);

    var correctImage = game.assets['./img/mark_circle.png'];
    var size = {'width': 90, 'height': 66};
    var correctMark = new Sprite(correctImage.width, correctImage.height);
    correctMark.image = correctImage;
    correctMark.originX = 0;
    correctMark.originY = 0;
    correctMark.scaleX = size.width / correctImage.width;
    correctMark.scaleY = size.height / correctImage.height;
    correctMark.moveTo(0, 130);
    scene.addChild(correctMark);

    var fail = new MutableText(180, 220, 1000);
    fail.fontSize = 32;
    fail.setText('FAIL');
    scene.addChild(fail);

    var failScore = new MutableText(120, 255, 100);
    failScore.fontSize = 32;
    failScore.setText('' + score.fail + '/100');
    scene.addChild(failScore);

    var failBaseline = new Sprite(300, 1);
    failBaseline.y = 280;
    failBaseline.image = hline;
    scene.addChild(failBaseline);

    var failImage = game.assets['./img/mark_x.png'];
    var size = {'width': 90, 'height': 66};
    var failMark = new Sprite(failImage.width, failImage.height);
    failMark.image = failImage;
    failMark.originX = 0;
    failMark.originY = 0;
    failMark.scaleX = size.width / failImage.width;
    failMark.scaleY = size.height / failImage.height;
    failMark.moveTo(0, 230);
    scene.addChild(failMark);

    var gpa = new MutableText(40, 400, 100);
    gpa.fontSize = 32;
    gpa.setText('GPA');
    scene.addChild(gpa);

    var gpaScore = new MutableText(180, 400, 100);
    gpaScore.fontSize = 32;
    gpaScore.setText(score.gpa.toFixed(2));
    scene.addChild(gpaScore);

    scene.backgroundColor = '#FFF';

    return scene;
};
