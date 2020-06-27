function plot_tested_state_Data(id, data){
	state_name = []
	testedpos = []
	tottests = []
	
	for (var st in data[0]){
		state_name.push(st)
		testedpos.push(data[0][st])
		tottests.push(data[1][st])
	}
arrayOfObj = state_name.map(function(d, i) {
return {
label: d,
data: tottests[i] || 0,
data1: testedpos[i] || 0
};
});

sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
return b.data-a.data;
});

newArrayLabel = [];
newArrayData = [];
newArrayData1 = [];
sortedArrayOfObj.forEach(function(d){
newArrayLabel.push(d.label);
newArrayData.push(d.data);
newArrayData1.push(d.data1);
});
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: newArrayLabel,//state_name,
			datasets: [
				{
					label: 'Tested Positive',
					fill:true,
					data: newArrayData1,//testedpos,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : (id == 'india') ? 30 :  10,
				},
				{
					label: 'Total Tests',
					fill:false,
					data: newArrayData,//tottests,
					backgroundColor: 'rgba(50, 0, 150, 0.5)',borderColor: [],borderWidth: 1,
					barThickness : (id == 'india') ? 30 : 10,
				},
			]
		},
		options: {
			tooltips: { mode: 'index', intersect: true, reverse: true, 
					backgroundColor	: 'rgba(0, 0, 0, 0.7)',
						callbacks: {
							
							afterLabel: function(tooltipItem, data){
							var index = tooltipItem.index;
							var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
							// var total = (parseInt(data.datasets[3].data[index]))
							var denoValue = data.datasets[1].data[index]
							var numeValue = data.datasets[0].data[index]	
							var percentage = parseFloat((100*numeValue/denoValue).toFixed(2));
							var addline = 'Overall Positivity Rate: '+ percentage+'%'
							if (tooltipItem.datasetIndex == 0) {return addline};
							},
							
						}

					},
			labels: {display: true,},
				responsive: false,
			legend: {
				display: true, position: "bottom", reverse : true,
				labels: {fontColor: "#333",fontSize: 13}
				},
			scales: {
			xAxes: [{
				stacked : true, display : true,
				ticks:  {maxRotation: 0,minRotation: 60,fontSize: 12,offsetGridLines: false,}
				}],
			yAxes: [{ stacked : false, ticks: {beginAtZero: true,fontSize: 16,
					callback: function(value, index, values) {
					  return value/1e3 + 'K' ;
				      }
			}
				}]
			}
		}
	});

}	

function plot_state_permin_Data(id, data){
	state_name = []
	testspmil = []
	casespermil = []
	
	for (var st in data[2]){
		state_name.push(st)
		testspmil.push(data[2][st])
		casespermil.push(data[3][st])
	}
	arrayOfObj = state_name.map(function(d, i) {
		return {
			label: d,
			data: testspmil[i] || 0,
			data1: casespermil[i] || 0
		};
	});

	sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
	  return b.data-a.data;
	});

	newArrayLabel = [];
	newArrayData = [];
	newArrayData1 = [];
	sortedArrayOfObj.forEach(function(d){
	  newArrayLabel.push(d.label);
	  newArrayData.push(d.data);
	  newArrayData1.push(d.data1);
	});
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: newArrayLabel,//state_name,
			datasets: [
				{
					label: 'Positive Cases per million',
					fill:true,
					data: newArrayData1,//casespermil,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : (id == 'india') ? 30 :  10,
				},
				{
					label: 'Tests per million',
					fill:false,
					data: newArrayData,//testspmil,
					backgroundColor: 'rgba(50, 0, 150, 0.5)',borderColor: [],borderWidth: 1,
					barThickness : (id == 'india') ? 30 : 10,
				},
			]
		},
		options: {
			tooltips: { mode: 'index', intersect: true, reverse: true, 
					backgroundColor	: 'rgba(0, 0, 0, 0.7)',
						callbacks: {
							afterLabel: function(tooltipItem, data){
								var index = tooltipItem.index;
								var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
								// var total = (parseInt(data.datasets[3].data[index]))
								var denoValue = data.datasets[1].data[index]
								var numeValue = data.datasets[0].data[index]	
								var percentage = parseFloat((100*numeValue/denoValue).toFixed(2));
								var addline = 'Overall Positivity Rate: '+ percentage+'%'
								if (tooltipItem.datasetIndex == 0) {return addline};
							},
						}
					},
			labels: {display: true,},
				responsive: false,
			legend: {
				display: true, position: "bottom", reverse : true,
				labels: {fontColor: "#333",fontSize: 13}
				},
			scales: {
			xAxes: [{
				stacked : true, display : true,
				ticks:  {maxRotation: 0,minRotation: 60,fontSize: 12,offsetGridLines: false,}
				}],
			yAxes: [{ stacked : false, ticks: {beginAtZero: true,fontSize: 16,}
				}]
			}
		}
	});

}

