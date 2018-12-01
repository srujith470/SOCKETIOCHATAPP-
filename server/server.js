const path = require("path"); // builtin module
const express = require("express");
const socketIO = require('socket.io');
const http = require('http') // built in module

const port = process.env.PORT  || 3000
const publicPath = path.join(__dirname + '/../public')
var app = express();
var server = http.createServer(app);
var IO = socketIO(server);

IO.on('connection', function(socket) {
    console.log('A user connected');
    
    socket.on('createMessage', function(message) {
        console.log('createMessage', message);
        IO.emit('BroadcastMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getDate
        });
    }); //LISTNER


    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    }); 

    socket.on('recieveEmail', (newEmail) => {
        console.log('recieveEmail', newEmail) // LISTMER
    });
    
    socket.emit('newMessage', {
        from: 'akshay',
        text:'EMIT NEW MESSAGE',
        createdAt: 12345678901
    }); // EMITTER USER SENT EMAIL



    socket.emit('newEmail', {
        from: 'asdfgh@gmail.com',
        text:'data from emitter',
        createdAt: 12345
    }); // EMITTER USER SENT EMAIL

 
});
 

app.use(express.static(publicPath));

server.listen(3000, () => {
    console.log(`STARTING SERVER ON PORT ${port}`);
});
//console.log(__dirname + '/../public'); // here public and  server are at same level so we use and go one level up
console.log('this is absolute path :', + '\n' + publicPath); 
