//Grapheneinstellungen
var config = {
    // Typ des Graphen, in unserem Fall ein Linien bzw. Kurvendiagramm
    type: 'line',

    // Daten des Graphen
    data: {
        labels: [], //Datenbeschriftung and der X-Achse
        datasets: [{
            data: [], //Datenpunkte, zum Zeitpunkt der Graphenerstellung noch leer
        }]
    },

    // Konfigurationsoptionen
    options: {
        responsive: true,
        maintainAspectRatio: false, //Wichtig um die Größe bei Html bearbeiten zu können
        layout: { //Position auf der Website, bzw Abstand zum Rand
            padding: {
                left: 50,
                right: 100,
                top: 0,
                bottom: 0
            }
        }
    }
};
var ctx = document.getElementById('myChart').getContext('2d'); //dem Chart 'myChart' werden die Einstellungen zugeordnet
var chart = new Chart(ctx, config);

var hourcounter = 1;
function addnewData(label,dataPoint,maxdisplayed,steps){ 
    if(config.data.datasets[0].data.length>=maxdisplayed){ //Begrenzen auf die letzten 100 Messwerte, der letzte wird beim hinzufügen eines Neuen gelöscht
        config.data.labels.splice(0, 1); // ersten Label entfernen
        config.data.datasets.forEach(function(dataset) {
        dataset.data.splice(0, 1); // ersten Datenpunkt entfernen
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