var stname_conf100 ={};

function state_namefun(stnames) {
		stname_conf100 = stnames
		//for (var i in stname_conf100){
		//console.log(i,stname_conf100[i][0])
		//}
}

function plot_daily_testedRate(id, data, coldata){
	date_name = []
	xxname = []
	xxdata = []
	stname = []
	cum_actdat = []
	var coloR = []
	// var k = 0
	for (var xx in data){
		stname.push(xx)
		var eachdata = data[xx][1]
		act_data = []
		for (var i in eachdata){
			act_data.push(eachdata[i])
			if (xx=='Delhi'){date_name.push(data[xx][0][i])}
		}
		cum_actdat.push(act_data)
		// console.log(k,xx)
		// k = k+1
		
	}
	for (var i in coldata){
		coloR.push(coldata[i])
	}
	var hoveredDatasetIndex = -1;
		
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: date_name,
			datasets: [
				
				{
					label: stname[16],  //kl
					fill:false,
					data: cum_actdat[16],
					lineTension: 0.1, //borderColor: "rgba(50,100,105,1)", pointBackgroundColor: "rgba(50,100,105,1)",
					borderDash: [], borderColor: coloR[16], pointBackgroundColor: coloR[16], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[15],  //as
					fill:false,
					data: cum_actdat[15],
					lineTension: 0.1, //borderColor: "rgba(0,0,255,1)", pointBackgroundColor: "rgba(0,0,255,1)",
					borderDash: [], borderColor: coloR[15], pointBackgroundColor: coloR[15], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[9], //hr
					fill:false,
					data: cum_actdat[9],
					lineTension: 0.1, //borderColor: "rgba(100,100,0,1)", pointBackgroundColor: "rgba(100,100,0,1)",
					borderDash: [], borderColor: coloR[9], pointBackgroundColor: coloR[9], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				
				{
					label: stname[8], //ka
					fill:false,
					data: cum_actdat[8],
					lineTension: 0.1, //borderColor: "rgba(100,50,0,1)", pointBackgroundColor: "rgba(100,50,0,1)",
					borderDash: [], borderColor: coloR[8], pointBackgroundColor: coloR[8], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				
				{
					label: stname[7],  //wb
					fill:false,
					data: cum_actdat[7],
					lineTension: 0.1, //borderColor: "rgba(200,0,200,1)", pointBackgroundColor: "rgba(200,0,200,1)",
					borderDash: [], borderColor: coloR[7], pointBackgroundColor: coloR[7], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[6],  //mp
					fill:false,
					data: cum_actdat[6],
					lineTension: 0.1, //borderColor: "rgba(255,0,100,1)", pointBackgroundColor: "rgba(255,0,100,1)",
					borderDash: [], borderColor: coloR[6], pointBackgroundColor: coloR[6], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[5], // rj
					fill:false,
					data: cum_actdat[5],
					lineTension: 0.1, //borderColor: "rgba(0,255,200,1)", pointBackgroundColor: "rgba(0,255,200,1)",
					borderDash: [], borderColor: coloR[5], pointBackgroundColor: coloR[5], 
					pointBorderWidth: 0, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[4], //up
					fill:false,
					data: cum_actdat[4],
					lineTension: 0.1, //borderColor: "rgba(180,180,0,1)",  pointBackgroundColor: "rgba(180,180,0,1)",
					borderDash: [], borderColor: coloR[4], pointBackgroundColor: coloR[4], 
					pointBorderWidth: 0, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[3], // gj
					fill:false,
					data: cum_actdat[3],
					lineTension: 0.1, //borderColor: "rgba(0,100,255,1)", pointBackgroundColor: "rgba(0,100,255,1)",
					borderDash: [], borderColor: coloR[3], pointBackgroundColor: coloR[3], 
					pointBorderWidth: 1, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[2], //delhi
					fill:false,
					data: cum_actdat[2],
					lineTension: 0.1, //borderColor: "rgba(200,0,0,0.9)",  pointBackgroundColor: "rgba(200,0,0,0.9)",
					borderDash: [], borderColor: coloR[2], pointBackgroundColor: coloR[2], 
					pointBorderWidth: 0, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[1], //tn
					fill:false,
					data: cum_actdat[1],
					lineTension: 0.1, //borderColor: "rgba(0,100,0,1)", pointBackgroundColor: "rgba(0,100,0,1)",
					borderColor: coloR[1], pointBackgroundColor: coloR[1], borderDash: [], 
					pointBorderWidth: 0, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[0], // mh
					fill:false,
					data: cum_actdat[0],
					lineTension: 0.1, //borderColor: "rgba(0,0,0,1)", , pointBackgroundColor: "rgba(0,0,0,1)"
					borderColor: coloR[0], pointBackgroundColor: coloR[0], borderDash: [],
					pointBorderWidth: 0, pointHoverRadius: 4, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				
			]
		},
		options: {
		tooltips: {
			mode: 'index',
			intersect: true,
			reverse: true, 
			backgroundColor : 'rgba(0, 0, 0, 0.7)',
					custom: function(tooltip) {
						if (hoveredDatasetIndex != -1) {
						  var options = this.options || {};
						  var hoverOptions = options.hover || {};
						  var ci = this._chartInstance.chart.controller;
						  ci.updateHoverStyle(ci.getDatasetMeta(hoveredDatasetIndex).data, hoverOptions.mode, false);
						  hoveredDatasetIndex = -1;
						  ci.render();
						}
					},
					itemSort: (a, b, data) => b.yLabel - a.yLabel
					
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
      labels: {fontColor: "#333",fontSize: 13, usePointStyle: true, boxWidth: 10,},
			// onHover: function(event, legendItem) {
				// var options = this.options || {};
				// var hoverOptions = options.hover || {};
				// var ci = this.chart;
				// hoveredDatasetIndex = legendItem.datasetIndex;
				// ci.updateHoverStyle(ci.getDatasetMeta(hoveredDatasetIndex).data, hoverOptions.mode, true);
				// ci.render();
		  // }
	 
		
    },
    scales: {
      xAxes: [{
	  stacked : (id == 'india') ? false : true,
	  id : "bar-x-axis1",
	  display : true,
        ticks: {maxRotation: 00,minRotation: 45,fontSize: 13,offsetGridLines: false, autoSkip: true,
		maxTicksLimit: 12,}
      }],
      yAxes: [{
	  ticks: {beginAtZero: true,fontSize: 16, max: 40, min: 0,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
					  return value ;//pass tick values as a string into Number function
				      }
	  },
	  scaleLabel: {
        display: true,
        labelString: "%",
        fontColor: "black",
		fontSize: 18,
      },
	  type: 'linear',
				
      }]
    }
  }

	});
	
