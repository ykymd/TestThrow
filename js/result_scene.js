
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
    correct.originX = 0;
    correct.originY = 0;
    correct.scaleX = 2;
    correct.scaleY = 2;
    correct.setText('CORRECT');
    scene.addChild(correct);

    var correctScore = new MutableText(120, 150, 100);
    correctScore.originX = 0;
    correctScore.originY = 0;
    correctScore.scaleX = 2;
    correctScore.scaleY = 2;
    correctScore.setText('' + score.correct + '/100');
    scene.addChild(correctScore);

    var correctBaseline = new Sprite(300, 1);
    correctBaseline.y = 182;
    correctBaseline.image = hline;
    scene.addChild(correctBaseline);

    var fail = new MutableText(20, 220, 1000);
    fail.originX = 0;
    fail.originY = 0;
    fail.scaleX = 2;
    fail.scaleY = 2;
    fail.setText('FAIL');
    scene.addChild(fail);

    var failScore = new MutableText(120, 250, 100);
    failScore.originX = 0;
    failScore.originY = 0;
    failScore.scaleX = 2;
    failScore.scaleY = 2;
    failScore.setText('' + score.fail + '/100');
    scene.addChild(failScore);

    var failBaseline = new Sprite(300, 1);
    failBaseline.y = 282;
    failBaseline.image = hline;
    scene.addChild(failBaseline);

    scene.backgroundColor = '#FFF';

    return scene;
};