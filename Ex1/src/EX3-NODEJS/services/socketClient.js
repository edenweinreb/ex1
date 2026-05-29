const net = require('net');

// Configuration for the Ex2 C++ Server within Docker
const EX2_SERVER_PORT = 9090; 
// Use the Docker service name 'server' instead of localhost
const EX2_SERVER_HOST = process.env.EX2_HOST || 'server';

const sendCommandToEx2 = (command) => {
    const client = new net.Socket();

    client.connect(EX2_SERVER_PORT, EX2_SERVER_HOST, () => {
        client.write(command + '\n');
    });

    client.on('data', (data) => {
        client.destroy(); 
    });

    client.on('error', (err) => {
        // Prevent the Node server from crashing if the C++ server is down
        console.error('Ex2 server connection error:', err.message);
    });
};

const reportProductView = (userId, productId) => {
    const command = `POST ${userId} ${productId}`;
    sendCommandToEx2(command);
};

const reportProductPurchase = (userId, productId) => {
    const command = `PATCH ${userId} ${productId}`;
    sendCommandToEx2(command);
};

module.exports = {
    sendCommandToEx2,
    reportProductView,
    reportProductPurchase
};