var socket =  io(); //we are making a connection from client to server and keep that open
    socket.on('connect', function()  {
        console.log('log statement in index.html');

        // socket.emit('createMessage', {
        //     from:'aamir',
        //     text:'EMIT MESSAGE',
        //     createdAt:0987654321
        // }); //EMITTER

    });

    socket.on('createMessage', function(message) {
        console.log(message);
    });

    socket.on('disconnect', function()  {
        console.log('disconnect server index.html');
    });


