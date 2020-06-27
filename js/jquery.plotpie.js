function plotdData(id, data, utime){

	active_data = []
	confirmed_data = []
	deceased_data = []
	recovered_data = []
	n_dat = []
	u_time = []
	confirmed_data.push(data[0])
	active_data.push(data[1])
	recovered_data.push(data[2])
	deceased_data.push(data[3])
	n_dat.push(data[4],data[5],data[6])
	u_time.push(utime)
	
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ["Total Cases", "Active Cases", "Recovered", "Deceased"],
			datasets: [
			{
			fill:true,
			data: [confirmed_data, active_data, recovered_data, deceased_data],
			backgroundColor: [ 'rgba(55, 0, 150, 0.5)', 'rgba(51, 51, 255, 0.8)', 
				'rgba(0, 100, 0, 1)', 'rgba(255, 0, 0, 0.9)'], 
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
					var total = data.datasets[tooltipItem.datasetIndex].data[0]
					var mylbl = data.labels[index]
					var percentage = parseFloat((currentValue/total*100).toFixed(1));
					return mylbl+': ' + currentValue + ' ('+ percentage+'%)';
					},
					}
			},
			labels: {display: true,},
			responsive: false,
			title:{
				display: false,
				position: "top",
				text: ['Last updated on: '+ u_time[0]+ ' hrs',
				'Today Cases: '+'Confirmed: '+n_dat[0]+', '+'Recovered: '+n_dat[1]+', '+
				'Deceased: '+n_dat[2]],
				fontSize: 14, fontColor : 'rgba(0, 0, 255, 0.9)',
			},
			legend: {
				display: true,
				position: "bottom",
				//reverse : true,
				labels: {fontColor: "#333",fontSize: 14, usePointStyle: true, boxWidth: 10,}
			},
		}
	});

}

function plot2Data(id, data, name){
	date_name = []
	act_data = []
	conf_data = []
	dec_data = []
	rec_data = []
	stname = []
	curve = []
	days = []
	
	for (var i in data[0]){
		date_name.push(data[0][i])
		//confirmed_data.push(data[0])
		conf_data.push(data[1][i])
		rec_data.push(data[2][i])
		dec_data.push(data[3][i])
		curve.push(data[4][i])
		days.push(data[5][i])
	}
	
		stname.push(name)
	//console.log(date_name)
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: date_name,
			datasets: [
				{
					type: 'bar',
					label: 'Deceased',
					fill:true,
					data: dec_data,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				{
					type: 'bar',
					label: 'Recovered',
					fill:false,
					data: rec_data,
					backgroundColor: 'rgba(0, 100, 0, 1)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				{
					type: 'bar',
					label: 'Daily Confirmed',
					fill:false,
					data: conf_data,
					backgroundColor: 'rgba(50, 0, 150, 0.5)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				{
					type: 'line',
					label: 'curve',
					data: curve,
					fill:false,
					//xAxisID: 'x-axis-2',
					lineTension: 0.1,
					borderColor: "rgba(0, 0, 0, 0.9)",  pointBackgroundColor: "rgba(0, 0, 0, 0.9)",
					pointBorderWidth: 0, pointHoverRadius: 3, borderWidth: 5,
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
					
					//yAxisID: 'pdat',
				}
			]
		},
		options: {
		tooltips: {
			mode: 'index',
			intersect: true,
			reverse: true,
			},
	labels: {display: true,},
    responsive: false,
	title:{
		display: (id == 'dailyindia') ? false : true,
		text: stname,
		fontSize: 20,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13}
    },
    scales: {
      xAxes: [{
	  stacked : true,
	  display : true,
        ticks: {maxRotation: 0,minRotation: 60,fontSize: 14,offsetGridLines: false,}
     // },{
		  // id: 'x-axis-2', type: 'linear', display: true,
		  // scaleLabel: {display: true,  labelString: 'Days' },
        // ticks: {
          // beginAtZero: true, min:0, max:100,
        //},
	  }],
      yAxes: [{
	  stacked : false,
        ticks: {beginAtZero: true,fontSize: 16,}
      }]
    }
  }

	});

}

