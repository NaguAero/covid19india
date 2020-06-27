function plot2Data(id, data, mst, mds, selid){

		
		//if (myChart){myChart.destroy(); console.log('detroyed')}
	
		date_name = []
		act_data = []
		conf_data = []
		dec_data = []
		rec_data = []
		var updata = {};
		var disupdat = {};
		
		//console.log(data)
		var datin = data[mst][mds]
		for (var i in datin[0]){
			date_name.push(datin[0][i])
			conf_data.push(datin[1][i])
			rec_data.push(datin[2][i])
			dec_data.push(datin[3][i])
			
		}
	
	
	//console.log(date_name)
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
			  labels: {fontColor: "#333",fontSize: 13, usePointStyle: true, boxWidth: 30, fontStyle: 'bold'}
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
				ticks: {beginAtZero: true,fontSize: 16, min: 0}
			  }]
			}
		}

	});
	
	
	
		
var id_dis = $('#dist_sel')		 //$('#'+idsel[1])

selid.on('change', function () {
	var optionSelected = $("option:selected", this);
	var valueSelected = this.value;
	//var b=$(':selected').val();  // district value 
	
	updata = data[valueSelected]
	id_dis.empty()	
	
	for (var d in updata){
		id_dis.append(
			$('<option></option>').val(d).html(d)
		);
	}
	
	var newdis = $("#dist_sel option:selected" ).text();
	
	var date_name1 = []
	var conf_data1 = []
	var act_data1= []
	var rec_data1 = []
	var dec_data1 = []
	
	disupdat = updata[newdis]
	for (var i in disupdat[0]){
		date_name1[i] = disupdat[0][i]
		conf_data1[i] = disupdat[1][i]
		rec_data1[i] = disupdat[2][i]
		dec_data1[i] = disupdat[3][i]
		
	}
	myChart.data.labels = date_name1
	myChart.data.datasets[0].data = dec_data1
	myChart.data.datasets[1].data = rec_data1
	myChart.data.datasets[2].data = conf_data1
	myChart.update();
	
	
	
	
});

id_dis.on('change', function () {
	var optiondis = $("option:selected", this);
	var valueSel = this.value;
	var stateSelected = $("#st_sel option:selected" ).text();
	
	disupdat = data[stateSelected][valueSel]
	var date_name1 = []
	var conf_data1 = []
	var act_data1= []
	var rec_data1 = []
	var dec_data1 = []
	for (var i in disupdat[0]){
		date_name1[i] = disupdat[0][i]
		conf_data1[i] = disupdat[1][i]
		rec_data1[i] = disupdat[2][i]
		dec_data1[i] = disupdat[3][i]
		
	}
	myChart.data.labels = date_name1
	myChart.data.datasets[0].data = dec_data1
	myChart.data.datasets[1].data = rec_data1
	myChart.data.datasets[2].data = conf_data1
	myChart.update();
});

}	

