const net = require('net');

// Configuration for the Ex2 C++ Server within Docker
const EX2_SERVER_PORT = 9090; 
// Use the Docker service name 'server' instead of localhost
const EX2_SERVER_HOST = process.env.EX2_HOST || 'server';

const sendCommandToEx2 = (command) => {
    // Return a Promise so controllers can use 'await'
    return new Promise((resolve) => {
        const client = new net.Socket();

        client.connect(EX2_SERVER_PORT, EX2_SERVER_HOST, () => {
            client.write(command + '\n');
        });

        client.on('data', (data) => {
            const response = data.toString().trim();
            client.destroy(); 
            resolve(response); 
        });

        client.on('error', (err) => {
            console.error('Ex2 server connection error:', err.message);
            resolve(null); 
        });
    });
};

const reportProductView = async (userId, productNumericId) => {
    const uId = userId.toString();
    const command = `POST ${uId} ${productNumericId}`;
    return await sendCommandToEx2(command);
};

const reportProductPurchase = async (userId, productNumericId) => {
    const uId = userId.toString();
    const command = `PATCH ${uId} ${productNumericId}`;
    return await sendCommandToEx2(command);
};

module.exports = {
    sendCommandToEx2,
    reportProductView,
    reportProductPurchase
};