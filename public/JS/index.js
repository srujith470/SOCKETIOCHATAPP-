var socket =  io(); //we are making a connection from client to server and keep that open
    socket.on('connect', function()  {
        console.log('log statement in index.html');

        socket.emit('recieveEmail', {
            to:'    asdfghjkl@gmail.com',
            text:'HAI HOW ARE YOU',
            createdAt:12345678
        }); //EMITTER

        socket.emit('createMessage', {
            from:'aamir',
            text:'EMIT MESSAGE',
            createdAt:0987654321
        }); //EMITTER

    });

    socket.on('disconnect', function()  {
        console.log('disconnect server index.html');
    });

    socket.on('newEmail', function(email) {
        console.log('New Email', email); // LISTNER EMAIL RECIEVED
    });

    socket.on('newMessage', function(message) {
        console.log('newMessage', message); // LISTNER MESSAGE RECIEVED
    });
