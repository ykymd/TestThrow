
var createResultScene = function(game) {
    
    const MULTIPLY = 2;
    
    var score = {
        'correct': game.scores.ok,
        'fail': game.scores.ng,
        'gpa': 4.0 * (game.scores.ok + game.scores.ng) / (game.scores.okMax + game.scores.ngMax),
        'grade': (game.scores.ok+game.scores.ng) * MULTIPLY
    };
    var scene = new Scene();
    
    const DELAY = 0.5;
    
    const CORRECT_MARK_X = 0;
    const CORRECT_MARK_Y = 100;
    const CORRECT_LABEL_X = 80;
    const CORRECT_LABEL_Y = 90;
    const CORRECT_SCORE_X = 120;
    const CORRECT_SCORE_Y = 125;
    const CORRECT_BASELINE_Y = 150;
    
    const FAIL_MARK_X = 0;
    const FAIL_MARK_Y = 200;
    const FAIL_LABEL_X = 180;
    const FAIL_LABEL_Y = 190;
    const FAIL_SCORE_X = 120;
    const FAIL_SCORE_Y = 225;
    const FAIL_BASELINE_Y = 250;
    
    const GRADE_LABEL_X = 40;
    const GRADE_LABEL_Y = 310;
    const GRADE_SCORE_X = 220;
    const GRADE_SCORE_Y = 310;
    const GPA_LABEL_X = 40;
    const GPA_LABEL_Y = 370;
    const GPA_SCORE_X = 180;
    const GPA_SCORE_Y = 370;
    

    var markImage = game.assets[IMG_MARK];
    // console.log("image loaded");
    
    var hline = new Surface(300, 1);
    hline.lineWidth = 1;
    hline.context.beginPath();
    hline.context.moveTo(0, 0);
    hline.context.lineTo(300, 0);
    hline.context.stroke();

    var correct = new MutableText( CORRECT_LABEL_X, CORRECT_LABEL_Y, 1000);
    correct.fontSize = 32;
    correct.setText('CORRECT');
    scene.addChild(correct);

    var correctScore = new MutableText( CORRECT_SCORE_X, CORRECT_SCORE_Y, 100);
    correctScore.fontSize = 32;
    correctScore.setText('' + score.correct + '/' + game.scores.okMax.toFixed(0));
    correctScore.tl.hide();
    var showCorrectScore = function(){correctScore.tl.show();};
    scene.addChild(correctScore);

    var correctBaseline = new Sprite(300, 1);
    correctBaseline.y = CORRECT_BASELINE_Y;
    correctBaseline.image = hline;
    scene.addChild(correctBaseline);

    var size = {'width': 90, 'height': 66};
    var correctMark = new Sprite( MARK_IMG_WIDTH, MARK_IMG_HEIGHT );
    correctMark.image = markImage;
    correctMark.frame = 2;
    correctMark.fitToSize(size.width, size.height);
    correctMark.moveTo( CORRECT_MARK_X, CORRECT_MARK_Y );
    scene.addChild(correctMark);
    
    // console.log("correct image loaded");

    var fail = new MutableText( FAIL_LABEL_X , FAIL_LABEL_Y, 1000);
    fail.fontSize = 32;
    fail.setText('FAIL');
    scene.addChild(fail);

    var failScore = new MutableText( FAIL_SCORE_X, FAIL_SCORE_Y, 100);
    failScore.fontSize = 32;
    failScore.setText('' + score.fail + '/' + game.scores.ngMax.toFixed(0));
    failScore.tl.hide();
    var showFailScore = function(){failScore.tl.show();};
    scene.addChild(failScore);

    var failBaseline = new Sprite(300, 1);
    failBaseline.y = FAIL_BASELINE_Y;
    failBaseline.image = hline;
    scene.addChild(failBaseline);

    var failMark = new Sprite( MARK_IMG_WIDTH, MARK_IMG_HEIGHT );
    var size = {'width': 90, 'height': 66};
    failMark.image = markImage;
    failMark.frame = 0;
    failMark.fitToSize(size.width, size.height);
    failMark.moveTo( FAIL_MARK_X, FAIL_MARK_Y );
    scene.addChild(failMark);
    
    // console.log("fail image loaded");

    var backButton = new Sprite( BACK_IMG_WIDTH, BACK_IMG_HEIGHT );
    var size = {'width': 40, 'height': 40};
    backButton.image = game.assets[IMG_BACK];
    backButton.fitToSize(size.width, size.height);
    backButton.moveTo(5,5);
    backButton.tl.hide();
    scene.addChild(backButton);
    backButton.addEventListener( Event.TOUCH_START, function(e) {
        game.replaceScene( createTitleScene(game) );
    } );
    var showBackbutton = function() { backButton.tl.show(); };

    var grade = new MutableText( GRADE_LABEL_X, GRADE_LABEL_Y, 100);
    grade.fontSize = 32;
    grade.setText('GRADE');
    scene.addChild(grade);
    
    var gradeScore = new MutableText( GRADE_SCORE_X, GRADE_SCORE_Y, 100);
    gradeScore.fontSize = 32;
    gradeScore.setText(score.grade.toFixed(0));
    gradeScore.tl.hide();
    scene.addChild(gradeScore);
    var showGrade = function() { gradeScore.tl.show(); };
    
    var gpa = new MutableText( GPA_LABEL_X , GPA_LABEL_Y, 100);
    gpa.fontSize = 32;
    gpa.setText('GPA');
    scene.addChild(gpa);

    var gpaScore = new MutableText( GPA_SCORE_X , GPA_SCORE_Y, 100);
    gpaScore.fontSize = 32;
    gpaScore.setText(score.gpa.toFixed(2));
    gpaScore.tl.hide();
    scene.addChild(gpaScore);
    var showGpa = function() { gpaScore.tl.show(); };

    scene.backgroundColor = '#FFF';

    scene.tl.delay(DELAY*game.fps).exec(showCorrectScore);
    scene.tl.delay(DELAY*game.fps).exec(showFailScore);
    scene.tl.delay(DELAY*game.fps).exec(showGrade);
    scene.tl.delay(DELAY*game.fps).exec(showGpa);
    scene.tl.delay(DELAY*game.fps).exec(showBackbutton);

    return scene;
};
