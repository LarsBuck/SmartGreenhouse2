//chart
var config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            data: [],
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 50,
                right: 100,
                top: 0,
                bottom: 0
            }
        }
    }
};
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, config);
var hourcounter = 1;
function addnewData(label,dataPoint,maxdisplayed,steps){
    if(config.data.datasets[0].data.length>=maxdisplayed){ //Begrenzen auf die letzten 100 Messwerte
        config.data.labels.splice(0, 1); // remove first label
        config.data.datasets.forEach(function(dataset) {
        dataset.data.splice(0, 1); // remove first data point
    });    
        chart.update();
    }
    if(steps!=1){ //Entweder wird für jeden Datenpunkt ein Zeitstempel gesetzt oder nur alle "step" Stellen
        if(hourcounter==steps){
            config.data.labels.push(label); 
            hourcounter=1;
        }else{
            config.data.labels.push(""); 
        }
        hourcounter++;
    }else{
        config.data.labels.push(label); 
    }
    
    config.data.datasets[0].data.push(dataPoint);
    chart.update();    
};

