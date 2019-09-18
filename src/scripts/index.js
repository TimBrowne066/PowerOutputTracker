
var json = require("./workout-data.json");
var samples = json.samples;
var coordinates = [];
var totalPowerReadings = [];
var twentyMinuteReadings = [];
var twentyCoordinates = [];
var fifteenMinuteReadings = [];
var fifteenCoordinates = [];
var tenMinuteReadings = [];
var tenCoordinates = [];
var fiveMinuteReadings = [];
var fiveCoordinates = [];
var oneMinuteReadings = [];
var oneCoordinates = [];
var totalLine;
var twentyLine;
var fifteenLine;
var tenLine;
var fiveLine;
var oneLine;


//Push GPS coordinates from raw data into coordinates array to be mapped and graphed
function getPathCoordinates(){
	samples.forEach(function(sample){
		if(sample.values.positionLat && sample.values.positionLong){
			coordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
			totalPowerReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
		}
	});
}

//Algorithm to calculate average power by specified range in minutes and push coordinates into an array to be mapped and graphed
function calculatePowerByMinutes(minutes){
	var total = 0;
	var best = 0;
	var seconds = minutes * 60;
	var begin;
	var end;
	var j = seconds;
	var k = samples.length;

	for(var i = 0; i < j; i++){
		total += samples[i].values.power;
		begin = i;
		end = i + j;
	}

	best = total / j;

	for(i = j; i < k; i++){
		total = total - samples[i - j].values.power;
		total = total + samples[i].values.power;
		var avg = total / j;
		if (avg > best){
			best = avg;
			begin = i;
			end = i + j;
		}
	}
	if(minutes == 20){
		samples.forEach(function(sample, idx){
			if(idx > begin && idx < end){
				twentyMinuteReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
				if(sample.values.positionLat && sample.values.positionLong){
					twentyCoordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
				}
			}
		});
	} else if (minutes == 15){
		samples.forEach(function(sample, idx){
			if(idx > begin && idx < end){
				fifteenMinuteReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
				if(sample.values.positionLat && sample.values.positionLong){
					fifteenCoordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
				}
			}
		});
	} else if (minutes == 10){
		samples.forEach(function(sample, idx){
			if(idx > begin && idx < end){
				tenMinuteReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
				if(sample.values.positionLat && sample.values.positionLong){
					tenCoordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
				}
			}
		});
	} else if (minutes == 5){
		samples.forEach(function(sample, idx){
			if(idx > begin && idx < end){
				fiveMinuteReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
				if(sample.values.positionLat && sample.values.positionLong){
					fiveCoordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
				}
			}
		});
	} else if (minutes == 1){
		samples.forEach(function(sample, idx){
			if(idx > begin && idx < end){
				oneMinuteReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
				if(sample.values.positionLat && sample.values.positionLong){
					oneCoordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
				}
			}
		});
	}
}

//Initialize map with entire set of coordinates from JSON object and plot first polyline
function initMap() {
	totalLine = new google.maps.Polyline({
		path: coordinates,
		geodesic: true,
		strokeColor: "#4F81BC",
		strokeOpacity: 1.0,
		strokeWeight: 5
	});
	totalLine.setMap(map);
}

//Plot individual lines and create objects for each average power output score by minutes, leaving all of them invisible except the entire dataset until toggled on
function plotLine(length) {
	if (length == 20){
		twentyLine = new google.maps.Polyline({
			path: twentyCoordinates,
			geodesic: true,
			strokeColor: "#C0504D",
			strokeOpacity: 1.0,
			strokeWeight: 7,
			visible: false
		});
		twentyLine.setMap(map);
	} else if (length == 15){
		fifteenLine = new google.maps.Polyline({
			path: fifteenCoordinates,
			geodesic: true,
			strokeColor: "#9BBB57",
			strokeOpacity: 1.0,
			strokeWeight: 7,
			visible: false
		});
		fifteenLine.setMap(map);
	} else if (length == 10){
		tenLine = new google.maps.Polyline({
			path: tenCoordinates,
			geodesic: true,
			strokeColor: "#23BFAA",
			strokeOpacity: 1.0,
			strokeWeight: 7,
			visible: false
		});
		tenLine.setMap(map);
	} else if (length == 5){
		fiveLine = new google.maps.Polyline({
			path: fiveCoordinates,
			geodesic: true,
			strokeColor: "#8063A1",
			strokeOpacity: 1.0,
			strokeWeight: 7,
			visible: false
		});
		fiveLine.setMap(map);
	} else if (length == 1){
		oneLine = new google.maps.Polyline({
			path: oneCoordinates,
			geodesic: true,
			strokeColor: "#4AABC5",
			strokeOpacity: 1.0,
			strokeWeight: 7,
			visible: false

		});
		oneLine.setMap(map);
	}
}


