//Verbindungsaufbau zum Broker auf Shiftr.io
var client = mqtt.connect('wss://7ab8d043:4acf899e28d7740c@broker.shiftr.io:443', { //Wichtig wss und port! Sonst keine sichere Verbindung im Browser
  clientId: 'greenhouse-webapp'
});

//Bei erfolgreicher Verbindung Hinweis in der Browser Konsole
client.on('connect', function(){
   console.log('client has connected!');
});

//Array mit allen kommunizierten Daten und ihren Namen(wichtig keine Leerezichen im Namen!)
var displayNames=["LightStartTime","LightStopTime","LightLevel","LightSwitch","Temperature","AirHumidity","FanSwitch","SoilHumidity","DryTargetValue","HumidTargetValue","PumpSwitch"]; 
var displayData=["10 uhr","20 uhr","20 Lumen","Off","20°C","60%","Off","50%","70%","60%","Off"]; 

    
//Die Funktion abonniert alle im names Array spezifizierten Kanäle und speichert alle über diese Kanäle
//empfangenen Daten in den korrespondierenden Stellen im data Array und gibt die Daten in die Konsole aus.
function setallSubscribers(names,data){
 client.on('message', function(topic, message) {
        for(i=0;i<names.length;i++){
            if(topic.toString()=="/smartGreenhouse/Sollwerte/"+names[i]){
            data[i]=message.toString();
            }
        }
        console.log(data);
 });
    for(i=0;i<names.length;i++){
      client.subscribe('/smartGreenhouse/Sollwerte/'+names[i]);
    } 
}

setallSubscribers(displayNames,displayData);

//Die Funktion sendet jede Sekunde über alle im names Array spezifizierten Kanäle.
//Gesendet werden hierbei die korrespondierenden Daten im data Array.
function setallPublishers(names,data){    
   setInterval(function(){
    for(i = 0; i < names.length; i++){
        client.publish('/smartGreenhouse/Sollwerte/'+names[i], data[i]);
    } 
  }, 1000);
}