$("#ratelinear").on("click", function (){
		myChart.options.scales.yAxes[0] = {
				type : 'linear',
				scaleLabel: {
					display: true,
					labelString: "%",
					fontColor: "black",
					fontSize: 18,
				},
				ticks: {beginAtZero: true,fontSize: 16,max: 40, min: 0}
		};
		myChart.update();
	
});
$("#ratelog").click( function (){
		myChart.options.scales.yAxes[0] = {
				scaleLabel: {
					display: true,
					labelString: "%",
				fontColor: "black",
				fontSize: 18,
				},
				type : 'logarithmic',
				ticks: {beginAtZero: true,fontSize: 16, max: 50, min: 0,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
				      i
					  return value ;//pass tick values as a string into Number function
				      }
				},
				 afterBuildTicks: function(allcountline) {    
                        allcountline.ticks = [];
                        allcountline.ticks.push(0);
                        allcountline.ticks.push(0.5);
                        allcountline.ticks.push(1);
                        allcountline.ticks.push(2);
                        allcountline.ticks.push(5);
						allcountline.ticks.push(10);
						allcountline.ticks.push(20);
						allcountline.ticks.push(50);
                      }
		};
		
		myChart.update();
	})


}

var api = 'https://api.covid19india.org/states_daily.json'
var request = new XMLHttpRequest()

