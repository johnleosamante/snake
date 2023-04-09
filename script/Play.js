Game.Play = function(game) {

};

Game.Play.prototype = {
	create: function() {
		if (!Game.firstRun) {
			Game.bgsprite = Math.floor(Math.random() * 2);
		}
		
		this.add.sprite(0, 0, 'bg').frame = Game.bgsprite;
		Game.firstRun = false;
		
		Game.score = 0;
		this.cursors = this.input.keyboard.createCursorKeys();
		this.currentMovement = 2;
		this.snake = [];
		this.snakecolor = Math.floor(Math.random() * 3) * 5;
		this.initiallength = 3;
		this.food = null;
		Game.score = 0;
		this.gridSize = 20;
		this.updateSpeed = 200;
		this.lastUpdate = 0;
		this.movement = {
			'UP': 1,
			'RIGHT': 2,
			'DOWN': 4,
			'LEFT': 8,
		};
		
		this.music = this.add.sound('music');
		
		if (Game.music) {
			this.music.play('', 0, 0.4, true);
		}
		
		this.scoreSound = this.add.sound('score');
		this.scoreSound.volume = 0.2;
		Game.deadSound = this.add.sound('death');
		Game.deadSound.volume = 0.5;
		
		this.generateFood();
		
		for (var i = 0; i < this.initiallength; i++) {
			this.growSnake();
			this.snake[0].frame = 2 + this.snakecolor;
		}
		
		this.scoreText = this.add.bitmapText(60, 20, 'badaboom', 'score: 0', 40);
		this.bestscoreText = this.add.bitmapText(500, 20, 'badaboom', 'best score: ' + Game.bestScore, 40);
		this.updateScore();
	},
	generateFood: function() {
		var widthPoints = this.world.width / this.gridSize;
		var heightPoints = this.world.height / this.gridSize;
		
		var x;
		var y;
		
		do {
			x = Math.round(Math.random() * (widthPoints - 7)) * this.gridSize + (this.gridSize * 3);
			y = Math.round(Math.random() * (heightPoints - 9)) * this.gridSize + (this.gridSize * 5);
		} while (this.compareWithSnake(x, y));
		
		if (!this.food) {
			this.food = this.add.sprite(this.world.centerX, this.world.centerY, 'food');
		}
		
		this.food.x = x;
		this.food.y = y;
		this.food.frame = Math.floor(Math.random() * 5);
	},
	compareWithSnake: function(x, y) {
		var collision = false;
		
		this.snake.forEach(function(item) {
			if (item.body.x === x && item.body.y === y) {
				collision = true;
				return false;
			}
		});
		
		return collision;
	},
	updateScore: function() {
		this.scoreText.setText('score: ' + Game.score);
		
		if (Game.score > Game.bestScore) {
			Game.bestScore = Game.score;
		}
		
		this.bestscoreText.setText('best score: ' + Game.bestScore);
	},
	growSnake: function() {
		var x = 400;
		var y = 300;
		
		if (this.snake.length !== 0) {
			x = this.snake[this.snake.length - 1].x;
			y = this.snake[this.snake.length - 1].y + this.gridSize;
		}
		
		var body = this.add.sprite(x, y, 'snake');
		body.frame = this.snakecolor;
		this.physics.arcade.enable(body);
		
		this.snake.push(body);
	},
	updateMovementPosition: function() {
		if (this.cursors.up.isDown && this.currentMovement != this.movement.DOWN) {
			this.currentMovement = this.movement.UP;
			this.snake[0].frame = 1 + this.snakecolor;
		} else if (this.cursors.right.isDown && this.currentMovement != this.movement.LEFT) {
			this.currentMovement = this.movement.RIGHT;
			this.snake[0].frame = 2 + this.snakecolor;
		} else if (this.cursors.down.isDown && this.currentMovement != this.movement.UP) {
			this.currentMovement = this.movement.DOWN;
			this.snake[0].frame = 3 + this.snakecolor;
		} else if (this.cursors.left.isDown && this.currentMovement != this.movement.RIGHT) {
			this.currentMovement = this.movement.LEFT;
			this.snake[0].frame = 4 + this.snakecolor;
		}
	},
	getTimeStamp: function() {
		return new Date().getTime();
	},
	isColliding: function(a, b) {
		if (a.body.hitTest(b.x, b.y)) {
			return true;
		}
		
		return false;
	},
	checkCollisionWithSelf: function() {
		for (var i = 1; i < this.snake.length; i++) {
			if (this.snake[0].body.hitTest(this.snake[i].x, this.snake[i].y)) {
				return true;
			}
		}
		
		return false;
	},
	checkOutOfBoundary: function() {
		if ((this.snake[0].body.x > 740 - this.snake.length) || 
		(this.snake[0].body.x < 60) || 
		(this.snake[0].body.y > 540 - this.snake.length) || 
		(this.snake[0].body.y < 100)) {
			return true;
		}
		return false;
	},
	gameOver: function() {
		if (Game.sound)
			Game.deadSound.play();
		
		this.music.stop();
		this.state.start('GameOver');
	},
	update: function() {
		if (!this.isDead) {
			this.updateMovementPosition();
		}
		
		if ((this.getTimeStamp() - this.lastUpdate) < this.updateSpeed) {
			return;
		}
		
		if (this.isColliding(this.snake[0], this.food)) {
			if (Game.sound) {
				this.scoreSound.play();
			}
			
			if (this.updateSpeed > 150 && this.updateSpeed <= 200) {
				Game.score++;
			}
			
			if (this.updateSpeed > 100 && this.updateSpeed <= 150) {
				Game.score = Game.score + 2;
			}
			
			if (this.updateSpeed > 50 && this.updateSpeed <= 100) {
				Game.score = Game.score + 4;
			}
			
			if (this.updateSpeed >= 20 && this.updateSpeed <= 50) {
				Game.score = Game.score + 8;
			}
			
			if (this.updateSpeed > 20) {
				this.updateSpeed = this.updateSpeed - 5;
			}
			
			this.updateScore();
			this.growSnake();
			this.generateFood();
		}
		
		if (this.checkCollisionWithSelf()) {
			this.gameOver();
			return;
		}
		
		this.lastUpdate = this.getTimeStamp();
		
		var oldX, oldY;
		
		for (var i = 0; i < this.snake.length; i++) {
			var x = this.snake[i].x;
			var y = this.snake[i].y;
			
			if (i !== 0) {
				this.snake[i].x = oldX;
				this.snake[i].y = oldY;
			}
			
			oldX = x;
			oldY = y;
		}
		
		switch(this.currentMovement) {
			case this.movement.UP:
				this.snake[0].y -= this.gridSize;
				break;
			case this.movement.RIGHT:
				this.snake[0].x += this.gridSize;
				break;
			case this.movement.DOWN:
				this.snake[0].y += this.gridSize;
				break;
			case this.movement.LEFT:
				this.snake[0].x -= this.gridSize;
				break;
		}
		
		if (this.checkOutOfBoundary()) {
			this.gameOver();
			return;
		}
	},
};