//load data into chart from total data and minute ranged readings data.  Click handler to toggle map and graph sections on or off.
function  chartLoad() {
	var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Power Output Over Time",
			fontFamily: "helvetica"
		},
		axisX: {
			title: "Time (Minutes)"
		},
		axisY: {
			title: "Power"
		},
		legend: {
			cursor: "pointer",
			itemclick: function (e) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
					if(e.dataSeries.minutes == 9999){
						totalLine.visible = false;
						totalLine.setMap(map);
					} else if (e.dataSeries.minutes == 20){
						twentyLine.visible = false;
						twentyLine.setMap(map);
					} else if (e.dataSeries.minutes == 15){
						fifteenLine.visible = false;
						fifteenLine.setMap(map);
					} else if (e.dataSeries.minutes == 10){
						tenLine.visible = false;
						tenLine.setMap(map);
					} else if (e.dataSeries.minutes == 5){
						fiveLine.visible = false;
						fiveLine.setMap(map);
					} else if (e.dataSeries.minutes == 1){
						oneLine.visible = false;
						oneLine.setMap(map);
					}
				} else {
					e.dataSeries.visible = true;
					if(e.dataSeries.minutes == 9999){
						totalLine.visible = true;
						totalLine.setMap(map);
					} else if (e.dataSeries.minutes == 20){
						twentyLine.visible = true;
						twentyLine.setMap(map);
					} else if (e.dataSeries.minutes == 15){
						fifteenLine.visible = true;
						fifteenLine.setMap(map);
					} else if (e.dataSeries.minutes == 10){
						tenLine.visible = true;
						tenLine.setMap(map);
					} else if (e.dataSeries.minutes == 5){
						fiveLine.visible = true;
						fiveLine.setMap(map);
					} else if (e.dataSeries.minutes == 1){
						oneLine.visible = true;
						oneLine.setMap(map);
					}
				}

				e.chart.render();
			}
		},
		animationEnabled: true,
		backgroundColor:null,
		data: [
			{
				type: "line",
				showInLegend: true,
				legendText: "Entire Run",
				dataPoints: totalPowerReadings,
				minutes: 9999
			},
			{
				type: "line",
				showInLegend: true,
				legendText: "Best 20 Minutes",
				dataPoints: twentyMinuteReadings,
				visible: false,
				minutes: 20
			},
			{
				type: "line",
				showInLegend: true,
				legendText: "Best 15 Minutes",
				dataPoints: fifteenMinuteReadings,
				visible: false,
				minutes: 15
			},
			{
				type: "line",
				showInLegend: true,
				legendText: "Best 10 Minutes",
				dataPoints: tenMinuteReadings,
				visible: false,
				minutes: 10
			},
			{
				type: "line",
				showInLegend: true,
				legendText: "Best 5 Minutes",
				dataPoints: fiveMinuteReadings,
				visible: false,
				minutes: 5
			},
			{
				type: "line",
				showInLegend: true,
				legendText: "Best 1 Minute",
				dataPoints: oneMinuteReadings,
				visible: false,
				minutes: 1
			}
		]
	});
	chart.render();
};



//Allow graph and map libraries to load, was rendering slowly
setTimeout(function () {
	window.onload = function(){
		getPathCoordinates();
		initMap();
		calculatePowerByMinutes(20);
		calculatePowerByMinutes(15);
		calculatePowerByMinutes(10);
		calculatePowerByMinutes(5);
		calculatePowerByMinutes(1);
		chartLoad();
		plotLine(20);
		plotLine(15);
		plotLine(10);
		plotLine(5);
		plotLine(1);
	};
}, 50);