request.open('GET', api, true)
request.onload = function() {
	var data = JSON.parse(this.response)
	
	var state_mh = {}
	var act_plotdata = {}

	//  data set

	var district_data = data.states_daily;
	
	var idx = ["mh", "tn", "dl", "gj", "up", "rj", "mp", "wb", "ka", "hr", "br", "ap", "jk", "pb", "or",
				"as", "kl"];//"tg", 
	var sname = ["Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh",
				 "West Bengal", "Karnataka", "Haryana", "Bihar", "Andhra Pradesh", "Jammu and Kashmir", "Punjab",  
				 "Odisha", "Assam", "Kerala"]; //"Telangana"
	
	for (var itm in idx) {
		
			var i = 0;
			var state_daily = {}
			var state_daily_apr = {}
			var cum_data = {}
			var	conf = 0
			var conf_cum =0 
			var dec = 0
			var dec_cum = 0
			var rec =0
			var rec_cum = 0
			var date ;	
			var act_cum = 0

			//console.log(idx[itm])
			
			for (var district=0; district < district_data.length; district++){
			var data_values = district_data[district]
			
			//console.log(data_values)
			//act = act + data_values.active
				if (district%3 ==0 ) {
					date = data_values.date;
					conf = data_values[idx[itm]];
					if (conf == "") {conf = 0}
					conf_cum = parseInt(conf_cum) + parseInt(conf)
					i = i+1;
				} 
				if ((district+1)%3 ==0) {
					dec = data_values[idx[itm]];
					dec_cum = parseInt(dec) + parseInt(dec_cum)
					
					} 
				if ((district-1)%3 ==0) {
					rec = data_values[idx[itm]];
					if (rec < 0) {rec = 0}
					rec_cum = parseInt(rec) + parseInt(rec_cum)
					
				}
			//state_daily[i] = [date, conf, rec, dec]
				if (i>=49) {
				var j = i-49
				state_daily_apr[j] = [date, conf, rec, dec]
				act_cum = conf_cum - (rec_cum + dec_cum)
				cum_data[j] = [date, conf_cum, act_cum, rec_cum, dec_cum]
				}
				
				
			}
			
			act_plotdata[sname[itm]] = cum_data
			state_mh[sname[itm]] = state_daily_apr;
			//console.log(state_mh)
		}
	senddat(state_mh,act_plotdata)
}

request.send()

