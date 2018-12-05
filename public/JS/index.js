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
