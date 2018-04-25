
function setallSubscribers(names,data){
 client.on('message', function(topic, message) {
        for(i=0;i<names.length;i++){
            if(topic.toString()=="/smartGreenhouse/Sollwerte/"+names[i]){
            temp=('#tdata'+i).toString();
            $(temp).text(message.toString());
            data[i]=message.toString();
            }
        }
        updateTable();
        console.log(data);
 });
    for(i=0;i<names.length;i++){
      client.subscribe('/smartGreenhouse/Sollwerte/'+names[i]);
    } 
}

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
      client.subscribe('/smartGreenhouse/Sollwerte/'+name);
}

function setPublisher(name,data){
 setInterval(function(){
        data[i]=data[i].split('').join(',')  //Wichtig Payload der Funktion nur als charArray, daher den String vorher zerteilen !
        client.publish('/nodemcu/Sollwerte/'+names, data);
  }, 1000);
}
*/