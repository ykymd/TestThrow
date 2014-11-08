var createTitleScene = function(game) {
	console.log("Title Scene");
	var scene = new Scene();

    var label = new Label('Title Scene');
    label.color = '#FFF';
    label.moveTo((game.width - label.width) / 2, (game.height - label.height) / 2);
    scene.addChild(label);

    scene.addEventListener('touchend', function() {
                           game.pushScene(createSelectScene(game));
                           });

	return scene;
};
