const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {isRealString} = require('./utils/validation');
const {genrateMessage, genrateLocationMessage} = require('../server/utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room are Required');
    } 

    socket.join(params.room); 

    socket.emit('newMessage', genrateMessage('Admin', 'WELCOME TO CHATAPP'));
    socket.broadcast.to(params.room).emit('newMessage', genrateMessage('Admin', `${params.name} has joined`));
  
    // socket.leave() socket.join these two help to join or exit room. 
    // here we use io.emit(target message to all users).io.to('ROOM NAME').emit
    //socket.broadcast.emit (sends toevery one exept for current user). socket.broadcast.to('ROOM NAME').emit
    // socket.emit to single targetted user
    callback()

  });


socket.on('createAckMessage',  (message, callback) => {
  console.log('createAckMessage', message);
  io.emit('newMessage', genrateMessage(message.from, message.text));
  callback('this is from server');  
});

  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });

  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // });


  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', 
    genrateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('createMessage2', (message) => {
    console.log('createMessage2', message);
    // io.emit('newMessage2', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    //  socket.broadcast.emit('newMessage2', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    //  });
     socket.broadcast.emit('newMessage2',
     genrateMessage(message.from, message.text))
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
