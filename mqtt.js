var client = mqtt.connect('wss://7ab8d043:4acf899e28d7740c@broker.shiftr.io:443', { //Wichtig wss und port! Sonst keine sichere Verbindung im Browser
  clientId: 'greenhouse-webapp'
});
 
client.on('connect', function(){
   console.log('client has connected!');
});

//Test Daten
var displayNames=["Lightstarttime","Lightstoptime","Lightlevel","LightSwitch","Temperature","Air-humidity","FanSwitch","Soil-humidity","dry target value","humid target value","PumpSwitch"];
var displayData=["10 uhr","20 uhr","20 Lumen","Off","20°C","60%","Off","50%","70%","60%","Off"]; 

    
function setallSubscribers(names,data){
 client.on('message', function(topic, message) {
        for(i=0;i<names.length;i++){
            if(topic.toString()=="/smartGreenhouse/Sollwerte/"+names[i]){
            temp=('#tdata'+i).toString();
            $(temp).text(message.toString());
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

function setallPublishers(names,data){    
   setInterval(function(){
    for(i = 0; i < names.length; i++){
        client.publish('/smartGreenhouse/Sollwerte/'+names[i], data[i]);
    } 
  }, 1000);
}





/*
function setSubscriber(name){
 client.on('message', function(topic, message) {
        $('#data3').text(message.toString());
 });
      client.subscribe('/smartGreenhouse/Sollwerte/Tabelle');
}

function setPublisher(name,data){
 setInterval(function(){
        data[i]=data[i].split('').join(',')  //Wichtig Payload der Funktion nur als charArray, daher den String vorher zerteilen !
        client.publish('/nodemcu/Sollwerte/'+names, data);
  }, 1000);
}
*/
