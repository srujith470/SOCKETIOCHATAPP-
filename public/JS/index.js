var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

});

socket.on('newMessage2', function (message) {
  console.log('newMessage2', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

});

socket.emit('createAckMessage', {
  from:'frank Ack',
  text:'Hi Ack',
}, function(data){
  console.log('Got it', data)
}); 

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createAckMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});



var locationButton = jQuery('#sendlocation');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported in your browser')
  }
  navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    console.log(position)
  }, function(){
    alert('Unable to fetch location');
  });
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);


})
