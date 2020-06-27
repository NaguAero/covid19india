function plot2Data(id, data, mds, selid){
	date_name = []
	act_data = []
	conf_data = []
	dec_data = []
	rec_data = []
	var updata = {};
	
	var mydat = data[mds]
	
	for (var xx in mydat){
	date_name.push(mydat[xx][0])
	//active_data.push(data[state][1])
	conf_data.push(mydat[xx][1])
	dec_data.push(mydat[xx][3])
	rec_data.push(mydat[xx][2])
	}
		
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: date_name,
			datasets: [
				{
					label: 'Deceased',
					fill:true,
					data: dec_data,
					backgroundColor: 'rgba(255, 0, 0, 0.8)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				{
					label: 'Recovered',
					fill:false,
					data: rec_data,
					backgroundColor: 'rgba(0, 100, 0, 1)',borderColor: [],borderWidth: 1,
					barThickness : 5,
				},
				//{
				//	label: 'Active Cases',
				//	fill:false,
				//	data: active_data,
				//	backgroundColor: 'rgba(51, 51, 255, 0.8)',borderColor: [],borderWidth: 1,
				//	barThickness : 10,
				//	
				//},
				{
					label: 'Daily Confirmed',
					fill:false,
					data: conf_data,
					backgroundColor: 'rgba(50, 0, 150, 0.5)',borderColor: [],borderWidth: 1,
					barThickness : 5,
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
		text: 'Daily',
		fontSize: 16,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13, usePointStyle: true,fontStyle: 'bold'}
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
        ticks: {beginAtZero: true,fontSize: 16,}
      }]
    }
  }

	});

selid.on('change', function () {
	var optionSelected = $("option:selected", this);
	var valueSelected = this.value;
	//var b=$(':selected').val();  // district value 
	
	var date_name1 = []
	var conf_data1 = []
	var act_data1= []
	var rec_data1 = []
	var dec_data1 = []
	updata = data[valueSelected]
	
	
	for (var i in updata){
		date_name1[i] = updata[i][0]
		conf_data1[i] = updata[i][1]
		rec_data1[i] = updata[i][2]
		dec_data1[i] = updata[i][3]
		
	}
		myChart.data.labels = date_name1
		myChart.data.datasets[0].data = dec_data1
		myChart.data.datasets[1].data = rec_data1
		myChart.data.datasets[2].data = conf_data1
		myChart.update();
});

}	

function plot_st_cumData(id, data, mds, selid){
	date_name = []
	conf_data = []
	dec_data = []
	rec_data = []
	stname = []
	act_data = []
	var updata = {};
	
	var mydat = data[mds]
	
	for (var i in mydat){
		date_name.push(mydat[i][0])
		conf_data.push(mydat[i][1])
		act_data.push(mydat[i][2])
		rec_data.push(mydat[i][3])
		dec_data.push(mydat[i][4])
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
					pointBorderWidth: 0, pointHoverRadius: 5, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[1], //wb
					fill:false,
					data: rec_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 100, 0, 1)",  pointBackgroundColor: "rgba(0, 100, 0, 1)",
					pointBorderWidth: 0, pointHoverRadius: 5, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[2],  //pb
					fill:false,
					data: act_data,
					lineTension: 0.1,
					borderColor: "rgba(51, 51, 255, 0.9)",  pointBackgroundColor: "rgba(51, 51, 255, 0.9)",
					pointBorderWidth: 0, pointHoverRadius: 5, 
					pointHoverBorderWidth: 0, pointRadius: 0, pointHitRadius: 5,
				},
				{
					label: stname[3],  //ap
					fill:false,
					data: conf_data,
					lineTension: 0.1,
					borderColor: "rgba(0, 0, 0, 1)", pointBackgroundColor: "rgba(0, 0, 0, 1)",
					pointBorderWidth: 0, pointHoverRadius: 5, 
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
		display: true,
		text: 'Cummulative',
		fontSize: 16,
	},
	legend: {
      display: true,
      position: "bottom",
	  reverse : true,
      labels: {fontColor: "#333",fontSize: 13, usePointStyle: true,fontStyle: 'bold'}//boxWidth: 30, }
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
	
selid.on('change', function () {
	var optionSelected = $("option:selected", this);
	var valueSelected = this.value;
	//var b=$(':selected').val();  // district value 
	
	var date_name1 = []
	var conf_data1 = []
	var act_data1= []
	var rec_data1 = []
	var dec_data1 = []
	updata = data[valueSelected]
	
	// myChart.data.labels.pop();
	// myChart.data.datasets.forEach((dataset) =>{
		// datasets.data.pop();
	// });
	// myChart.update();
	for (var i in updata){
		date_name1[i] = updata[i][0]
		conf_data1[i] = updata[i][1]
		act_data1[i] = updata[i][2]
		rec_data1[i] = updata[i][3]
		dec_data1[i] = updata[i][4]
		
	}
	//console.log(date_name,date_name1)
		myChart.data.labels = date_name1
		myChart.data.datasets[0].data = dec_data1
		myChart.data.datasets[1].data = rec_data1
		myChart.data.datasets[2].data = act_data1
		myChart.data.datasets[3].data = conf_data1
		myChart.update();
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
						
						allcountline.ticks.push(500000);
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
	
	var state_mh = {};
	var act_plotdata = {};

	//  data set

	var district_data = data.states_daily;
	
	var idx = ["mh", "tn", "dl", "gj", "up", "rj", "mp", "wb", "ka", "hr", "br", "ap", "jk",  
				"tg", "or", "as", "pb", "kl"];
	var sname = ["Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Uttar Pradesh", "Rajasthan", 
				"Madhya Pradesh",  "West Bengal", "Karnataka", "Haryana", "Bihar", "Andhra Pradesh", 
				"Jammu and Kashmir", "Telangana", "Odisha", "Assam", "Punjab", "Kerala"]
	
	var idsel = [];
	//var st_sel = [];
	var input = $("select").each(function (i) {
		idsel[i] = $(this).attr('id');
		//alert($(this).attr('id'));
		//alert($(this).attr('name'));
	});
	
	//for (var i in idx){
		
		//var id_tmp = idx[i]+'_'+'dist'+'_'+'Sel'
		//var id_tmp = $('select').attr('id');//.attr({id_tmp})
		var id_select = $('#'+idsel)
		
		//console.log(id_tmp,id_select)
		for (var i in sname){
			id_select.append(
				$('<option></option>').val(sname[i]).html(sname[i])
			);
		}
		id_select.val(sname[0])
	//}
	
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
			act_cum = conf_cum - (rec_cum + dec_cum)
			if (i>=19) {
			var j = i-19
			state_daily_apr[j] = [date, conf, rec, dec]
			
			}
			
			
			cum_data[i-1] = [date, conf_cum, act_cum, rec_cum, dec_cum]
		}
		
		act_plotdata[sname[itm]] = cum_data
		state_mh[sname[itm]] = state_daily_apr;
		
	}
	
	
	//plotData('api_chart', state_data)
	plot2Data('maha', state_mh, 'Maharashtra', $('#st_sel'))
	plot_st_cumData('maha_cum',act_plotdata, 'Maharashtra', $('#st_sel'))
	
}

request.send()