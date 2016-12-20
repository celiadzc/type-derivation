svgManoeuvre.plugins.mouseWheel = {
	EventUtil: {
		addHandler: function (element, type, handler) {
			if (element.addEventListener) {
					element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
					element.attachEvent("on" + type, handler);
			} else {
					element["on" + type] = handler;
			}
		},
		getEvent: function(event) {
			return event ? event : window.event;
		},
		getWheelDelta: function (event) {
			if (event.wheelDelta) {
				return event.wheelDelta;
			} else {
				return -event.detail * 40;
			}
		}
	},
	handleMouseWheel: function (evt) {
		var self = svgManoeuvre.plugins.mouseWheel;
		evt = self.EventUtil.getEvent(evt);
		var delta = self.EventUtil.getWheelDelta(evt);
		var k = Math.pow(2,delta/720);
		svgManoeuvre.startMatrix = svgManoeuvre.transMatrix.slice(0);
		svgManoeuvre.zoomPage(k, evt.pageX, evt.pageY);
	},
	initMouseWheel: function () {
		var self = svgManoeuvre.plugins.mouseWheel;
		self.EventUtil.addHandler(document, "mousewheel", this.handleMouseWheel);
		self.EventUtil.addHandler(document, "DOMMouseScroll", this.handleMouseWheel);

	}
};


