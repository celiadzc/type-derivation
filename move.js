var svgManoeuvre = {
	transMatrix: [1,0,0,1,0,0],
	startMatrix: [1,0,0,1,0,0],
	MIN_EVENT_DELAY: 120, // time in ms limits rerendering of screen
	MAX_ZOOM: 8,
	MIN_ZOOM: 1,
	svgMove: false,
	plugins: {},
	//set viewbox to whole area
	//set home transform to initial area
	//set home transform as initial matrix
	// Need to add max zooms max pans etc
	init: function (transformGroupId) {
		this.transformGroup = document.getElementById(transformGroupId);
		this.svgElement = this.transformGroup.ownerSVGElement;
		this.hammertime = Hammer(document).on(svgManoeuvre.getGestureTypes().join(' '), this.gestureHandler);
		console.log('SVG Manoeuvre loaded with gestures - ' + svgManoeuvre.getGestureTypes().join(', '));
	},
	gestureHandler: function (evt) {
		evt.gesture.preventDefault();
		svgManoeuvre.gestureHandlers[evt.type](evt);
	},
	gestureHandlers: {
		touch: function (evt) {
			svgManoeuvre.startMove(evt);
		},
		release: function (evt) {
			svgManoeuvre.svgMove = false;
		},
		drag: function (evt) {
			if (evt.gesture.timeStamp - svgManoeuvre.lastEvent > svgManoeuvre.MIN_EVENT_DELAY && (svgManoeuvre.svgMove)) {
				svgManoeuvre.lastEvent = evt.gesture.timeStamp;
				svgManoeuvre.dragIt(evt);
			}
		},
		dragstart: function (evt) {
			svgManoeuvre.startMove(evt);
		},
		doubletap: function (evt) {
			if (svgManoeuvre.isDescendant(svgManoeuvre.svgElement, evt.target)) {
				svgManoeuvre.zoomPage(1.25, evt.gesture.center.pageX, evt.gesture.center.pageY);
				svgManoeuvre.startMatrix = svgManoeuvre.transMatrix.slice(0);
			}
		},
		transformstart: function (evt) {
			svgManoeuvre.startMove(evt);
		},
		pinch: function (evt) {
			if (evt.gesture.timeStamp - svgManoeuvre.lastEvent > svgManoeuvre.MIN_EVENT_DELAY && (svgManoeuvre.svgMove)) {
				svgManoeuvre.zoomPage(evt.gesture.scale, evt.gesture.center.pageX, evt.gesture.center.pageY);
				svgManoeuvre.lastEvent = evt.gesture.timeStamp;
			}
		},
	},
	getGestureTypes : function () {
		return Object.keys(svgManoeuvre.gestureHandlers);
	},
	showAll: function () {
		this.setMatrix([1,0,0,1,0,0]);
	},
	goTo: function (x, y, scale) {
		this.setMatrix(svgManoeuvre.zoomMatrix([1,0,0,1,0,0], scale, x, y));
	},
	startMove: function (evt) {
		svgManoeuvre.startMatrix = svgManoeuvre.transMatrix.slice(0);
		svgManoeuvre.scale = svgManoeuvre.getScale();
		svgManoeuvre.lastEvent = evt.gesture.timeStamp;
		svgManoeuvre.svgMove = svgManoeuvre.isDescendant(svgManoeuvre.svgElement, evt.target);
	},
	dragIt: function (evt) {
		var dx = evt.gesture.deltaX;
		var dy = evt.gesture.deltaY;
		var scale = svgManoeuvre.scale;
		this.pan(scale*dx, scale*dy);
	},
	pan: function (dx, dy) {
		// Hammer dx and dy properties are related to position at gesture start, therefore must always refer to matrix at start of gesture.
		var newMatrix = this.startMatrix.slice(0);
		this.setMatrix(svgManoeuvre.panMatrix(newMatrix, dx, dy));
	},
	panMatrix: function (matrix, dx, dy) {
		matrix[4] += dx;
		matrix[5] += dy;
		return matrix;
	},
	zoomPage: function (scale, pageX, pageY) {
		var currentZoom = svgManoeuvre.transMatrix[0]
		scale = (currentZoom*scale <= svgManoeuvre.MAX_ZOOM) ? scale : 1;//svgManoeuvre.MAX_ZOOM/currentZoom;
		scale = (currentZoom*scale >= svgManoeuvre.MIN_ZOOM) ? scale : 1;//svgManoeuvre.MIN_ZOOM/currentZoom;
		if (scale != 1) {
			var zoomAt = svgManoeuvre.getViewboxCoords(pageX, pageY);
			svgManoeuvre.zoomSVG(scale, zoomAt.x, zoomAt.y);
		}
	},
	zoomSVG: function (scale, svgX, svgY) {
		var newMatrix = this.startMatrix.slice(0);
		this.setMatrix(svgManoeuvre.zoomMatrix(newMatrix, scale, svgX, svgY));
	},
	zoomMatrix: function (matrix, scale, X, Y) {
		for (var i=0; i < 6; i++) { 
			matrix[i] *= scale;
		}
		matrix[4] += (1-scale)*X;
		matrix[5] += (1-scale)*Y;
		return matrix;
	},
	getViewboxCoords: function (pageX, pageY) {
		var point = this.svgElement.createSVGPoint();
		point.x = pageX;
		point.y = pageY;
		return svgManoeuvre.coordinateTransform(point, svgManoeuvre.svgElement);
	},
	coordinateTransform: function(screenPoint, someSvgObject) {
		var CTM = someSvgObject.getScreenCTM();
		return screenPoint.matrixTransform( CTM.inverse() );
	},
	getScale: function () {
		return this.svgElement.getScreenCTM().inverse().a;
	},
	isDescendant: function (parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
			}
		return false;
	},
	getViewbox: function (svgElement) {
		return this.svgElement.getAttribute('viewBox').split(' ');
	},
	setMatrix: function (updateMatrix) {
	//Sets transform matrix of group denoted as transform group
		if (updateMatrix.length === 6) {
			strMatrix = "matrix(" +  updateMatrix.join(' ') + ")";
			this.transformGroup.setAttributeNS(null, "transform", strMatrix);
			this.transMatrix = updateMatrix.slice(0); //Slice to keep transMatrix as copy
		}
	}
	
};
