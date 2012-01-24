


/****
 * This stuff is basically the visitor pattern, though it looks sort of strange in javascript.
 * 
 * Here is the interface:
 * interface collidableObject {
 * 		checkCollision(colliderVisitor);
 * 		createCollisionVisitor(); // this is bad, circular references galore
 * };
 */


var asCircleCollidableObject = function() {
	this.checkCollision = function(visitor) {
		return visitor.isCollisionCircle(this.locationX, this.locationY, this.radius);
	}
	
	// omg circular references!  THis is b/c we want to make it super nice for the client (ie the game)... they don't need to pick a visitor.
	// try to find a better way to do this.
	this.createCollisionVisitor = function() {
		return new circleCollider(this.locationX, this.locationY, this.radius);
	};
};

var asSquareCollidableObject = function() {
	this.checkCollision = function(visitor) {
		return visitor.isCollisionSquare(this.locationX, this.locationY, this.width, this.length);
	}
	
	// omg circular references!  THis is b/c we want to make it super nice for the client (ie the game)... they don't need to pick a visitor.
	// try to find a better way to do this.
	this.createCollisionVisitor = function() {
		return new rectCollider(this.locationX, this.locationY, this.width, this.length);
	};
};


/*****
 * Here is the interface: 
 * interface colliderVisitor {
 * 		bool isCollisionSquare(x, y, width, length);
 * 		bool isCollisionCircle(x, y, radius);
 * }
 */

var circleCollider = function(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
};

circleCollider.prototype = {
	isCollisionSquare: function(sX, sY, w, l) {
		return false;
	},
	isCollisionCircle: function(cX, cY, r) {
		var val = Math.sqrt(Math.pow(cX - this.x, 2) + Math.pow(cY - this.y, 2));
		
		if (val < this.radius + r) {
			return true;
		}
		
		return false;
	}
}

var rectCollider = function(x, y, width, length) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.length = length;
};

rectCollider.prototype = {
	isCollisionSquare: function(squareX, squareY, w, l) {
		return false;
	},
	isCollisionCircle: function(cX, cY, r) {
		return false;
	}
};