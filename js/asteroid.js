

var asteroidManager = function(gameX, gameY) {
	
	var asteroidTypes = [{path: "img/asteroidSmall.png", rad: 10},
	                   {path: "img/asteroidMed.png", rad: 20},
	                   {path: "img/asteroidMedBig.png", rad: 30},
	                   {path: "img/asteroidHuge.png", rad: 50}];
	
	var asteroid = function(svg) {
		var type = asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];
		
		this.domElement = $(svg.image(null, this.x, this.y, type.rad * 2, type.rad * 2, type.path, {transform: "translate(-20, -20)"})); // the transform puts location x and y in the middle of the asteroid.
	};
	
	// dunno what should go in proto yet.
	asteroid.prototype = {
		calcNewPosition: function() {
			this.x += this.xComp;
			this.y += this.yComp;
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
			this.domElement.attr("x", this.x);
			this.domElement.attr("y", this.y);
		}
	};
	
	
	var me = this,
		locationX = Math.ceil(gameX / 2), // put starship in middle.
		locationY = Math.ceil(gameY * .9), // put starship in bottom 10th of space.
		SPEED_Y = 4,
		SPEED_X = 5,
		spaceshipDomObj = null,
		SHIP_OFFSET = 20, // for padding the ship, depends on size of ship graphic... also assumes graphic if square :)
		Y_BOUNDRY = Math.ceil(gameY * .5) + SHIP_OFFSET - 1,
		asteroids = [];
	
	var generateRandomVector = function(a) {
		// X can be negative or positive in the range of -4 to 4 (may be a bug here)
		// y can only be positive and must be greater than 1, range of 3 to 7
		a.setVector(Math.ceil((Math.random() * 3 * 2) - 3), Math.ceil(((Math.random() + .001) / 1.001) * 5) + 2);
	};
	
	// sets the asteroid at the starting point, also generating a random vector.
	var resetAsteroid = function(a) {
		a.setPosition(Math.ceil((Math.random() * (gameX - 40)) + 20), -50);
		generateRandomVector(a); // generate a new vector
	};
	
	me.init = function(svg) {
		var i = 0,
			newAsteroid;
		
		// select number of asteroids, 
		for (i = 0; i < 12; i++) {
			
			// pick a random start position and vector for all of them
			// keep asteroid in X bounds, start at just outside viewable window.
			newAsteroid = new asteroid(svg);
			resetAsteroid(newAsteroid); 
			
			
			asteroids.push(newAsteroid);
		}
	};

	me.update = function(gameState) {
		$.each(asteroids, function(index, value) {
			value.calcNewPosition();
			
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