function plotratedata(id, data){
	date_name = []
	drated_data = []
	drater_data = []
	drate_data = []
	drate3_data = []
	stname = []
	ratedate = []
	drate3r_data = []
	drate3d_data = []
	pushdate = []
	prate_data = []
	prate3_data = []
	
	for (var i in data[0]){
		pushdate[i] = data[0][i]
		date_name.push(data[0][i])
		drate_data.push(data[1][i])
		drater_data.push(data[2][i])
		drated_data.push(data[3][i])
		prate_data.push(data[8][i])
	}
	for (var i in data[4]){
		drate3_data.push(data[5][i])
		ratedate.push(data[4][i])
		drate3r_data.push(data[6][i])
		drate3d_data.push(data[7][i])
		prate3_data.push(data[9][i])
	}
	
	stname.push("Death Rate", "Recovery Rate", "Daily Cases Growth Rate", "Positivity Rate")
	
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: date_name,
			datasets: [
				{
					label: stname[0], //death rate
					fill:false,
					data: drated_data,
					lineTension: 0.1,
					borderColor: "rgba(255, 0, 0, 0.8)",  pointBackgroundColor: "rgba(255, 0, 0, 0.8)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[1], //recovery rate
					fill:false,
					data: drater_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 100, 0, 1)",  pointBackgroundColor: "rgba(0, 100, 0, 1)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[2], //growth rate
					fill:false,
					data: drate_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 0, 0, 0.8)",  pointBackgroundColor: "rgba(0, 0, 0, 0.8)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[3], //postivity rate
					fill:false,
					data: prate_data,
					lineTension: 0.1,
					borderColor: "rgba(200, 100, 0, 0.9)",  pointBackgroundColor: "rgba(200, 100, 0, 0.9)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
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
					var mylbl = data.datasets[tooltipItem.datasetIndex].label
					  return mylbl+': ' + currentValue + '%';
					},
				}	
			},
	labels: {display: true,},
    responsive: false,
	title:{
		display: false,
		text: stname,
		fontSize: 20,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13}//, boxWidth: 40}
    },
    scales: {
      xAxes: [{
	  stacked : (id == 'india') ? false : true,
	  id : "bar-x-axis1",
	  display : true,
        ticks: {maxRotation: 00,minRotation: 60,fontSize: 13,offsetGridLines: false, autoSkip: true,
		maxTicksLimit: 12,}
      }],
      yAxes: [{
		type : 'logarithmic',
				ticks: {beginAtZero: true,fontSize: 16, max: 100,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
				      return Number(value.toString());//pass tick values as a string into Number function
				      }
				  },
				 afterBuildTicks: function(allcountline) {    
                        allcountline.ticks = [];
                        allcountline.ticks.push(0);
						allcountline.ticks.push(0.1);
                        allcountline.ticks.push(0.3);
						allcountline.ticks.push(0.5);
                        allcountline.ticks.push(1);
						allcountline.ticks.push(5);
                        allcountline.ticks.push(10);
                        allcountline.ticks.push(30);
						allcountline.ticks.push(50);
						allcountline.ticks.push(100);
                      }
	  
      }]
    }
  }

	});

$("#7").on("click", function (){
		myChart.data.labels = ratedate;
		myChart.data.datasets[3].data = prate3_data;
		myChart.data.datasets[2].data = drate3_data;
		myChart.data.datasets[1].data = drate3r_data;
		myChart.data.datasets[0].data = drate3d_data;
		myChart.update();
	
});

$("#6").on("click", function (){
		myChart.data.labels = pushdate;
		myChart.data.datasets[3].data = prate_data;
		myChart.data.datasets[2].data = drate_data;
		myChart.data.datasets[1].data = drater_data;
		myChart.data.datasets[0].data = drated_data;
		myChart.update();
	
});

$("#4").on("click", function (){
		myChart.options.scales.yAxes[0] = {
				type : 'linear',
				ticks: {beginAtZero: true,fontSize: 16,}
		};
		myChart.update();
	
});
$("#5").click( function (){
		myChart.options.scales.yAxes[0] = {
				type : 'logarithmic',
				ticks: {beginAtZero: true,fontSize: 16, max: 100,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
				      return Number(value.toString());//pass tick values as a string into Number function
				      }
				  },
				 afterBuildTicks: function(allcountline) {    
                        allcountline.ticks = [];
                        allcountline.ticks.push(0);
						allcountline.ticks.push(0.1);
                        allcountline.ticks.push(0.3);
						allcountline.ticks.push(0.5);
                        allcountline.ticks.push(1);
						allcountline.ticks.push(5);
                        allcountline.ticks.push(10);
                        allcountline.ticks.push(30);
						allcountline.ticks.push(50);
						allcountline.ticks.push(100);
                      }
	  
		};
		myChart.update();
	})


}

