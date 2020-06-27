function plotData(id, data){
	state_name = []
	active_data = []
	confirmed_data = []
	deceased_data = []
	recovered_data = []
	
	for (var state in data){
		if (state != "Total"){
			state_name.push(state)
			active_data.push(data[state][0])
			confirmed_data.push(data[state][1])
			deceased_data.push(data[state][2])
			recovered_data.push(data[state][3])
		}
	}
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: state_name,
			datasets: [
				{
					label: 'Deceased',
					fill:true,
					data: deceased_data,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness :  10,
				},
				{
					label: 'Recovered',
					fill:false,
					data: recovered_data,
					backgroundColor: 'rgba(0, 100, 0, 1)',borderColor: [],borderWidth: 1,
					barThickness :  10,
				},
				{
					label: 'Active Cases',
					fill:false,
					data: active_data,
					backgroundColor: 'rgba(51, 51, 255, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : 10,
					
				},
				{
					label: 'Total Cases',
					fill:false,
					data: confirmed_data,
					backgroundColor: 'rgba(50, 0, 150, 0.5)',borderColor: [],borderWidth: 1,
					barThickness :  10,
				}
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
				var total = (parseInt(data.datasets[3].data[index])) 
				var mylbl = data.datasets[tooltipItem.datasetIndex].label
				var percentage = parseFloat((currentValue/total*100).toFixed(1));
				return mylbl+': ' + currentValue + ' ('+ percentage+'%)';
			},
		}
	  },
	labels: {display: true,},
    responsive: false,
	title:{
		display: false,
		position: "bottom",
		text: "*Toggle between the data in all charts: Click on the legend",
		fontSize: 10,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13}
    },
    scales: {
      xAxes: [{
	  stacked :  true,
	  id : "bar-x-axis1",
	  display : true,
        ticks: {maxRotation: 00,minRotation: 45,fontSize: 12,offsetGridLines: false,}
      }],
      yAxes: [{
	  stacked : false,
        ticks: {beginAtZero: true,fontSize: 16,}
      }]
    }
  }
	});

}


function plotstatepieData(id, data){

	active_data = []
	confirmed_data = []
	deceased_data = []
	recovered_data = []
	lblst = []
	coloR = []
	intot =[]
	var mystdat = {};
	
	
	var j = 0;
	for (var state in data){
			if (j>=1){
				lblst.push(state)
				confirmed_data.push(data[state][0])
				active_data.push(data[state][1])
				recovered_data.push(data[state][2])
				deceased_data.push(data[state][3])
				coloR.push(data[state][4])
				mystdat[j-1] = data[state][0]
				
			} else 
			{intot.push((data[state][0]))}
		j = j+1;
	}
	
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: lblst,
			datasets: [
			{
			fill:true,
			data: confirmed_data,// active_data, recovered_data, deceased_data],
			backgroundColor: coloR,
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
					var total = intot
					var mylbl = data.labels[index]
					var percentage = parseFloat((currentValue/total*100).toFixed(2));
					return mylbl+': ' + currentValue + ' ('+ percentage+'%)';
					},
					}
			},
			labels: {display: false,},
			responsive: false,
			title:{
				display: false,
				position: "top",
				
				fontSize: 14,
			},
			legend: {
				display: true,
				position: "bottom",
				//reverse : true,
				labels: {fontColor: 'rgba(0,0,0,1)',fontSize: 11, boxWidth: 12,
					
				}
			},
		}
	});


$("#allstdat").on("click", function (){
		myChart.data.datasets[0].data = mystdat
		myChart.update();
	
});

$("#top5").on("click", function (){
		var alldat = mystdat
		
		var top5 = {};
		for (var i in alldat){
			if (i<=4){
				top5[i] = alldat[i]
			//console.log(top5[i])
			}
		}
		myChart.data.datasets[0].data = top5
		myChart.update();
	
});

$("#top10").on("click", function (){
		var alldat = mystdat
		//console.log(alldat)
		var top10 = {};
		for (var i in alldat){
			if (i<=9){
				top10[i] = alldat[i]
			}
		}
		myChart.data.datasets[0].data = top10
		myChart.update();
	
});



}

var api2 = 'https://api.covid19india.org/data.json'
var request2 = new XMLHttpRequest()
request2.open('GET', api2, true)
	request2.onload = function() {
	var data = JSON.parse(this.response)
	
	var district_data = data.tested;
	var confdailydata = data.cases_time_series;
	var totalcases = data.statewise;
	
	var stdata = {};
	var cnf_5k = {};
	var cnf_1k_5k = {};
	var cnf_5k_10k = {};
	var cnf_1k = {};
	
	var dynamicColors = function() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
	
	for (var i in totalcases){
		
		var data_values = totalcases[i]
		var stn = data_values.state
		var stconf = data_values.confirmed
	
		var stact = data_values.active
		var strec = data_values.recovered
		var stdec = data_values.deaths
		var rndcolor = dynamicColors()
		var rndactcolor = dynamicColors()
		stdata[stn] = [stconf, stact, strec, stdec,rndcolor,rndactcolor]
		
		stconf > 10000? cnf_5k[stn]=[stact, stconf, stdec, strec]:
		(stconf < 10000 && stconf > 5000)? cnf_5k_10k[stn]=[stact, stconf, stdec, strec]:
		(stconf < 5000 && stconf > 1000)? cnf_1k_5k[stn]=[stact, stconf, stdec, strec]:
		stconf>100?cnf_1k[stn] = [stact, stconf, stdec, strec]:0	
		//conf>100?statename[state] = [conf] :0
	}
	
	plotData('mh', cnf_5k)
	plotData('allstates5_10',cnf_5k_10k)
	plotData('allstates1_5',cnf_1k_5k)
	plotData('allstatesle1',cnf_1k)
	plotstatepieData('statepie',stdata)
	
	
}

request2.send()