const net = require('net');

// Configuration for the Ex2 C++ Server
// Update the port to match the port your C++ server listens on
const EX2_SERVER_PORT = 8080; 
const EX2_SERVER_HOST = '127.0.0.1';

const sendCommandToEx2 = (command) => {
    const client = new net.Socket();

    client.connect(EX2_SERVER_PORT, EX2_SERVER_HOST, () => {
        // Connection established, send the command
        // Adding a newline character \n in case the C++ parser requires it
        client.write(command + '\n');
    });

    client.on('data', (data) => {
        // Handle response from the C++ server if necessary
        // client.destroy() kills the client after receiving the data
        client.destroy(); 
    });

    client.on('error', (err) => {
        // Fail silently or log error so the Node.js server doesn't crash
        // if the C++ server is offline
    });
};

module.exports = {
    sendCommandToEx2
};