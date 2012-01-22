game = function(svgContainerId) {
	
	var me = this,
		gameSizeX = 700,
		gameSizeY = 500,
		privates = {};
	
	// private method.  pauses the game.
	privates.pauseMe = function() {
		privates.running = false;
		privates.gLoop.pause();
	};
	
	// private method.  Starts the game.
	privates.startMe = function() {
		privates.running = true;
		privates.gLoop.start();
	};
	
	// put the game loop object in the privates container.
	privates.gLoop = new gameLoop(
		{
			state: {
				spaceshipObj: null,
				cId: svgContainerId,
				asteroidManager: null
			},
			
			init: function() {
				
				this.spaceshipObj = new spaceship(gameSizeX, gameSizeY);
				this.asteroidManager = new asteroidManager(gameSizeX, gameSizeY);
				
				var spaceShipClosure = this.spaceshipObj,
					asteroidManagerClosure = this.asteroidManager; // create a closure because onLoad isn't called with the same state.
				
				privates.running = true;
				
				// setup main SVG container.
				$("#" + svgContainerId).svg({
					onLoad: function(s) {
						spaceShipClosure.init(s);
						asteroidManagerClosure.init(s);
					},
					settings: {
						id: "foo",
						width: gameSizeX,
						height: gameSizeY,
						style: "background: black;"
					}
				});
				
				// Add pause button.
				$("<button>" + (privates.running ? "Pause" : "Start") + "</button>").appendTo("#" + svgContainerId).click(function(e) {
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
			},
			
			// draw!
			draw: function(state) {
				this.spaceshipObj.draw(state);
				this.asteroidManager.draw(state);
			}
		});

	// begin main game loop.
	privates.gLoop.begin();
	
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


/****  Game loop!  sweet stuff. ****/
gameLoop = function(obj) {
	
	var me = {},
		loopId = null;
	
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
		keys: keys	
	};
	
	var processKeyCode = function(code, up) {		
		if (!up) {
			keys[keyMap[code]] = true;
		}
		else {
			keys[keyMap[code]] = false;
		}
	};
	
	var looper = function() {
		obj.update.call(obj.state, gameState);
		obj.draw.call(obj.state, gameState);
	};
	
	// Begin the game, wire up event handlers.
	me.begin = function() {
		
		obj.init.call(obj.state);
		
		// wire up key events.
		$(window).keydown(function(e) {
			processKeyCode(e.keyCode, false);
		})
		.keyup(function(e) {
			processKeyCode(e.keyCode, true);
		});
		
		// begin looping.
		me.start();
		
		return me;
	};
	
	me.pause = function() {
		window.clearInterval(loopId);
	};
	
	me.start = function() {
		loopId = window.setInterval(looper, 30);
	};
	
	return me;
};