function plotlinecumindia(id, data){
	date_name = []
	
	conf_data = []
	dec_data = []
	rec_data = []
	stname = []
	act_data = []
	
	for (var i in data[0]){
		date_name.push(data[0][i])
		conf_data.push(data[1][i])
		act_data.push(data[2][i])
		rec_data.push(data[3][i])
		dec_data.push(data[4][i])
	}
	stname.push("Deceased", "Recovered", "Active Cases", "Total Cases")
	
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: date_name,
			datasets: [
				
			
				{
					label: stname[0], //tg
					fill:false,
					data: dec_data,
					lineTension: 0.1,
					borderColor: "rgba(255, 0, 0, 0.8)", 
					pointBackgroundColor: "rgba(255, 0, 0, 0.8)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[1], //wb
					fill:false,
					data: rec_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 100, 0, 1)",  pointBackgroundColor: "rgba(0, 100, 0, 1)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[2],  //pb
					fill:false,
					data: act_data,
					lineTension: 0.1,
					borderColor: "rgba(51, 51, 255, 0.9)",  pointBackgroundColor: "rgba(51, 51, 255, 0.9)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[3],  //ap
					fill:false,
					data: conf_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 0, 0, 0.8)", pointBackgroundColor: "rgba(0, 0, 0, 0.8)",
					pointBorderWidth: 0, pointHoverRadius: 3, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
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
						// var total = (parseInt(data.datasets[3].data[index]))
						var denoValue = data.datasets[3].data[index]
												
						var mylbl = data.datasets[tooltipItem.datasetIndex].label
						var percentage = parseFloat((100*currentValue/denoValue).toFixed(2));
						var addline = ' (' + percentage + '%' + ')'
						
						if (tooltipItem.datasetIndex == 3){return mylbl+': ' + currentValue  ;}
							else {return [mylbl+': ' + currentValue + addline] ;}
						
					},
					
				}
			
			},
	labels: {display: true,},
    responsive: false,
	title:{
		display: false,
		text: stname,
		fontSize: 20,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13}//, boxWidth: 40}
    },
    scales: {
      xAxes: [{
	  stacked : (id == 'india') ? false : true,
	  id : "bar-x-axis1",
	  display : true,
        ticks: {maxRotation: 00,minRotation: 60,fontSize: 13,offsetGridLines: false, autoSkip: true,
		maxTicksLimit: 12,}
      }],
      yAxes: [{
	  ticks: {beginAtZero: true,fontSize: 16,
	  },
	  scaleLabel: {
        display: false,
        labelString: "Total Cases",
        fontColor: "red",
		fontSize: 18,
      },
	  type: 'linear',
      }]
    }
  }

	});

$("#0").on("click", function (){
		myChart.options.scales.yAxes[0] = {
				type : 'linear',
				ticks: {beginAtZero: true,fontSize: 16,}
		};
		myChart.update();
	
});
$("#1").click( function (){
		myChart.options.scales.yAxes[0] = {
				type : 'logarithmic',
				ticks: {beginAtZero: true,fontSize: 16, max: 500000,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
				      return Number(value.toString());//pass tick values as a string into Number function
				      }
				  },
				 afterBuildTicks: function(allcountline) {    
                        allcountline.ticks = [];
                        allcountline.ticks.push(1);
                        allcountline.ticks.push(10);
                        allcountline.ticks.push(100);
                        allcountline.ticks.push(1000);
                        allcountline.ticks.push(10000);
						allcountline.ticks.push(100000);
						allcountline.ticks.push(200000);
						allcountline.ticks.push(500000);
                      }
		};
		
		myChart.update();
	})


}	


