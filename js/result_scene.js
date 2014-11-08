
var createResultScene = function(game) {
    var score = {'correct': 0, 'fail': 0};
    var scene = new Scene();

    var hline = new Surface(300, 1);
    hline.lineWidth = 1;
    hline.context.beginPath();
    hline.context.moveTo(0, 0);
    hline.context.lineTo(300, 0);
    hline.context.stroke();

    var correct = new MutableText(20, 120, 1000);
    correct.fontSize = 32;
    correct.setText('CORRECT');
    scene.addChild(correct);

    var correctScore = new MutableText(120, 150, 100);
    correctScore.fontSize = 32;
    correctScore.setText('' + score.correct + '/100');
    scene.addChild(correctScore);

    var correctBaseline = new Sprite(300, 1);
    correctBaseline.y = 182;
    correctBaseline.image = hline;
    scene.addChild(correctBaseline);

    var fail = new MutableText(20, 220, 1000);
    fail.fontSize = 32;
    fail.setText('FAIL');
    scene.addChild(fail);

    var failScore = new MutableText(120, 250, 100);
    failScore.fontSize = 32;
    failScore.setText('' + score.fail + '/100');
    scene.addChild(failScore);

    var failBaseline = new Sprite(300, 1);
    failBaseline.y = 282;
    failBaseline.image = hline;
    scene.addChild(failBaseline);

    scene.backgroundColor = '#FFF';

    return scene;
};
