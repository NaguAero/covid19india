function plotd_genData(id, data){

	mdat = []
	fdat = []
	
	mdat.push(data[0])
	fdat.push(data[1])
	s_size = data[0]+data[1]
	
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ["Male", "Female"],
			datasets: [
				{
					fill:true,
					data: [mdat, fdat],
					backgroundColor: [ 'rgba(55, 0, 150, 0.5)', 'rgba(255, 0, 0, 0.5)'], 
					borderColor: [],borderWidth: 1,
				},
			]
		},
		options: {
	  tooltips: {
	    mode: 'index',
		intersect: true,
		reverse: true,
			callbacks: {
				label: function(tooltipItem, data) {
					var index = tooltipItem.index;
					var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
					var total = (parseInt(data.datasets[tooltipItem.datasetIndex].data[0]) + 
								parseInt(data.datasets[tooltipItem.datasetIndex].data[1]))
					var mylbl = data.labels[index]
					var percentage = parseFloat((currentValue/total*100).toFixed(1));
					return mylbl+': ' + currentValue + ' ('+ percentage+'%)';
				},
			}
	  },
	labels: {display: true,},
    responsive: false,
	title:{display: true, text: 'sample size: '+ s_size +' patients',fontSize: 14, },
	legend: {display: true,position: "bottom",
		//reverse: true,
      labels: {fontColor: "#333",fontSize: 14},
    },
	
  }
	});

}

	var mcount = 0;
	var	fcount = 0;	

var api_1 = 'https://api.covid19india.org/deaths_recoveries.json'
var request_1 = new XMLHttpRequest()
request_1.open('GET', api_1, true)

request_1.onload = function() {
	var data = JSON.parse(this.response)
	var district_data = data.deaths_recoveries;

	for (var i in district_data){
		var data_values = district_data[i]
		var gen = data_values.gender
		if (gen == "M"){mcount= mcount+1}
		if (gen == "F"){fcount = fcount+1}
		
	}
	
	
}
var api_2 = 'https://api.covid19india.org/raw_data3.json'
var request_2 = new XMLHttpRequest()
request_2.open('GET', api_2, true)
request_2.onload = function() {
	var data = JSON.parse(this.response)
	var district_data = data.raw_data;
	
	for (var i in district_data){
		var data_values = district_data[i]
		var gen = data_values.gender
		if (gen == "M"){mcount= mcount+1}
		if (gen == "F"){fcount = fcount+1}
	}
	

}
var api_3 = 'https://api.covid19india.org/raw_data4.json'
var request_3 = new XMLHttpRequest()
request_3.open('GET', api_3, true)
request_3.onload = function() {
	var data = JSON.parse(this.response)
	var district_data = data.raw_data;
	var gdat = {};
	
	for (var i in district_data){
		var data_values = district_data[i]
		var gen = data_values.gender
		if (gen == "M"){mcount= mcount+1}
		if (gen == "F"){fcount = fcount+1}
	}
	
	
}
var api_4 = 'https://api.covid19india.org/raw_data5.json'
var request_4 = new XMLHttpRequest()
request_4.open('GET', api_4, true)
request_4.onload = function() {
	var data = JSON.parse(this.response)
	var district_data = data.raw_data;
	
	
	for (var i in district_data){
		var data_values = district_data[i]
		var gen = data_values.gender
		if (gen == "M"){mcount= mcount+1}
		if (gen == "F"){fcount = fcount+1}
	}
	
	gdat = [mcount,fcount]
	plotd_genData("pbg",gdat)
	
}

var api_5 = 'https://api.covid19india.org/raw_data6.json'
var request_5 = new XMLHttpRequest()
request_5.open('GET', api_5, true)
request_5.onload = function() {
	var data = JSON.parse(this.response)
	var district_data = data.raw_data;
	
	
	for (var i in district_data){
		var data_values = district_data[i]
		var gen = data_values.gender
		if (gen == "M"){mcount= mcount+1}
		if (gen == "F"){fcount = fcount+1}
	}
	
	gdat = [mcount,fcount]
	
}

request_1.send()
request_2.send()
request_3.send()
request_4.send()
request_5.send()




var s_size = 25428;
var ctx = document.getElementById("pba");
var allstates = new Chart(ctx, {
  type: 'bar',
  data: {
	labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    datasets: [{
		label: 'Recovered',
		data : [5, 9, 37, 29, 19, 16, 12, 4, 4, 1],
		backgroundColor: 'rgba(0, 100, 0, 0.8)',
		borderColor: [],
		borderWidth: 1,
		barThickness : 10,
		xAxisID: "bar-x-axis1",
	},
	{
		label: 'Deceased',
		data : [8, 7, 11, 37, 100, 192, 196, 90, 13, 2],
		backgroundColor: 'rgba(255, 0, 0, 0.8)',
		borderColor: [],
		borderWidth: 1,
		barThickness : 10,
		xAxisID: "bar-x-axis1",
	},
	{
      label: 'Hospitalized',
	  type: 'bar',
	  xAxisID: "bar-x-axis1",
	  data : [1338, 2687, 6379, 5534, 4015, 2839, 1241, 468, 121, 11],
	  backgroundColor: 'rgba(51, 51, 255, 0.8)',
      borderColor: [],
      borderWidth: 1,
	  barThickness : 10,
	  
    },
	{
      label: 'Patient',
	  type: 'bar',
	  xAxisID: "bar-x-axis1",
	  data : [1351, 2703, 6427, 5600, 4134, 3049, 1450, 562, 138, 14],
	  backgroundColor: 'rgba(50, 0, 150, 0.5)',
      borderColor: [],
      borderWidth: 1,
	  barThickness : 10,
	  
    }
	]
  },
  options: {
	  tooltips: {
	    mode: 'index',
		intersect: true,
		reverse: true,
	  },
    responsive: false,
	title:{display: true, text: 'sample size: '+ s_size +' patients',fontSize: 14, },
	legend: {display: true,position: "bottom",
		reverse: true,
      labels: {fontColor: "#333",fontSize: 13},
    },
    scales: {
      xAxes: [{
	  stacked : true,
	  id : "bar-x-axis1",
        ticks: {maxRotation: 00,minRotation: 30,fontSize: 16,
		autoSkip: true,
		maxTicksLimit: 12,}
      }],
      yAxes: [{
        ticks: {beginAtZero: true,fontSize: 16,}
      }]
    }
  }
});