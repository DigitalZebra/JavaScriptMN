

var gameWindow = function(gameX, gameY) {
	
	var me = this;
	
	me.init = function(svg) {
		
		$()
			.add(svg.text(null, 20, 40, "SHIELD:"))
			.add(svg.text(null, 100, 40, "100%"))
			.attr({
				"font-family": "Arial", fill: "#0f0", opacity: .7,
				"font-weight": "600"
		});
		
			
		
//		spaceshipCanvasObj = doodle.createImage("img/spaceship.png");
//		spaceshipCanvasObj.height = SHIP_OFFSET * 2;
//		spaceshipCanvasObj.width = SHIP_OFFSET * 2;
//		spaceshipCanvasObj.x = locationX - 20;
//		spaceshipCanvasObj.y = locationY - 20;
//		//spaceshipCanvasObj.transform = doodle.geom.createMatrix(1, 0, 0, 1, 0,0).translate(-20, -20);
//		canvasLayer.addChild(spaceshipCanvasObj);
//		//spaceshipDomObj = svg.image(null, locationX, locationY, SHIP_OFFSET * 2, SHIP_OFFSET * 2, "img/spaceship.png", {transform: "translate(-"+ SHIP_OFFSET + ",-"+ SHIP_OFFSET + ")"}); // the transform puts location x and y in the middle of the ship graphic.
//		//spaceshipDomObj = $(spaceshipDomObj);
	};

	me.update = function(gameState) {
		
//		if (gameState.keys.UP) {
//			locationY -= calcMovementStep(gameState.elapsedTime, SPEED_Y);
//		}
//		if (gameState.keys.DOWN) {
//			locationY += calcMovementStep(gameState.elapsedTime, SPEED_Y);
//		}
//		if (gameState.keys.LEFT) {
//			locationX -= calcMovementStep(gameState.elapsedTime, SPEED_X);
//		}
//		if (gameState.keys.RIGHT) {
//			locationX += calcMovementStep(gameState.elapsedTime, SPEED_X);
//		}
//		
//		// bounds checking... make sure ship doesn't fly out of visible area or allowed area.
//		if (locationX > gameX - SHIP_OFFSET) { locationX = gameX - SHIP_OFFSET; }
//		else if (locationX < SHIP_OFFSET) { locationX = SHIP_OFFSET; }
//		if (locationY < Y_BOUNDRY) { locationY = Y_BOUNDRY + 1; }
//		else if (locationY > gameY - SHIP_OFFSET) { locationY = gameY - SHIP_OFFSET; }
	};
	
	
	me.draw = function(state) {
//		spaceshipCanvasObj.x = locationX - 20;
//		spaceshipCanvasObj.y = locationY- 20;
		//spaceshipDomObj.attr("x", locationX);
		//spaceshipDomObj.attr("y", locationY);
	};
	
	return me;
};