Game.GameOver = function(game) {

};

Game.GameOver.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'bg').frame = Game.bgsprite;
		
		if (Game.score > Game.bestScore) {
			Game.bestScore = Game.score;
		}
		
		Game.saveGameData(Game.bestScore, Game.sound, Game.music);
		
		var gameOverText = this.add.sprite(this.world.centerX, this.world.centerY - 90,'gameover');
		gameOverText.anchor.setTo(0.5, 0.5);
		gameOverText.scale.setTo(0, 0);
		
		this.add.tween(gameOverText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
		
		var gameScoresText = this.add.bitmapText(this.world.centerX, this.world.centerY + 30, 'badaboom', 'score: ' + Game.score + '\nbest:   ' + Game.bestScore, 40);
		
		gameScoresText.anchor.setTo(0.5, 0.5);
		gameScoresText.alpha = 0;
		
		this.add.tween(gameScoresText).delay(500).to({alpha: 1}, 500).start();
		
		var instructionText = this.add.bitmapText(this.world.centerX, this.world.height - 80, 'badaboom', 'use the arrow keys to control the snake', 25);
		instructionText.anchor.setTo(0.5, 0.5);
		instructionText.alpha = 0;
		
		this.add.tween(instructionText).delay(500).to({alpha: 1}, 500).start();
		
		this.timer = this.time.now + 500;
		
		this.soundToggleButton = this.add.button(this.world.width - 50, 10, 'sound', Game.toggleSound, this);
		if (Game.sound) {
			this.soundToggleButton.frame = 0;
		} else {
			this.soundToggleButton.frame = 1;
		}
		this.soundToggleButton.anchor.setTo(1, 0);
		this.soundToggleButton.alpha = 0;
		
		this.musicToggleButton = this.add.button(this.world.width - 100, 10, 'music', Game.toggleMusic, this);
		if (Game.music) {
			this.musicToggleButton.frame = 0;
		} else {
			this.musicToggleButton.frame = 1;
		}
		this.musicToggleButton.anchor.setTo(1, 0);
		this.musicToggleButton.alpha = 0;
		
		this.playButton = this.add.button(this.world.centerX, this.world.centerY + 140, 'play', this.play, this);
		this.playButton.anchor.setTo(0.5, 0.5);
		this.playButton.alpha = 0;
		
		this.add.tween(this.soundToggleButton).delay(500).to({alpha: 1}, 500).start();
		
		this.add.tween(this.musicToggleButton).delay(500).to({alpha: 1}, 500).start();
		
		this.add.tween(this.playButton).delay(500).to({alpha: 1}, 500).start();
	},
	play: function() {
		Game.deadSound.stop();
		this.state.start('Play');
	}
};