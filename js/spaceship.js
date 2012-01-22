

var spaceship = function(gameX, gameY) {
	
	var me = this,
		locationX = Math.ceil(gameX / 2), // put starship in middle.
		locationY = Math.ceil(gameY * .9), // put starship in bottom 10th of space.
		SPEED_Y = 5,
		SPEED_X = 5,
		spaceshipDomObj = null,
		SHIP_OFFSET = 20, // for padding the ship, depends on size of ship graphic... also assumes graphic if square :)
		Y_BOUNDRY = Math.ceil(gameY * .5) + SHIP_OFFSET - 1;
	
	me.init = function(svg) {
		spaceshipDomObj = svg.image(null, locationX, locationY, SHIP_OFFSET * 2, SHIP_OFFSET * 2, "img/spaceship.png", {transform: "translate(-"+ SHIP_OFFSET + ",-"+ SHIP_OFFSET + ")"}); // the transform puts location x and y in the middle of the ship graphic.
		spaceshipDomObj = $(spaceshipDomObj);
	};

	me.update = function(gameState) {
		
		if (gameState.keys.UP) {
			locationY -= SPEED_Y;
		}
		if (gameState.keys.DOWN) {
			locationY += SPEED_Y;
		}
		if (gameState.keys.LEFT) {
			locationX -= SPEED_X;
		}
		if (gameState.keys.RIGHT) {
			locationX += SPEED_X;
		}
		
		// bounds checking... make sure ship doesn't fly out of visible area or allowed area.
		if (locationX > gameX - SHIP_OFFSET) { locationX = gameX - SHIP_OFFSET; }
		else if (locationX < SHIP_OFFSET) { locationX = SHIP_OFFSET; }
		if (locationY < Y_BOUNDRY) { locationY = Y_BOUNDRY + 1; }
		else if (locationY > gameY - SHIP_OFFSET) { locationY = gameY - SHIP_OFFSET; }
	};
	
	
	me.draw = function(state) {
		spaceshipDomObj.attr("x", locationX);
		spaceshipDomObj.attr("y", locationY);
	};
	
	return me;
};