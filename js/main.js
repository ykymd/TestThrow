enchant();

window.onload = function() {
	var game = new Game(320, 480);
	game.fps = 30;
	game.replaceScene(createTitleScene(game));
	game.start();
};
