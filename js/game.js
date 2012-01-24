game = function(containerId) {
	
	var me = this,
		gameSizeX = 700,
		gameSizeY = 600,
		privates = {},
		canvasDisplay,
		
		ASTEROID_SIZE_TO_SHIELD_DMG = {
			huge: 19,
			big: 11,
			med: 8,
			small: 5
		};
	
	// private method.  pauses the game.
	privates.pauseMe = function() {
		privates.running = false;
		privates.gLoop.pause();
	};
	
	// private method.  Starts the game.
	privates.startMe = function() {
		privates.running = true;
		privates.gLoop.resume();
	};
	
	// put the game loop object in the privates container.
	privates.gLoop = new gameLoop(
		{
			state: {
				spaceshipObj: null,
				cId: containerId,
				asteroidManager: null,
				gameWindow: null,
				remainingShield: 100
			},
			
			init: function() {
				
				this.spaceshipObj = new spaceship(gameSizeX, gameSizeY);
				this.asteroidManager = new asteroidManager(gameSizeX, gameSizeY);
				this.gameWindow = new gameWindow(gameSizeX, gameSizeY);
				
				// init the shield
				this.gameWindow.setShield(this.remainingShield);
				
				var spaceShipClosure = this.spaceshipObj,
					asteroidManagerClosure = this.asteroidManager,
					gameWindowClosure = this.gameWindow; // create a closure because onLoad isn't called with the same state.
				
				privates.running = true;
				
				var svgContainer = $('<div id="svgContainer"></div>').appendTo("#" + containerId).svg({
					onLoad: function(s) {
						gameWindowClosure.init(s);
					},
					settings: {
						id: "foo",
						width: gameSizeX,
						height: gameSizeY,
						style: "position: absolute; z-index: 5;"
					}
				});
				
				var canvasContainer = $('<div id="canvContainer" style="z-index: 2; position: absolute; "></div>').appendTo("#" + containerId);//.appendTo("#" + containerId);
				
				canvasDisplay = doodle.createDisplay("canvContainer", { width:  gameSizeX, height: gameSizeY, style: "z-index: 1;" });
				
				canvasContainer.show();
				
				var layer = canvasDisplay.createLayer();
				
				// draw background!
				var background = doodle.createSprite();
				background.graphics.beginFill("#000000");
				background.graphics.rect(0, 0, gameSizeX, gameSizeY);
				background.graphics.endFill();
				
				layer.addChild(background);
				
				spaceShipClosure.init(layer);
				asteroidManagerClosure.init(layer);
				
				// Add pause button.
				$("<button>" + (privates.running ? "Pause" : "Start") + "</button>").appendTo("#" + containerId).click(function(e) {
					if (privates.running) {
						privates.pauseMe();
						$(this).html("Start");
					}
					else {
						privates.startMe();
						$(this).html("Pause");
					}
				});
			},
			
			// updates
			update: function(state) {
				this.spaceshipObj.update(state);
				this.asteroidManager.update(state);
				this.gameWindow.update(state);
				
				var collisions = this.asteroidManager.checkCollisions(this.spaceshipObj.createCollisionVisitor()),
					clos = this;
				
				if (collisions.length > 0) {
					
					$.each(collisions, function(index, value) {
						clos.remainingShield = clos.remainingShield - ASTEROID_SIZE_TO_SHIELD_DMG[value];
					});
					
					if (this.remainingShield <= 0) {
						alert("Game over!");
						privates.pauseMe();
					}
					else {
						this.gameWindow.setShield(this.remainingShield);
					}
				}
			},
			
			// draw!
			draw: function(state) {
				this.spaceshipObj.draw(state);
				this.asteroidManager.draw(state);
				this.gameWindow.draw(state);
			}
		});

	// begin main game loop.
	privates.gLoop.init();
	
	canvasDisplay.addListener(doodle.events.Event.ENTER_FRAME, privates.gLoop.looper);
	
	me.doStuff = function() {
		alert(this.helloWorld);
	};
	
	return me;
};


game.prototype = {
	init: function() {
		this.helloWorld = "cheese";
	}
};


gameLoop = function(obj) {
	var me = {};
	var keys = {
		UP: false,
		DOWN: false,
		LEFT: false,
		RIGHT: false
	};

	var keyMap = [];
	keyMap[38] = "UP";
	keyMap[37] = "LEFT";
	keyMap[40] = "DOWN";
	keyMap[39] = "RIGHT";
	
	var gameState = {
		keys: keys,
		elapsedTime: null
	};
	
	var lastFrameTime = null,
		running = true;
	
	var processKeyCode = function(code, up) {		
		if (!up) {
			keys[keyMap[code]] = true;
		}
		else {
			keys[keyMap[code]] = false;
		}
	};
	
	
	me.looper = function() {
		if (running) {
			var now = new Date();
			
			gameState.elapsedTime = now - lastFrameTime;
			
			obj.update.call(obj.state, gameState);
			obj.draw.call(obj.state, gameState);
			
			lastFrameTime = now;
		}
	};
	
	me.resume = function() {
		lastFrameTime = new Date(); // reset frametime.
		running = true;
	};
	
	me.pause = function() {
		running = false;
	};
	
	me.init = function() {
		
		obj.init.call(obj.state);
		
		// wire up key events.
		$(window).keydown(function(e) {
			processKeyCode(e.keyCode, false);
		})
		.keyup(function(e) {
			processKeyCode(e.keyCode, true);
		});
		
		lastFrameTime = new Date();
		
		// begin looping.
		//me.start();
		
		return me;
	};
	
	
	return me;
	
	
};




/****  Game loop!  ****/
// Game loop v1...
//gameLoop = function(obj) {
//	
//	var me = {},
//		loopId = null;
//	
//	var keys = {
//		UP: false,
//		DOWN: false,
//		LEFT: false,
//		RIGHT: false
//	};
//	
//	var keyMap = [];
//	keyMap[38] = "UP";
//	keyMap[37] = "LEFT";
//	keyMap[40] = "DOWN";
//	keyMap[39] = "RIGHT";
//	
//	var gameState = {
//		keys: keys,
//		elapsedTime: null
//	};
//	
//	var lastFrameTime = null;
//	
//	var processKeyCode = function(code, up) {		
//		if (!up) {
//			keys[keyMap[code]] = true;
//		}
//		else {
//			keys[keyMap[code]] = false;
//		}
//	};
//	
//	var looper = function() {
//		var now = new Date();
//		
//		gameState.elapsedTime = now - lastFrameTime;
//		
//		obj.update.call(obj.state, gameState);
//		obj.draw.call(obj.state, gameState);
//		
//		lastFrameTime = now;
//	};
//	
//	// Begin the game, wire up event handlers.
//	me.begin = function() {
//		
//		obj.init.call(obj.state);
//		
//		// wire up key events.
//		$(window).keydown(function(e) {
//			processKeyCode(e.keyCode, false);
//		})
//		.keyup(function(e) {
//			processKeyCode(e.keyCode, true);
//		});
//		
//		lastFrameTime = new Date();
//		
//		// begin looping.
//		me.start();
//		
//		return me;
//	};
//	
//	me.pause = function() {
//		window.clearInterval(loopId);
//	};
//	
//	me.start = function() {
//		loopId = window.setInterval(looper, 30);
//	};
//	
//	return me;
//};