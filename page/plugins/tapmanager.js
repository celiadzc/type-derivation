svgManoeuvre.plugins.tapManager = {
	init: function (callbacks) {
		svgManoeuvre.gestureHandlers.tap = this.tapHandler;
		
		
		if(!callbacks['DEFAULT']) {
			callbacks['DEFAULT'] = this.TAP_DEFAULT;
		}
		if(!callbacks['FIRST']) {
			callbacks['FIRST'] = this.TAP_FIRST;
		}
		if(!callbacks['FINALLY']) {
			callbacks['FINALLY'] = this.TAP_FINALLY;
		}
		
		this.callbacks = callbacks;
	},
	tapHandler: function (evt) {
		var id = evt.target.id || 'DEFAULT'; //get id of element
		var callbacks = svgManoeuvre.plugins.tapManager.callbacks 
		var callback = callbacks[id] || callbacks['DEFAULT']; //check for call back or again run DEFAUT
		callbacks['FIRST'](evt);
		callback(evt);
		callbacks['FINALLY'](evt);
		//console.log(Object.keys(evt.target)); SUPER USEFUL LINE REMEMBER
	},
	TAP_DEFAULT: function (evt) {},
	TAP_FIRST: function (evt) {},
	TAP_FINALLY: function (evt) {}
};