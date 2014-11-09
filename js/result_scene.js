
var createResultScene = function(game) {
    var score = {
        'correct': game.scores.ok,
        'fail': game.scores.ng,
        'gpa': 4.0 * (game.scores.ok + game.scores.ng) / (game.scores.okMax + game.scores.ngMax)
    };
    var scene = new Scene();

    var markImage = game.assets[IMG_MARK];
    console.log("image loaded");
    
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
    correctScore.setText('' + score.correct + '/' + game.scores.okMax.toFixed(0));
    scene.addChild(correctScore);

    var correctBaseline = new Sprite(300, 1);
    correctBaseline.y = 180;
    correctBaseline.image = hline;
    scene.addChild(correctBaseline);

    var size = {'width': 90, 'height': 66};
    var correctMark = new Sprite( MARK_IMG_WIDTH, MARK_IMG_HEIGHT );
    correctMark.image = markImage;
    correctMark.frame = 2;
    correctMark.originX = 0;
    correctMark.originY = 0;
    correctMark.scaleX = size.width / MARK_IMG_WIDTH;
    correctMark.scaleY = size.height / MARK_IMG_HEIGHT;
    correctMark.moveTo(0, 130);
    scene.addChild(correctMark);
    
    console.log("correct image loaded");

    var fail = new MutableText(180, 220, 1000);
    fail.fontSize = 32;
    fail.setText('FAIL');
    scene.addChild(fail);

    var failScore = new MutableText(120, 255, 100);
    failScore.fontSize = 32;
    failScore.setText('' + score.fail + '/' + game.scores.ngMax.toFixed(0));
    scene.addChild(failScore);

    var failBaseline = new Sprite(300, 1);
    failBaseline.y = 280;
    failBaseline.image = hline;
    scene.addChild(failBaseline);

    var failMark = new Sprite( MARK_IMG_WIDTH, MARK_IMG_HEIGHT );
    var size = {'width': 90, 'height': 66};
    failMark.image = markImage;
    failMark.frame = 0;
    failMark.originX = 0;
    failMark.originY = 0;
    failMark.scaleX = size.width / MARK_IMG_WIDTH;
    failMark.scaleY = size.height / MARK_IMG_HEIGHT;
    failMark.moveTo(0, 230);
    scene.addChild(failMark);
    
    console.log("fail image loaded");

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
