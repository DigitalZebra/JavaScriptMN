

var gameWindow = function(gameX, gameY) {
	
	var me = this,
		shieldText = null,
		currShieldValue = 0,
		prevShieldValue = 0;
	
	me.init = function(svg) {
		shieldText = svg.text(null, 126, 40, "100%");
		
		$()
			.add(svg.text(null, 20, 40, "SHIELD (%) :"))
			.add(shieldText)
			.attr({
				"font-family": "Arial", fill: "#0f0", opacity: .7,
				"font-weight": "600"
		});
	};

	me.update = function(gameState) {
		// nothing fer now!
	};
	
	
	me.draw = function(state) {
		// if not true, a draw was queued up
		if (prevShieldValue != currShieldValue) {
			$(shieldText).html(currShieldValue);
			
			// set this so that we don't process it again.
			prevShieldValue = currShieldValue;
		}
	};
	
	me.setShield = function(shield) {
		// by setting this, we queue up a draw.
		prevShieldValue = currShieldValue;
		currShieldValue = shield;
	};
	
	return me;
};