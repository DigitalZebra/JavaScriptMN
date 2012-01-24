

var spaceship = function(gameX, gameY) {
	
	var me = this,
		locationX = Math.ceil(gameX / 2), // put starship in middle.
		locationY = Math.ceil(gameY * .9), // put starship in bottom 10th of space.
		SPEED_Y = 250,
		SPEED_X = 300,
		spaceshipDomObj = null,
		spaceshipCanvasObj = null,
		SHIP_OFFSET = 20, // for padding the ship, depends on size of ship graphic... also assumes graphic if square :)
		Y_BOUNDRY = Math.ceil(gameY * .5) + SHIP_OFFSET - 1,
		boundingBox = null;
	
	
	asCircleCollidableObject.call(this);
	
	var calcMovementStep = function(elapsedMs, speed) {
		return Math.ceil(elapsedMs / 1000 * speed);
	};
	
	me.init = function(canvasLayer) {
		
		this.radius = SHIP_OFFSET;
		
		spaceshipCanvasObj = doodle.createImage("img/spaceship.png");
		spaceshipCanvasObj.height = SHIP_OFFSET * 2;
		spaceshipCanvasObj.width = SHIP_OFFSET * 2;
		spaceshipCanvasObj.x = locationX - 20;
		spaceshipCanvasObj.y = locationY - 20;
		
		// bounding box drawing code
//		boundingBox = doodle.createSprite();
//		
//		boundingBox.graphics.lineStyle(3, "#ff0000", 1);
//		boundingBox.graphics.circle(0, 0, SHIP_OFFSET);
//		boundingBox.graphics.stroke();
		
		//spaceshipCanvasObj.transform = doodle.geom.createMatrix(1, 0, 0, 1, 0,0).translate(-20, -20);
		//canvasLayer.addChild(boundingBox);
		canvasLayer.addChild(spaceshipCanvasObj);
		//spaceshipDomObj = svg.image(null, locationX, locationY, SHIP_OFFSET * 2, SHIP_OFFSET * 2, "img/spaceship.png", {transform: "translate(-"+ SHIP_OFFSET + ",-"+ SHIP_OFFSET + ")"}); // the transform puts location x and y in the middle of the ship graphic.
		//spaceshipDomObj = $(spaceshipDomObj);
	};

	me.update = function(gameState) {
		
		if (gameState.keys.UP) {
			locationY -= calcMovementStep(gameState.elapsedTime, SPEED_Y);
		}
		if (gameState.keys.DOWN) {
			locationY += calcMovementStep(gameState.elapsedTime, SPEED_Y);
		}
		if (gameState.keys.LEFT) {
			locationX -= calcMovementStep(gameState.elapsedTime, SPEED_X);
		}
		if (gameState.keys.RIGHT) {
			locationX += calcMovementStep(gameState.elapsedTime, SPEED_X);
		}
		
		// bounds checking... make sure ship doesn't fly out of visible area or allowed area.
		if (locationX > gameX - SHIP_OFFSET) { locationX = gameX - SHIP_OFFSET; }
		else if (locationX < SHIP_OFFSET) { locationX = SHIP_OFFSET; }
		if (locationY < Y_BOUNDRY) { locationY = Y_BOUNDRY + 1; }
		else if (locationY > gameY - SHIP_OFFSET) { locationY = gameY - SHIP_OFFSET; }
		
		this.locationX = locationX;
		this.locationY = locationY;
	};
	
	
	me.draw = function(state) {
		spaceshipCanvasObj.x = locationX - 20;
		spaceshipCanvasObj.y = locationY - 20;
//		boundingBox.x = locationX;
//		boundingBox.y = locationY;
		//spaceshipDomObj.attr("x", locationX);
		//spaceshipDomObj.attr("y", locationY);
	};
	
	return me;
};