js = {
    gameData: [],
    retentionData:[],
    gameNames: [],
    gameType: [],
    ratings: [[3.5,4.4],[3.8,4.7],[4.1,4.6],[4.5,4.3],[4.3,4.4]],
    index: 0,
    initDashboardPageCharts: function() {
        
    getGameData();
        
    Chart.defaults.global.defaultFontSize = "16";
    Chart.defaults.global.tooltips.enabled = false;

    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 100000,
            suggestedMax: 400000,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: 'top'
      },

      responsive: true,
      scales: {
        yAxes: [{
            id: 'A',
            position: 'left',
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
        
    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: 'top'
      },

      responsive: true,
      scales: {
        yAxes: [{
            id: 'A',
            position: 'left',
          gridLines: {
            drawBorder: false,
            color: 'rgba(255,179,71,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          gridLines: {
            drawBorder: false,
            color: 'rgba(255,179,71,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
  },
    initVectorMap: function() {
    var mapData = {
      "AU": 760,
      "BR": 550,
      "CA": 120,
      "DE": 1300,
      "FR": 540,
      "GB": 690,
      "GE": 200,
      "IN": 200,
      "RO": 600,
      "RU": 300,
      "US": 2920,
    };

    $('#worldMap').vectorMap({
      map: 'world_mill_en',
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: '#FFFFFF',
          "fill-opacity": 0.9,
          stroke: 'none',
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },

      series: {
        regions: [{
          values: mapData,
          scale: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial'
        }]
      },
    });
},
    
    showGameData: function(index){
    
        let game_data = js.gameData[index];
        if(game_data!=undefined){
        game_data = game_data.substring(0, game_data.length - 1);

        if(js.gameType[index]=="Launch"){
                hasOrAddHide($("#softlaunch"));
                hasOrRemoveHide($("#launch"));
                initTotalPlayTime(game_data);
                initDAU(game_data, js.gameType[index]);
            }else{
                hasOrAddHide($("#launch"));
                hasOrRemoveHide($("#softlaunch"));
                initRetention(js.retentionData[index]);
            }   
               initDownloads(game_data, js.gameType[index]);
               initSessionLength(game_data, js.gameType[index]);
               initTotalDownloads(game_data, js.gameType[index]);
               initRatings();
        }else{
            hasOrAddHide($("#launch"));
            hasOrRemoveHide($("#softlaunch"));
            initRetention(js.retentionData[index]);
        }
    }
};

setInterval(()=>{
    
  $( ".main-panel" ).fadeOut(600, function() {
      $( ".main-panel" ).fadeIn(1500);
      let next = $('li.current').next('li');
      let item = (next.length) ? next : $('li.current').prevAll('li').last();

      $('li.current').removeClass("current"); 
      item.addClass("current");
      
      js.index = item.data("index");
      if(js.index == undefined){
          js.index = 0;
      }
      
      let name = js.gameNames[js.index].replace(/ /g,'');
      
      $(".gameIcon").attr("src","assets/img/Chimpworks/GameIcons/"+
                          name + ".png");  
      $(".gameTitle").text(js.gameNames[js.index]);    
      
//      if(js.index!=undefined){
//          if(index == 1){
//            $(".worldmap").addClass('visuallyhidden');
//            $(".gameView")[0].style.visibility = "visible";
//            $(".gameView")[1].style.visibility = "visible";
//          }
//          js.showGameData(js.index);
//      }else{
//          showWorldMap();
//      }
      
       js.showGameData(js.index);
  });    
      
},15000);

function showWorldMap(){
    $(".worldmap").removeClass('visuallyhidden');
    $(".gameView")[0].style.visibility = "hidden";
    $(".gameView")[1].style.visibility = "hidden";
}

function getGameData(){
      $.ajax({
       url:"GA_Test01.csv",
       dataType:"text",
       success:function(data)
       {
        let game_data = data.split(/\r?\n|\r/);
        addToGameArray(game_data);   
        $.ajax({
           url:"test_amplitude_ret.csv",
           dataType:"text",
           success:function(data)
           {
            let game_data = data.split(/\r?\n|\r/);
            addRetentionData(game_data);
            setupNav();
           }
        });
       }
    });  
}

function setupNav(){
    let div = document.createElement("div"); 
    for(let i = 0; i<js.gameNames.length; i++){
        let li = document.createElement("li");
        li.setAttribute("data-index", i);
        if(i == 0){
            li.classList.add("current");
        }
        
        let name = js.gameNames[i].replace(/ /g,'');
        
        let img = document.createElement("img");
        img.src = "assets/img/Chimpworks/GameIcons/"+ name + ".png";
        img.classList.add("gameNav");
        li.appendChild(img);
        
        let p = document.createElement("p");
        p.textContent = js.gameNames[i];
        p.classList.add("gameTitleNav");
        li.appendChild(p);
        
        div.appendChild(li);
    }
    document.getElementById("nav").appendChild(div);
    
     //start first time
    let name = js.gameNames[js.index].replace(/ /g,'');
    $(".gameIcon").attr("src","assets/img/Chimpworks/GameIcons/"+
                          name + ".png");  
    $(".gameTitle").text(js.gameNames[js.index]); 
    js.showGameData(js.index); 
}

function addToGameArray(data){ 
    data.shift();
    $.each(data, (i, value)=>{
        let row_data = value.split(",");
        let index = js.gameNames.indexOf(row_data[0]);
        if(index == -1 && row_data[0]!= ""){
            js.gameNames.push(row_data[0]);
            js.gameType.push("Launch");
            let i = js.gameNames.indexOf(row_data[0]);
            row_data.shift();
            js.gameData[i] = "" + row_data;
            js.gameData[i] += ", ";
        }else{
            row_data.shift();
            js.gameData[index] += row_data;
            js.gameData[index] += ", ";
        } 
    }); 
}

function addRetentionData(data){
    data.shift();
    $.each(data, (ind, value)=>{
        let row_data = value.split(",");
        let index = js.gameNames.indexOf(row_data[0]);
        if(index == -1 && row_data[0]!= ""){
            js.gameNames.push(row_data[0]);
            js.gameType.push("SoftLaunch");
        }else{
            js.gameType[index]= "SoftLaunch";
        }
        let i = js.gameNames.indexOf(row_data[0]);
        row_data.shift();
        js.retentionData[i] = "" + row_data;
        js.retentionData[i] += ", ";
        
    });
}

function initDAU(game_data, type){
    let DAUlabels = [];
    let DAUdata = [];
    let rows = game_data.split(" ");
     $.each(rows, (index, value)=>{
        if(index !=0){
            let row_data = value.split(",");
            if(row_data[1]!=undefined){
                DAUlabels.push(row_data[0]);
                DAUdata.push(row_data[1]);
            } 
        }
    });  
    
//    let MAUdata;
//    if(type == "Launch"){
//        MAUdata = [7,2,3,2,8,6,7,8,9,10,3,7,1,4,6,9]; 
//        gradientChartOptionsConfigurationWithTooltipGreen.scales.yAxes.push(
//          {
//            id: 'B',
//            position: 'right',
//          gridLines: {
//            drawBorder: false,
//            color: 'rgba(29,140,248,0.0)',
//            zeroLineColor: "transparent",
//          },
//          ticks: {
//            suggestedMin: 50,
//            suggestedMax: 125,
//            padding: 20,
//            fontColor: "#9e9e9e"
//          }
//        });
//        gradientChartOptionsConfigurationWithTooltipGreen.scales.yAxes[1].ticks.suggestedMax = getMaxOrMin(MAUdata, true);
//        gradientChartOptionsConfigurationWithTooltipGreen.scales.yAxes[1].ticks.suggestedMin= getMaxOrMin(MAUdata,false);
//    }
    
   gradientChartOptionsConfigurationWithTooltipOrange.scales.yAxes[0].ticks.suggestedMax = getMaxOrMin(DAUdata, true);
   gradientChartOptionsConfigurationWithTooltipOrange.scales.yAxes[0].ticks.suggestedMin= getMaxOrMin(DAUdata,false);
    

    var ctx = document.getElementById("DAU" + type).getContext('2d');

    var greenGradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    greenGradientStroke.addColorStop(1, 'rgba(66,134,121,0.4)');
    greenGradientStroke.addColorStop(0.2, 'rgba(66,134,121,0.05)');
    greenGradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); 
    
    var orangeGradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    orangeGradientStroke.addColorStop(1, 'rgba(255,179,71,0.4)');
    orangeGradientStroke.addColorStop(0.2, 'rgba(255,179,71,0.05)');
    orangeGradientStroke.addColorStop(0, 'rgba(255,179,71,0)');
        
    var config = {
      type: 'line',
      data: {
        labels: DAUlabels,
        datasets: [{
          yAxisID: 'A',
          label: "DAU",
          fill: true,
          backgroundColor: orangeGradientStroke,
          borderColor: 'rgba(255,179,71,1)',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: 'rgba(255,179,71,1)',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: DAUdata,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipOrange
    };
    
//    if(type == "Launch"){
//        config.data.datasets.push(
//         {
//          yAxisID: 'B',
//          label: "MAU",
//          fill: true,
//          backgroundColor: orangeGradientStroke,
//          borderColor: 'rgba(255,179,71,1)',
//          borderWidth: 2,
//          borderDash: [],
//          borderDashOffset: 0.0,
//          pointBackgroundColor: 'rgba(255,179,71,1)',
//          pointBorderColor: 'rgba(255,255,255,0)',
//          pointBorderWidth: 20,
//          pointHoverRadius: 4,
//          pointHoverBorderWidth: 15,
//          pointRadius: 4,
//          data: MAUdata,
//        });
//    }
    var myChartData = new Chart(ctx, config);   
    
}

function initRetention(game_data){
    
     let RetentionLabels = ["Day 0","Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"];
     let retentionData = [];
     let days = game_data.split(",");
     days.pop();
     $.each(days, (index, value)=>{
         retentionData.push(days[index].replace('%','')); 
     });
   gradientChartOptionsConfigurationWithTooltipBlue.scales.yAxes[0].ticks.suggestedMax = 100;
   gradientChartOptionsConfigurationWithTooltipBlue.scales.yAxes[0].ticks.suggestedMin= 0;
   gradientChartOptionsConfigurationWithTooltipBlue.scales.yAxes[0].ticks.callback = function(value, index, values) {
                return value + '%';
           };
  

    var ctx = document.getElementById("Retention").getContext('2d');

    var blueGradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    blueGradientStroke.addColorStop(1, 'rgba(0,135,191,0.4)');
    blueGradientStroke.addColorStop(0.4, 'rgba(0,135,191,0.05)');
    blueGradientStroke.addColorStop(0, 'rgba(0,84,119,0)');
        
    var config = {
      type: 'line',
      data: {
        labels: RetentionLabels,
        datasets: [
        {
          fill: false,
          borderColor: 'rgba(255,179,71,1)',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: 'rgba(255,179,71,1)',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],
        },
        {
          fill: true,
          backgroundColor: blueGradientStroke,
          borderColor: 'rgba(0,135,191,1)',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: 'rgba(0,135,191,1)',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: retentionData,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipBlue
    };
    
    var myChartData = new Chart(ctx, config);   
    
}

function initTotalDownloads(game_data,type){
     let total = 0;
     let rows = game_data.split(" ");
     $.each(rows, (index, value)=>{
        if(index !=0){
            let row_data = value.split(",");
            if(row_data[3]!=undefined)
            total+=parseInt(row_data[2]);
        }
     }); 
     $("#totalDownloads" + type).text(NumberFormatter(total));
}

function initDownloads(game_data, type){
    let downloadLabels = [];
    let downloadData = [];
    
    let rows = game_data.split(" ");
    $.each(rows, (index, value)=>{
        if(index !=0){
            let row_data = value.split(",");
            if(row_data[1]!=undefined){
                downloadLabels.push(row_data[0]);
                downloadData.push(row_data[2]);
            } 
        }
     }); 
    
   gradientChartOptionsConfigurationWithTooltipPurple.scales.yAxes[0].ticks.suggestedMax = getMaxOrMin(downloadData, true);
   gradientChartOptionsConfigurationWithTooltipPurple.scales.yAxes[0].ticks.suggestedMin = getMaxOrMin(downloadData,false);
    
    var ctx = document.getElementById("downloads"+type).getContext("2d");

    var purpleGradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    purpleGradientStroke.addColorStop(1, 'rgba(208,72,182,0.4)');
    purpleGradientStroke.addColorStop(0.4, 'rgba(208,72,182,0.05)');
    purpleGradientStroke.addColorStop(0, 'rgba(208,72,182,0)');

    var data = {
      labels: downloadLabels,
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: purpleGradientStroke,
        borderColor: '#d048b6',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#d048b6',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#d048b6',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: downloadData,
      }]
    };
    
    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipPurple
    });
}

function initTotalPlayTime(game_data){
    let sessionLengthAmount= [];
    let rows = game_data.split(" ");
     $.each(rows, (index, value)=>{
        if(index !=0){
            let row_data = value.split(",");
            if(row_data[1]!=undefined){
                sessionLengthAmount.push(parseFloat(row_data[3])
                                         *parseFloat(row_data[1]));
            }
            
        }
     }); 
    
    let sum = sessionLengthAmount.reduce((a, b) => a + b, 0) / 14 / 60 /60;
    // 60 because from min to hours
    
     $("#totalPlayed").text(
         Math.floor(sum * 100) / 100 + " hours"
     );
}

function initSessionLength(game_data, type){
    let sessionLabels = [];
    let sessionData = [];
    
    let rows = game_data.split(" ");
     $.each(rows, (index, value)=>{
        if(index !=0){
            let row_data = value.split(",");
            if(row_data[1]!=undefined){
                sessionLabels.push(row_data[0]);
                sessionData.push(row_data[3]/60);
            } 
        }
     }); 
    
    
    var ctx = document.getElementById("Session" + type).getContext('2d');

    let gradientStroke;
    let color;
    let toolTip; 
    if(type == "Launch"){
        gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(0,135,191,0.4)');
        gradientStroke.addColorStop(0.4, 'rgba(0,135,191,0.05)');
        gradientStroke.addColorStop(0, 'rgba(0,84,119,0)');
        color = 'rgba(0,135,191,1)';
        toolTip = gradientChartOptionsConfigurationWithTooltipBlue;
        gradientChartOptionsConfigurationWithTooltipBlue.scales.yAxes[0].ticks.suggestedMax = getMaxOrMin(sessionData, true);
        gradientChartOptionsConfigurationWithTooltipBlue.scales.yAxes[0].ticks.suggestedMin = getMaxOrMin(sessionData,false);
    }else{
        gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(66,134,121,0.4)');
        gradientStroke.addColorStop(0.2, 'rgba(66,134,121,0.05)');
        gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); 
        color = 'rgba(66,134,121,1)';
        toolTip = gradientChartOptionsConfigurationWithTooltipGreen;
      gradientChartOptionsConfigurationWithTooltipGreen.scales.yAxes[0].ticks.suggestedMax = getMaxOrMin(sessionData, true);
      gradientChartOptionsConfigurationWithTooltipGreen.scales.yAxes[0].ticks.suggestedMin = getMaxOrMin(sessionData,false);
    }
    
    var data = {
      labels: sessionLabels,
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: color,
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: color,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: sessionData,
      }]
    };
    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: toolTip
    });
}

function initRatings(){
//    $("#PlayStoreRating").text(js.ratings[js.index][0]);
//    $("#AppStoreRating").text(js.ratings[js.index][1]);
}

function getMaxOrMin(stringArray, max){
    let numArray = [];
    $.each(stringArray, (index, value)=>{
        numArray.push(parseInt(value));
    }); 
    if(max){
        return Math.max.apply(Math, numArray);
    }
    return Math.min.apply(Math, numArray);
    
}

function NumberFormatter(number) {
	let numberString = number.toString();
    let numberStringArray = numberString.split("");
    for(let i=numberStringArray.length;i>=0;i=i-3){
        if(numberStringArray[i-1]!=undefined && i!=numberStringArray.length){
            numberStringArray.splice(i, 0, ".");
        }
    }
    return numberStringArray.join('');
}

function hasOrAddHide(obj){
    if(!obj.hasClass('visuallyhidden')){
        obj.addClass('visuallyhidden');
    }
}

function hasOrRemoveHide(obj){
    if(obj.hasClass('visuallyhidden')){
        obj.removeClass('visuallyhidden');
    }
}

function randomBool(){
    let result;
    let r = Math.round(Math.random());
    if(r == 0){
        return true;
    }
    return false;
}