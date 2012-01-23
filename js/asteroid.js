

var asteroidManager = function(gameX, gameY) {
	
	var asteroidTypes = [{path: "img/asteroidSmall.png", rad: 10},
	                   {path: "img/asteroidMed.png", rad: 20},
	                   {path: "img/asteroidMedBig.png", rad: 30},
	                   {path: "img/asteroidHuge.png", rad: 50}];
	
	
	var calcMovementStep = function(elapsedMs, speed) {
		return Math.ceil(elapsedMs / 1000 * speed);
	};
	
	var asteroid = function(layer) {
		this.type = asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];
		
		//this.domElement = $(svg.image(null, this.x, this.y, type.rad * 2, type.rad * 2, type.path, {transform: "translate(-20, -20)"})); // the transform puts location x and y in the middle of the asteroid.
		var asteroidImage = doodle.createImage(this.type.path);
		asteroidImage.x = this.x - this.type.rad;
		asteroidImage.y = this.y - this.type.rad;
		asteroidImage.width = asteroidImage.height = this.type.rad * 2;
		this.asteroidElement = asteroidImage;
		
		layer.addChild(asteroidImage);
		//this.domsvg.image(null, this.x, this.y, type.rad * 2, type.rad * 2, type.path, {transform: "translate(-20, -20)"})); // the transform puts location x and y in the middle of the asteroid.
	};
	
	asteroid.prototype = {
		calcNewPosition: function(elapsedMs) {
			this.x += calcMovementStep(elapsedMs, this.xComp);
			this.y += calcMovementStep(elapsedMs, this.yComp);
		},
		setVector: function (xComponent, yComponent) {
			this.xComp = xComponent;
			this.yComp = yComponent;
		},
		setPosition: function (x, y) {
			this.x = x;
			this.y = y;
		},
		draw: function() {
			//this.domElement.attr("x", this.x);
			//this.domElement.attr("y", this.y);
			this.asteroidElement.x = this.x - this.type.rad;
			this.asteroidElement.y = this.y - this.type.rad;
		}
	};
	
	
	var me = this,
		asteroids = [];

	var generateRandomVector = function(a) {
		// X can be negative or positive in the range of -4 to 4 (may be a bug here)
		// y can only be positive and must be greater than 1, range of 3 to 7
		a.setVector(Math.ceil((Math.random() * 150 * 2) - 150), Math.ceil(((Math.random() + .001) / 1.001) * 150) + 70);
	};
	
	// sets the asteroid at the starting point, also generating a random vector.
	var resetAsteroid = function(a) {
		a.setPosition(Math.ceil((Math.random() * (gameX - 40)) + 20), -50);
		generateRandomVector(a); // generate a new vector
	};
	
	me.init = function(layer) {
		var i = 0,
			newAsteroid;
		
		// select number of asteroids, 
		for (i = 0; i < 12; i++) {
			
			// pick a random start position and vector for all of them
			// keep asteroid in X bounds, start at just outside viewable window.
			newAsteroid = new asteroid(layer);
			resetAsteroid(newAsteroid); 
			
			
			asteroids.push(newAsteroid);
		}
	};

	me.update = function(gameState) {
		$.each(asteroids, function(index, value) {
			value.calcNewPosition(gameState.elapsedTime);
			
			// need a buffer for the graphic, else user sees asteroid being reset and disappearing.
			if (value.x > gameX + 50 || value.x < -50 || value.y > gameY + 50) {
				resetAsteroid(value);
			}
		});
	};
	
	
	me.draw = function(state) {
		$.each(asteroids, function(index, value) {
			value.draw();
		});
	};
	
	return me;
};
