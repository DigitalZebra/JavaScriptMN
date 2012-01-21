game = function(svgContainerId) {
	
	var me = this;
	var spaceship = null;
	

	
	$("#" + svgContainerId).svg({
		onLoad: function(s) {
			spaceship = s.image(null, 50, 60, 50, 40, "img/spaceship.png");
			spaceship = $(spaceship);
		},
		settings: {
			id: "foo",
			width: 500,
			height: 400,
			style: "background: green;"
		}
	});

	
	var gLoop = new gameLoop(
		{
			state: {
				spaceshipObj: spaceship,
				cId: svgContainerId,
				spaceshipX: parseInt(spaceship.attr("x")),
				spaceshipY: parseInt(spaceship.attr("y"))
			},
			update: function(keys) {
				var speed = 2;
				
				if (keys.UP) {
					this.spaceshipY -= speed;
				}
				
				if (keys.DOWN) {
					this.spaceshipY += speed;
				}
				
				if (keys.LEFT) {
					this.spaceshipX -= speed;
				}
				
				if (keys.RIGHT) {
					this.spaceshipX += speed;
				}
			},
			draw: function(keys) {
				this.spaceshipObj.attr("x", this.spaceshipX);
				this.spaceshipObj.attr("y", this.spaceshipY);
			}
		});
	
	gLoop.begin();
	
	
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
	
	var processKeyCode = function(code, up) {		
		if (!up) {
			keys[keyMap[code]] = true;
		}
		else {
			keys[keyMap[code]] = false;
		}
	};
	
	var looper = function() {
		obj.update.call(obj.state, keys);
		obj.draw.call(obj.state, keys);
	};
	
	me.begin = function() {
		
		// wire up key events.
		$(window).keydown(function(e) {
			processKeyCode(e.keyCode, false);
		})
		.keyup(function(e) {
			processKeyCode(e.keyCode, true);
		});
		
		
		window.setInterval(looper, 23);
		return me;
	};
	
	return me;
};