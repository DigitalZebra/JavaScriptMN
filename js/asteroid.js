

var asteroidManager = function(gameX, gameY) {
	
	var asteroidTypes = [{path: "img/asteroidSmall.png", rad: 10, size: "small"},
	                   {path: "img/asteroidMed.png", rad: 20, size: "med"},
	                   {path: "img/asteroidMedBig.png", rad: 30, size: "big"},
	                   {path: "img/asteroidHuge.png", rad: 50, size: "huge"}];
	
	var ASTEROID_Y_COMPONENT = 90,
		ASTEROID_Y_COMPONENT_STEP = 5,
		ASTEROID_Y_COMPONENT_MAX = 360,
		NUM_ASTEROIDS = 16;
	
	                   
	
	
	var calcMovementStep = function(elapsedMs, speed) {
		return Math.ceil(elapsedMs / 1000 * speed);
	};
	
	var asteroid = function(layer) {
		
		asCircleCollidableObject.call(this);
		
		this.type = asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];
		
		this.radius = this.type.rad;
		
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
			this.locationX += calcMovementStep(elapsedMs, this.xComp);
			this.locationY += calcMovementStep(elapsedMs, this.yComp);
		},
		setVector: function (xComponent, yComponent) {
			this.xComp = xComponent;
			this.yComp = yComponent;
		},
		setPosition: function (x, y) {
			this.locationX = x;
			this.locationY = y;
		},
		draw: function() {
			this.asteroidElement.x = this.locationX - this.type.rad;
			this.asteroidElement.y = this.locationY - this.type.rad;
		}
	};
	
	
	var me = this,
		asteroids = [];

	var generateRandomVector = function(a) {
		// X can be negative or positive in the range of -4 to 4 (may be a bug here)
		// y can only be positive and must be greater than 1, range of 3 to 7
		a.setVector(Math.ceil((Math.random() * 150 * 2) - 150), Math.ceil(((Math.random() + .001) / 1.001) * 150) + ASTEROID_Y_COMPONENT);
	};
	
	// sets the asteroid at the starting point, also generating a random vector.
	var resetAsteroid = function(a) {
		// keep asteroid in X bounds, start at just outside viewable window.
		a.setPosition(Math.ceil((Math.random() * (gameX - 40)) + 20), -50);
		generateRandomVector(a); // generate a new vector
	};
	
	me.init = function(layer) {
		var i = 0,
			newAsteroid;
		
		// select number of asteroids, 
		for (i = 0; i < NUM_ASTEROIDS; i++) {
			// pick a random start position and vector for all of them
			newAsteroid = new asteroid(layer);
			resetAsteroid(newAsteroid); 
			asteroids.push(newAsteroid);
		}
	};

	me.update = function(gameState) {
		$.each(asteroids, function(index, value) {
			value.calcNewPosition(gameState.elapsedTime);
			
			// need a little bit of extra room for the graphic at edges, else user sees asteroid being reset and disappearing.
			if (value.locationX > gameX + 50 || value.locationX < -50 || value.locationY > gameY + 50) {
				resetAsteroid(value);
				// Every time we reset an asteroid, speed them up!!!
				if (ASTEROID_Y_COMPONENT < ASTEROID_Y_COMPONENT_MAX) {
					ASTEROID_Y_COMPONENT += ASTEROID_Y_COMPONENT_STEP;	
				}
				
				// decrease the acceleration amount every time we reset... this falls down pretty fast actually, not the best but w/e
				if (Math.floor(ASTEROID_Y_COMPONENT) % 100 === 0 && ASTEROID_Y_COMPONENT_STEP > 2) {
					ASTEROID_Y_COMPONENT_STEP--;
				}
			}
		});
	};
	
	
	me.draw = function(state) {
		$.each(asteroids, function(index, value) {
			value.draw();
		});
	};
	
	/**
	 * 
	 */
	me.checkCollisions = function(visitor) {
		var collisions = [];
		
		$.each(asteroids, function(index, value){ 
			if (value.checkCollision(visitor)) {
				resetAsteroid(value);
				collisions.push(value.type.size);
			}
		});
		
		return collisions;	
	};
	
	return me;
};
