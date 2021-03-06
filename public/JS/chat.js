var socket = io();

function scrollToBottom () {

  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)    
  }

}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err){
      alert(err)
      window.location.href ='/';
    } else{
      console.log('No error')
    }
  });

  console.log('Connected to server');
});   // EMITTER TO JOIN WITH PARAMS REQUIRED

socket.on('disconnect',  () => {
  console.log('Disconnected from server');
});

socket.on('updateUsersList', users => {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
  //console.log('USERS LIST', users);
});

socket.on('newMessage', function (message) {

  var FT = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template,{
    text:message.text,
    from: message.from,
    createdAt: FT
  })
  jQuery('#messages').append(html);
  console.log('newMessage', message);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${FT}: ${message.text}`);
  // jQuery('#messages').append(li);
});
  socket.on('newMessage2', function (message) {
  console.log('newMessage2', message);
  var FT = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template,{
    text:message.text,
    from: message.from,
    createdAt: FT
  })
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // li.text( `${message.from} ${FT}: ${message.text}`);
  // jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
  var FT = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    URL: message.url,
    createdAt: FT
  })
 jQuery('#messages').append(html);
 scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${FT}`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});


// socket.emit('createAckMessage', {
//   from:'',
//   text:'',
// }, function(data){
//   console.log('Got it', data)
// }); 

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createAckMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
      messageTextbox.val('')
  });
});



var locationButton = jQuery('#sendlocation');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported in your browser')
  }
  locationButton.attr("disabled",'disabled').text('sending location.....');
  navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('send location')
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    console.log(position)
  }, function(){
    alert('Unable to fetch location');
  });
});

