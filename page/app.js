//Separte files for menu behaviour
//separate files for double input fields
// optional background frame group. show only this frame to speed up transforms
//consider hammer scroll as plugin to hammer not svgManoeuvre


// Hammer.plugins.fakeMultitouch();
//Hammer.plugins.showTouches();

var swishlyFunctions = {
	station: {
		hold: function (data) {
			console.log('Station hold function ' + data);
			//should return title for main and directions
			return {title: data, up: 'Live Departures', down: 'Station Info', left: 'Depart from', right: 'Arrive at'}
		},
		left: function (data) {
			alert('Station left function ' + data);
		},
		up: function (data) {
			alert('Station up function ' + data);
		},
		down: function (data) {
			alert('Station down function ' + data);
		},
		right: function (data) {
			alert('Station right function ' + data);
		}
	},
	line: {
		hold: function (data) {
			//console.log('Line hold function ' + data);
			return {title: data}
		}
	}

};

var tapFunctions = {
	id: function (evt) {},
	'home-button': function (evt) {
		svgManoeuvre.showAll();
	},
	'goTo-button': function (evt) {
		svgManoeuvre.goTo(1200, 200, 5);
	},
	'pan-button': function (evt) {
		svgManoeuvre.startMatrix = svgManoeuvre.transMatrix.slice(0);
		svgManoeuvre.pan(10, 100);
	},
	'zoom-button': function (evt) {
		svgManoeuvre.startMatrix = svgManoeuvre.transMatrix.slice(0);
		//console.log(svgManoeuvre.getViewbox())
		var box = svgManoeuvre.getViewbox();
		svgManoeuvre.zoomSVG(1.25, box[2]/2, box[3]/2);
	},
	DEFAULT: function (evt) {
		console.log('Default tap response');
	},
	FIRST: function (evt) {
		console.log('always print this');
	}

};

svgManoeuvre.plugins.tapManager.init(tapFunctions);
svgManoeuvre.plugins.swishLoad.init(swishlyFunctions);

svgManoeuvre.init("manoeuvrable-svg");
svgManoeuvre.plugins.mouseWheel.initMouseWheel();
