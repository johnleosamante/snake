Game.Preloader = function(game) {
	
};

Game.Preloader.prototype = {
	preload: function() {
		this.preloadbar = this.add.sprite(this.world.centerX - 70, this.world.centerY - 10, 'preloaderBar');
		
		this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderFrame').anchor.setTo(0.5, 0.5);
		
		this.load.setPreloadSprite(this.preloadbar);
		
		this.load.bitmapFont('badaboom', 'font/badaboom.png', 'font/badaboom.xml');
		
		this.load.image('title', 'image/title.png');
		this.load.image('gameover', 'image/gameover.png');
		this.load.image('play', 'image/play.png');
		
		this.load.spritesheet('bg', 'image/bg.png', 800, 600);
		this.load.spritesheet('sound', 'image/sound.png', 48, 48);
		this.load.spritesheet('music', 'image/music.png', 48, 48);
		this.load.spritesheet('snake', 'image/snake.png', 20, 20);
		this.load.spritesheet('food', 'image/food.png', 20, 20);
		
		this.load.audio('music', 'audio/music.wav');
		this.load.audio('score', 'audio/score.wav');
		this.load.audio('death', 'audio/death.wav');
		
		var data = Storage.get("snakeGameData");
		
		if (data) {
			Game.bestScore = data.bestScore;
			Game.sound = data.sound;
			Game.music = data.music;
		}
	},
	create: function() {
		this.preloadbar.cropEnabled = false;
	},
	update: function() {
		if (this.cache.isSoundDecoded('music')) {
			this.state.start('MainMenu');
		}
	},
};