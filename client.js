var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1337;

var client = new net.Socket();
var HANDSHAKE;
client.connect(PORT, HOST, function () {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write('0802776511525735312700155570 login Perihel1on');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function (data) {

    console.log('DATA: ' + data);
    if (data.toString().startsWith("handshake")) {
        var h = data.toString().indexOf(" ");
        HANDSHAKE = data.toString().substr(h + 1);
    }

    // Close the client socket completely
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function () {
    console.log('Connection closed');
});