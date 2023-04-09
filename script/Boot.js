var Game = {
	firstRun: true,
	score: 0,
	bestScore: 0,
	sound: true,
	music: true,
	deadSound: null,
	bgsprite: null,
	toggleSound: function() {
		if (this.soundToggleButton.frame === 0) {
			this.soundToggleButton.frame = 1;
			Game.sound = false;
		} else {
			this.soundToggleButton.frame = 0;
			Game.sound = true;
		}
		Game.saveGameData(Game.bestScore, Game.sound, Game.music);
	},
	toggleMusic: function() {
		if (this.musicToggleButton.frame === 0) {
			this.musicToggleButton.frame = 1;
			Game.music = false;
		} else {
			this.musicToggleButton.frame = 0;
			Game.music = true;
		}
		Game.saveGameData(Game.bestScore, Game.sound, Game.music);
	},
	saveGameData: function(bestScore, sound, music) {
		Storage.set("snakeGameData", {
			bestScore: bestScore,
			sound: sound,
			music: music,
		});
	},
};

Game.Boot = function(game) {
	
};

Game.Boot.prototype = {
	init: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
	preload: function() {
		this.load.image('preloaderFrame', 'image/preloaderframe.png');
		this.load.image('preloaderBar', 'image/preloaderbar.png');
	},
	create: function() {
		this.state.start('Preloader');
	},
};