function plot_st_cumData(id, data, mst, ds, selid){
	date_name = []
	
	conf_data = []
	dec_data = []
	rec_data = []
	stname = []
	act_data = []
	var updata = {};
	
	
	var disdata = data[mst][ds]
	for (var i in disdata[0]){
		date_name.push(disdata[0][i])
		conf_data.push(disdata[1][i])
		act_data.push(disdata[2][i])
		rec_data.push(disdata[3][i])
		dec_data.push(disdata[4][i])
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
      labels: {fontColor: "#333",fontSize: 13, usePointStyle: true, boxWidth: 30, fontStyle: 'bold'}
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
	  ticks: {beginAtZero: true,fontSize: 16, min:0,
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

		
var id_dis = $('#dist_sel')		 //$('#'+idsel[1])

selid.on('change', function () {
	var optionSelected = $("option:selected", this);
	var valueSelected = this.value;
	//var b=$(':selected').val();  // district value 
	
	updata = data[valueSelected]
	id_dis.empty()	
	for (var d in updata){
		id_dis.append(
			$('<option></option>').val(d).html(d)
		);
	}
	var newdis = $("#dist_sel option:selected" ).text();
	
	
	var date_name2 = []
	var conf_data2 = []
	var act_data2= []
	var rec_data2 = []
	var dec_data2 = []
	disupdat = updata[newdis]
	
	for (var i in disupdat[0]){
		date_name2[i] = disupdat[0][i]
		conf_data2[i] = disupdat[1][i]
		act_data2[i] = disupdat[2][i]
		rec_data2[i] = disupdat[3][i]
		dec_data2[i] = disupdat[4][i]
	}
	
	myChart.data.labels = date_name2
	myChart.data.datasets[0].data = dec_data2
	myChart.data.datasets[1].data = rec_data2
	myChart.data.datasets[2].data = act_data2
	myChart.data.datasets[3].data = conf_data2
	myChart.update();
	
	
	//if (valueSelected == 'Tamil Nadu') {id_dis.val('Chennai')}
	
});

id_dis.on('change', function () {
	var optiondis = $("option:selected", this);
	var valueSel = this.value;
	var stateSelected = $("#st_sel option:selected" ).text();
	
	disupdat = data[stateSelected][valueSel]
	var date_name2 = []
	var conf_data2 = []
	var act_data2= []
	var rec_data2 = []
	var dec_data2 = []
	for (var i in disupdat[0]){
		date_name2[i] = disupdat[0][i]
		conf_data2[i] = disupdat[1][i]
		act_data2[i] = disupdat[2][i]
		rec_data2[i] = disupdat[3][i]
		dec_data2[i] = disupdat[4][i]
		
	}
	myChart.data.labels = date_name2
	myChart.data.datasets[0].data = dec_data2
	myChart.data.datasets[1].data = rec_data2
	myChart.data.datasets[2].data = act_data2
	myChart.data.datasets[3].data = conf_data2
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
				ticks: {beginAtZero: true,fontSize: 16, max: 100000, min : 0,
				  callback: function(value, index, values) {//needed to change the scientific notation results from using logarithmic scale
				      return Number(value.toString());//pass tick values as a string into Number function
				      }
				  },
				 afterBuildTicks: function(allcountline) {    
                        allcountline.ticks = [];
                        allcountline.ticks.push(0);
                        //allcountline.ticks.push(10);
                        allcountline.ticks.push(1000);
                        allcountline.ticks.push(5000);
                        allcountline.ticks.push(10000);
						allcountline.ticks.push(50000);
						
						allcountline.ticks.push(100000);
                      }
		};
		
		myChart.update();
	})


}	




var api = 'https://api.covid19india.org/districts_daily.json'
var request = new XMLHttpRequest()

request.open('GET', api, true)
request.onload = function() {
	var data = JSON.parse(this.response)
	
	var idx = ["mh", "tn", "dl", "gj", "up", "rj", "mp", "wb", "ka", "hr", "br", "ap", "jk",  
				"tg", "or", "as", "pb", "kl"];
	var sname = ["Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Uttar Pradesh", "Rajasthan", 
				"Madhya Pradesh",  "West Bengal", "Karnataka", "Haryana", "Bihar", "Andhra Pradesh", 
				"Jammu and Kashmir", "Telangana", "Odisha", "Assam", "Punjab", "Kerala"]
	var dname = ['Mumbai', 'Chennai', 'Unknown', 'Ahmedabad', 'Gautam Buddha Nagar', 'Jaipur',
				'Indore', 'Kolkata', 'Udupi', 'Gurugram', 'Bhagalpur', 'Kurnool', 'Kulgam','Hyderabad',
				'Ganjam', 'Unknown', 'Amritsar', 'Kasaragod']

	var mumbai = {};
	var dailymum = {};
	// district id from html:

	//  data set
	var idsel = [];
	var plotStDis = {};
	var input = $("select").each(function (i) {
		idsel[i] = $(this).attr('id');
		//alert($(this).attr('id'));
		//alert($(this).attr('name'));
		
	});
	
	var all_data = data.districtsDaily;
	var id_select = $('#'+idsel[0])
	var id_dis = $('#'+idsel[1])
	for (var st in all_data){
		var dat_val = all_data[st]
		
		id_select.append(
			$('<option></option>').val(st).html(st)
		);
		id_select.val(sname[0])
	}
	
	for (var d in all_data.Maharashtra){
		
		id_dis.append(
			$('<option></option>').val(d).html(d)
		);
	}
	id_dis.val(dname[0])
	var stateSelected = sname[0]
	plotStDis = [stateSelected,dname[0]]
	
	
	// for (var i in idx){
		
		// //var id_tmp = idx[i]+'_'+'dist'+'_'+'Sel'
		// //var id_tmp = $('select').attr('id');//.attr({id_tmp})
		// var id_select = $('#'+idsel[i])
		// var stdata = all_data[sname[i]]
		// //console.log(id_tmp,id_select)
		// for (var dis in stdata){
			// id_select.append(
				// $('<option></option>').val(dis).html(dis)
			// );
		// }
		// id_select.val(dname[i])
	// }
	
	
	// var mhdata = all_data.Maharashtra;
	// var tn = "Tamil Nadu"
	// var tndata = all_data[tn];
	
	// var disSelect = $('#mh_dist_sel');
	// var tnSelect = $('#tn_dist_sel');
	// for (var dis in mhdata){
		// disSelect.append(
			// $('<option></option>').val(dis).html(dis)
		// );
		// disSelect.val('Mumbai')
	// }
	// for (var dis in tndata){
		// tnSelect.append(
			// $('<option></option>').val(dis).html(dis)
		// );
		// tnSelect.val('Chennai')
	// }
	
	// var dis_sel = $( "#mh_dist_sel :selected").text();
	
	
	var tconf = {};
	var trec = {};
	var tdec = {};
	var tact = {};
	var date = {};
	var dconf = {};
	var drec = {};
	var ddec = {};
	var dis_cases = {};
	var cumcases = {};
	var cum = {};
	var dcases = {};
	var daily = {};
	for (var st in all_data){
		//for (var i in idx){
			//if (st == sname[i]){
				var data_values = all_data[st]
				
				for (var dis in data_values){
					
					var dat = data_values[dis]
					for (var k in dat){
						var datin = dat[k]
					
						tconf[k] = datin.confirmed
						trec[k] = datin.recovered
						tdec[k] = datin.deceased
						tact[k] = tconf[k] - (trec[k] + tdec[k])
						date[k] = datin.date
						
						dconf[k] = tconf[k]
						drec[k] = trec[k]
						ddec[k] = tdec[k]
						if (k >=1 ){
							dconf[k] = tconf[k]-tconf[k-1]
							drec[k] = trec[k]-trec[k-1]
							ddec[k] = tdec[k]-tdec[k-1]
						}
					}
					cum[dis] = [date, tconf, tact, trec, tdec]
					daily[dis] = [date,dconf, drec, ddec]
					tconf = {}; trec = {}; tdec = {}; tact = {};
					dconf = {}; drec={}; ddec = {};
				}
				cumcases[st] = cum
				dcases[st] = daily
				cum = {}; daily = {};
			//}

		//}
		
	}
	
		
	plot2Data('maha', dcases, plotStDis[0], plotStDis[1], $('#st_sel'))
	plot_st_cumData('maha_cum',cumcases, plotStDis[0], plotStDis[1], $('#st_sel'))
	
	
	
	
	 
	
}

request.send()