
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


function getPathCoordinates(){
	samples.forEach(function(sample){
		if(sample.values.positionLat && sample.values.positionLong){
			coordinates.push({lat: sample.values.positionLat, lng: sample.values.positionLong});
			totalPowerReadings.push({x: (sample.millisecondOffset/60000), y: sample.values.power});
		}
	});
}



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
		//	console.log(i);
		//	console.log(i + seconds);
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

function initMap() {
  var runPath = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: "#4F81BC",
    strokeOpacity: 1.0,
    strokeWeight: 5
  });
  runPath.setMap(map);
}

function plotLine(length) {
	if (length == 20){
		var runPath = new google.maps.Polyline({
			path: twentyCoordinates,
			geodesic: true,
			strokeColor: "#C0504D",
			strokeOpacity: 1.0,
			strokeWeight: 7
		});
	} else if (length == 15){
		var runPath = new google.maps.Polyline({
			path: fifteenCoordinates,
			geodesic: true,
			strokeColor: "#9BBB57",
			strokeOpacity: 1.0,
			strokeWeight: 9
		});
	} else if (length == 10){
		var runPath = new google.maps.Polyline({
			path: tenCoordinates,
			geodesic: true,
			strokeColor: "#23BFAA",
			strokeOpacity: 1.0,
			strokeWeight: 11
		});
	} else if (length == 5){
		var runPath = new google.maps.Polyline({
			path: fiveCoordinates,
			geodesic: true,
			strokeColor: "#8063A1",
			strokeOpacity: 1.0,
			strokeWeight: 13
		});
	} else if (length == 1){
		var runPath = new google.maps.Polyline({
			path: oneCoordinates,
			geodesic: true,
			strokeColor: "#4AABC5",
			strokeOpacity: 1.0,
			strokeWeight: 15
		});
	}

	runPath.setMap(map);
}

window.onload = function () {
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
    data: [
    {
      type: "line",
      dataPoints: totalPowerReadings
    },
		{
			type: "line",
			dataPoints: twentyMinuteReadings
		},
		{
			type: "line",
			dataPoints: fifteenMinuteReadings
		},
		{
			type: "line",
			dataPoints: tenMinuteReadings
		},
		{
			type: "line",
			dataPoints: fiveMinuteReadings
		},
		{
			type: "line",
			dataPoints: oneMinuteReadings
		}
    ]
  });
  chart.render();
};

// blue = total, red = twenty, green/yellow = fifteen, cyan = 10, purple = 5, blue again for some reason = one minute





getPathCoordinates();
initMap();
calculatePowerByMinutes(20);
calculatePowerByMinutes(15);
calculatePowerByMinutes(10);
calculatePowerByMinutes(5);
calculatePowerByMinutes(1);
plotLine(20);
plotLine(15);
plotLine(10);
plotLine(5);
plotLine(1);