function plotTestData(id, data){
	date_name = []
	test_data = []
	conf_data = []

	
	
	for (var i in data[0]){
		date_name.push(data[0][i])
		//confirmed_data.push(data[0])
		test_data.push(data[1][i])
		conf_data.push(data[2][i])
	}
		
		
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: date_name,
			datasets: [
				{
					label: 'Daily Confirmed',
					fill:true,
					data: conf_data,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				{
					label: 'Daily Tests',
					fill:false,
					data: test_data,
					backgroundColor: 'rgba(50, 24, 251, 0.7)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				}
			]
		},
		options: {
		tooltips: {
			mode: 'index',
			intersect: true,
			reverse: true,
				callbacks: {
					
					// label: function(tooltipItem, data) {
					// var index = tooltipItem.index;
					// var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
					// // var total = (parseInt(data.datasets[3].data[index]))
					// var denoValue = data.datasets[1].data[index]
					// var numeValue = data.datasets[0].data[index]						
					// var mylbl = data.datasets[tooltipItem.datasetIndex].label
					// var percentage = parseFloat((100*numeValue/denoValue).toFixed(2));
					// var addline = 'Positivity Rate: '+ percentage+'%'
					
					// if (tooltipItem.datasetIndex == 1){return mylbl+': ' + currentValue  ;}
						// else {return [mylbl+': ' + currentValue] ;}
					
				// },
					afterLabel: function(tooltipItem, data){
						var index = tooltipItem.index;
						var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
						// var total = (parseInt(data.datasets[3].data[index]))
						var denoValue = data.datasets[1].data[index]
						var numeValue = data.datasets[0].data[index]	
						var percentage = parseFloat((100*numeValue/denoValue).toFixed(2));
						var addline = 'Positivity Rate: '+ percentage+'%'
						if (tooltipItem.datasetIndex == 0) {return addline};
					},
					// footer: function(tooltipItem, data) {
						// var addline = 'Positivity Rate: %'
						// return [addline];
					// }
				}
			},
	labels: {display: true,},
    responsive: false,
	title:{
		display:  false,
		text: stname,
		fontSize: 20,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13}
    },
    scales: {
      xAxes: [{
	  stacked : true,
	  id : "bar-x-axis1",
	  display : true,
        ticks: {maxRotation: 0,minRotation: 60,fontSize: 14,offsetGridLines: false,}
      }],
      yAxes: [{
	  stacked : false,
        ticks: {beginAtZero: true,fontSize: 16,
				callback: function(value, index, values) {
					  return value/1e3 + 'K';//pass tick values
				      }
		}
      }]
    }
  }

	});

}


