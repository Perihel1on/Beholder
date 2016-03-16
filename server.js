var net = require("net");

var HOST = '127.0.0.1';
var PORT = 1337;

// Function to process client requests
function srvCmd(data) {
    // Convert the data object to a string
    newdata = data.toString();
    // Check the data string for a space, this will indicate a command with arguments
    var c = newdata.indexOf(" ");
    // If the space is found, separate the data into a command and command arguments
    if (c != -1) {
        var cmd = newdata.substring(0, c);
        var cmdArgs = newdata.substr(c + 1);
    } else {
        // If the above check did not find a space in the data, set as an argumentless command
        var cmd = newdata;
    }
    switch (cmd) {
        case 'test':
            console.log("Test command executed successfully.");
            return "Testing complete.";
            break;
        case 'handshake':
            console.log("Establishing handshake protocol...");
            HANDSHAKE = Math.random().toString() + client.toString();
            HANDSHAKE = HANDSHAKE.replace(/\./g, "");
            console.log("Handshake established.  Code is " + HANDSHAKE);
            return "handshake " + HANDSHAKE;
            break;
        case HANDSHAKE:
            console.log("Received command from confirmed client.");
            var h = cmdArgs.indexOf(" ");
            var hCmd = cmdArgs.substring(0, h);
            var hCmdArgs = cmdArgs.substr(h + 1);
            break;
        default:
            console.log("Unknown system command entered.");
            return "Unknown system command entered.";
    }
    if (hCmd != undefined) {
        switch (hCmd) {
            case 'login':
                var userName = hCmdArgs;
                console.log("User " + userName + " has logged in.");
                return "Logged in as " + userName;
                break;
            default:
                console.log("Unknown client command entered.");
                return "Unknown client command entered.";
        }
    }

}
var client;
// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function (sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    client = sock.remoteAddress + sock.remotePort;
    var HANDSHAKE;

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {

        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write(srvCmd(data));

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