function senddat(stateDailyData,stateCumData){
	var api2 = 'https://api.covid19india.org/state_test_data.json'
	var request2 = new XMLHttpRequest()

	request2.open('GET', api2, true)
	request2.onload = function () {
		var data = JSON.parse(this.response)
		
		// Population data
		var stname = ["Andhra Pradesh","Bihar","Chandigarh","Delhi","Gujarat","Haryana",
						"Jammu and Kashmir","Jharkhand","Karnataka","Kerala", "Madhya Pradesh",
						"Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana",
						"Tripura", "Uttar Pradesh", "Assam", "Uttarakhand", "Himachal Pradesh",
						"Chhattisgarh","Goa","Nagaland", "Manipur", "Puducherry"]
		var stpop = [53903393, 124799926, 1158473, 18710922, 63872399, 28204692,
					13606320, 38593948, 67562686, 35699443, 85358965, 123144223, 46356334,
					30141373, 81032689, 77841267, 39362732, 4169794, 237882725, 35607039, 11250858, 
					 7451955, 29436231, 1586250, 2249695, 3091545, 1413542]
		var popdata = [stname,stpop]
		//  data set
		tested_data = {};
		
		var stateTestData = data.states_tested_data;
		var state = {};
		var tottested = {};
		
		var testpermi = {};
		var pospermil = {};
		var updatedate = {};
		var ttpermi = {};
		
		
		for (var i in stateTestData){
			var data_values = stateTestData[i]
				
			state[i] = data_values.state
			
			updatedate[i] = data_values.updatedon
			
			tottested[i] = data_values.totaltested
			if (tottested[i] == ""){tottested[i]=0}
			
		}
		var j = 0;
		var sttest = {};
		var Testdate = {};
		var cumtest = {};
		var tempdata = {};
		var dtmp = {};
		var dailytest = {};
		for (var st in stateDailyData){
			for (var i in state){
				if (st == state[i]){
					if (updatedate[i]=='01/05/2020'){
						dtmp[st] = [parseInt(i)]; 
					}
				}
			}
		}
		
		
		for (var st in stateDailyData){
			for (var i in state){
				if (st == state[i]){
					
					if (parseInt(i)>=dtmp[st]){
						
						sttest[j] = tottested[i]
						Testdate[j] = updatedate[i]
						dailytest[j] = parseInt(tottested[i])-parseInt(tottested[i-1])
						tempdata[j] = [Testdate[j],dailytest[j],parseInt(tottested[i])]
						cumtest[st] = tempdata
						j = j+1
					}
				}
				if (state[i]!=state[i-1]){
					sttest = {}; stTestdate = {}; j = 0; tempdata = {};
				
				}
				
			}
				
		}
		
		
		
		var rateconfdaily = {};
		var rate = {};
		var posrate = {};
		
		
		var testdate = {};
		var eachtestfix = {};
		var prate = {};
		var plottestdate = {};
		var poscase = {};
		for (var st in stateDailyData){
			
			var eachstatedaily = stateDailyData[st]
			var eachtest = cumtest[st]
			
			var testidx = Object.keys(cumtest[st]).length-1
			
			var k = 0;
			for (var i in eachstatedaily){
				testdate[k] = parseInt(eachtest[k][0].split('/'))

				if (Object.keys(eachstatedaily).length == Object.keys(eachtest).length){
					prate[i] = (100*(eachstatedaily[i][1]/eachtest[i][1])).toFixed(2)
					plottestdate[i] = eachstatedaily[i][0]
					rateconfdaily[st] = [plottestdate,prate]
				} else {
					poscase[i] = eachtest[k][1]
					if (testdate[k]-testdate[k-1]==2){
						poscase[i] = eachtest[k][1]/2
						var ku = parseInt(i)+1
					}
					if (parseInt(i)==ku){
						poscase[i] = poscase[i-1]
						k = k-1
					}
					posrate[i] = (100*(eachstatedaily[i][1]/poscase[i])).toFixed(2)
					plottestdate[i] = eachstatedaily[i][0]
					rateconfdaily[st] = [plottestdate,posrate]
				}
				
				if (k < testidx){k = k+1}
				
			}
			
			prate={}; plottestdate = {}; posrate = {};
		}
		
		var tempcol = []
		var dynamicColors = function() {
			var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			return "rgb(" + r + "," + g + "," + b + ")";
		};
		var ttcas = {};//total tests of each state
		var pst = {};// Total cases of each state
		
		for (var st in stateDailyData){
			
			var caseidx = Object.keys(stateDailyData[st]).length-1
			var testidx = Object.keys(cumtest[st]).length-1
			rancolor = dynamicColors()
			tempcol[st] = rancolor
			ttcas[st] = cumtest[st][testidx][2]
			pst[st] = stateCumData[st][caseidx][1]
			while (ttcas[st] == 0){
				testidx = testidx-1;
				ttcas[st] = cumtest[st][testidx][2]
				// caseidx = caseidx -1;
				// pst[st] = stateCumData[st][caseidx][1]
			}
			
			for (var j in stname){
				if (st==stname[j]){
					testpermi[st] = parseInt((ttcas[st]/stpop[j])*1000000)
					pospermil[st] = parseInt((pst[st]/stpop[j])*1000000)
				}
				
			}
	
		}
		
		tested_data = [pst,ttcas,testpermi, pospermil]
		
		plot_tested_state_Data('teststateplot', tested_data)
		plot_state_permin_Data('statepermilplot', tested_data)
		plot_daily_testedRate('dailytestedRate',rateconfdaily,tempcol)


	}

	request2.send()
}