var api2 = 'https://api.covid19india.org/data.json'
var request2 = new XMLHttpRequest()
request2.open('GET', api2, true)
	request2.onload = function() {
	var data = JSON.parse(this.response)
	//Variables
	var indiacases = {};
	var dailyindia = {};
	var someconfdat = {};
	var somerec = {};
	var somedec = {};
	var dailyconf_date = {};
	var daily_conf = {};
	
	var daily_rec = {};
	var daily_dec = {};
	
	//Values from json
	var district_data = data.tested;	// tests
	var confdailydata = data.cases_time_series;		//
	var totalcases = data.statewise;
	var tests = data.tested;
	
	var ntotc = totalcases[0].confirmed
	var ntota = totalcases[0].active
	var ntotr = totalcases[0].recovered
	var ntotd = totalcases[0].deaths
	var nc = totalcases[0].deltaconfirmed
	var nr = totalcases[0].deltarecovered
	var nd = totalcases[0].deltadeaths
	
	var timeupdate = (totalcases[0].lastupdatedtime).split(" ")
	indiacases = [ntotc, ntota, ntotr, ntotd, nc, nr, nd]
	
	var j = 0
	
	for (var i in confdailydata){
		//console.log(confdailydata[i])
		var data_values = confdailydata[i]
		//console.log(data_values)
		var datesome = data_values.date
		someconfdat[i] = parseInt(data_values.dailyconfirmed)	
		somerec[i] = parseInt(data_values.dailyrecovered)
		somedec[i] = parseInt(data_values.dailydeceased)
		
		if (i>=62){
			dailyconf_date[j] = datesome
			daily_conf[j] = someconfdat[i]
			daily_rec[j] = somerec[i]
			daily_dec[j] = somedec[i]
			
			j=j+1
			}
		
	}
	
	var j = 0;
	var totconf ={};
	var totrec = {};
	var totdec = {};
	var totconf1 = {};
	var totrec1 = {};
	var totdec1 = {};
	var totact1 = {};
	var dailyconf_date2 = {};
	var dailyconf_date1 = {};
	for (var i in confdailydata){
		
		var data_values = confdailydata[i]
		
		dailyconf_date2[i] = data_values.date
		totconf[i] = parseInt(data_values.totalconfirmed)
		totrec[i] = parseInt(data_values.totalrecovered)
		totdec[i] = parseInt(data_values.totaldeceased)
		var totact = totconf[i] - (totdec[i]+totrec[i])
		if (i>=31){
			dailyconf_date1[j] = data_values.date
			totconf1[j] = totconf[i]
			totrec1[j] = totrec[i]
			totdec1[j] = totdec[i]
			totact1[j] = totact 
			j = j+1
		}	
		
	}
	
	
	
	
	
	var tottests = {};
	var testtime = {};
	var daily_cumtest = {};
	for (var i in tests){
		
		var data_values = tests[i]
		var sometest = data_values.totalsamplestested
		if (sometest == ""){sometest = 0}
		tottests[i] = parseInt(sometest)
		var tsttime = (data_values.updatetimestamp).split(" ")
		testtime[i] = tsttime[0]
	}
	var k = 1;
	for (var i in dailyconf_date1){
		var cumtest = 0
		if (i == 12){
			var j=i-12
			
			cumtest = tottests[j]
		}
		if (i>=13 && i <=16){cumtest = 0;}
		
		if (i >=17 && i <=26){
			
			
			if (testtime[k]==testtime[k+1]){
				
				
				k = k+1
				
			}
			
			cumtest = tottests[k]
			k = k+1
		}
			
		if (i >=27 && i <=29){cumtest = 0;}
		
		if (i >=29){
			
			
			if (testtime[k]==testtime[k+1]){
				
				
				k = k+1
				
			}
			
			cumtest = tottests[k]
			k = k+1
		}
		
		daily_cumtest[i] = cumtest
		
	}
	
	var daily_tests = {};
	var daily_tests1 = {};
	for (var i in daily_cumtest){
		var dtest = daily_cumtest[i]
		if (i>=1){
			dtest = daily_cumtest[i]-daily_cumtest[i-1]
			if (daily_cumtest[i] == 0){
				dtest = 0
			}
			if (i >12 && i <=17) {dtest = (daily_cumtest[17]-daily_cumtest[12])/5}
			if (i >= 25 && i <=26) (dtest = (daily_cumtest[26]-daily_cumtest[24])/2)
			if (i > 26 && i <=29) (dtest = parseInt((daily_cumtest[29]-daily_cumtest[26])/3))
			if (i >=50 && i <=51) (dtest = parseInt((daily_cumtest[51]-daily_cumtest[49])/2))
			if (i >=52 && i <=53) (dtest = parseInt((daily_cumtest[53]-daily_cumtest[51])/2))
		}
		daily_tests[i] = dtest
		if (i>=31){daily_tests1[i-31]=dtest}
	}
	
	var postivity = {};
	var drate = {};
	var drateu = {};
	var dratedu = {};
	var drateru = {};
	var j = 0;
	for (var i in totconf){
		if (i>=31){
			drateu[j] = (100*(someconfdat[i]/totconf[i])).toFixed(2)//drate
			drateru[j] = (100*(somerec[i]/totconf[i])).toFixed(2)//drater
			dratedu[j] = (100*(somedec[i]/totconf[i])).toFixed(2)//drated
			var prate = parseFloat(100*someconfdat[i]/daily_tests[j]).toFixed(2)//postivity rate
			if (daily_tests[j]==0){prate=0}
			postivity[j] = prate
			j = j+1
		}
	}
	
	var rate3days = {};
	var avgdate = {};
	var rate3daysr = {};
	var rate3daysd = {};
	var rate3daysp = {};
	var j = 0;
	
	for (var i=0; i<(Object.keys(totconf).length-2); i++){
		if(i>=31){
			var k = i-31
			if (i%3==0){
				avgdate[j] = dailyconf_date2[i]
				var avg3dayconf = ((someconfdat[i]+someconfdat[i+1]+someconfdat[i+2])/3).toFixed(2)
				var avg3dayrec = ((somerec[i]+somerec[i+1]+somerec[i+2])/3).toFixed(2)
				var avg3daydec = ((somedec[i]+somedec[i+1]+somedec[i+2])/3).toFixed(2)
				var avg3daytotconf = ((totconf[i]+totconf[i+1]+totconf[i+2])/3).toFixed(2)
				var avg3daytest = ((daily_tests[k]+daily_tests[k+1]+daily_tests[k+2])/3).toFixed(2)
				rate3days[j] = (100*avg3dayconf/avg3daytotconf).toFixed(2)
				rate3daysr[j] = (100*avg3dayrec/avg3daytotconf).toFixed(2)
				rate3daysd[j] = (100*avg3daydec/avg3daytotconf).toFixed(2)
				rate3daysp[j] = (100*avg3dayconf/avg3daytest).toFixed(2)
				j = j+1
				
			}
		
		}
	}
	
	//Normal distribution
	//Check whether is a number or not
	function isNum(args)
	{
		args = args.toString();
		if (args.length == 0) return false;
		for (var i = 0; i<args.length; i++)
		{
			if ((args.substring(i,i+1) < "0" || args.substring(i, i+1) > "9") 
				&& args.substring(i, i+1) != "." && args.substring(i, i+1) != "-")
			{return false;}
		}
		return true;
	}
	//calculate the mean of a number array
	function mean(arr){
		var len = 0;
		var sum = 0;
		for(var i=0;i<Object.keys(arr).length;i++)
		{
			if (arr[i] == ""){}
			else if (!isNum(arr[i]))
			{
				alert(arr[i] + " is not number!");
				return;
			}
			else
			{
				len = len + 1;
				sum = sum + parseFloat(arr[i]);
			}
		}
		return parseInt(sum / len);
	}
	function variance(arr){
		var len = 0;
		var sum=0;
		for(var i=0;i<Object.keys(arr).length;i++)
		{
			if (arr[i] == ""){}
			else if (!isNum(arr[i]))
			{
				alert(arr[i] + " is not number, Variance Calculation failed!");
				return 0;
			}
			else
			{
				len = len + 1;
				sum = sum + parseFloat(arr[i]);
			}
		}
		var v = 0;
		if (len > 1)
		{
			var mean = sum / len;
			for(var i=0;i<Object.keys(arr).length;i++)
			{
				if (arr[i] == ""){}
				else { v = v + (arr[i] - mean) * (arr[i] - mean); }
			}
			return parseInt(v / len);
		}
		else { return 0; }
	}
	
	var meancases = mean(daily_conf)
	var varcases = variance(daily_conf)
	var sd = parseInt(Math.sqrt(varcases))
	var fx = {};
	var xval = {};
	for (var i=0; i<=100; i++){
		//var expterm = -Math.pow(i-meancases, 2)/(2*varcases)
		//fx[i] = (100000*(1/(sd*Math.sqrt(2*Math.PI)))*Math.exp(expterm)).toFixed(2)
		fx[i] = parseInt(400*Math.exp(0.045*i))
		xval[i] = i
	}
	
	
	
	dailyindia = [dailyconf_date,daily_conf,daily_rec,daily_dec,fx,xval]
	rateindia = [dailyconf_date1,drateu,drateru,dratedu,avgdate,rate3days,rate3daysr,rate3daysd,postivity,rate3daysp]
	cumindia = [dailyconf_date1, totconf1, totact1, totrec1, totdec1]
	testplot = [dailyconf_date,daily_tests1,daily_conf]
	
	//span push numbers
	$("span.fh5co-counter.js-counter:first").attr("data-to",ntotc).css( "color", "rgba(0,0,0,0.8)"); 
	$("span.fh5co-counter.js-counter:eq(1)").attr("data-to",ntota).css( "color", "rgba(51,51,255,0.8)" ); 
	$("span.fh5co-counter.js-counter:eq(2)").attr("data-to",ntotr).css( "color", "rgba(0,100,0,1)" ); 
	$("span.fh5co-counter.js-counter:eq(3)").attr("data-to",ntotd).css( "color", "rgba(255,0,0,0.8)" );
    $("span.fh5co-counter.js-counter:eq(4)").attr("data-to",nc).css( "color", "rgba(0,0,0,0.8)"); 
	$("span.fh5co-counter.js-counter:eq(5)").attr("data-to",nr).css( "color", "rgba(0,100,0,1)" ); 
	$("span.fh5co-counter.js-counter:eq(6)").attr("data-to",nd).css( "color", "rgba(255,0,0,0.8)" );  
	var allp = $("p:eq(1)")
	$("p:first").text("Cummulative: "+timeupdate[0]+ ", "+timeupdate[1]+" IST");
	$("p:eq(1)").text("Today's Cases, updated on: "+timeupdate[0]+ ", "+timeupdate[1]+" IST");
	
	plotdData('india', indiacases,timeupdate)
	plot2Data('dailyindia', dailyindia)
	plotlinecumindia('cummulativeindia', cumindia)
	plotratedata('rateplot',rateindia)
	plotTestData('dailytests',testplot)

}

request2.send()