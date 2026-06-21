const net = require('net');

// Ex2 server connection details
const EX2_HOST = 'server';
const EX2_PORT = 9090;

// Helper to send a command to Ex2 and get the response
const sendCommand = (command) => {
  return new Promise((resolve) => {
    const client = net.createConnection({ port: EX2_PORT, host: EX2_HOST }, () => {
      client.write(command + '\n');
    });

    client.on('data', (data) => {
      resolve(data.toString().trim());
      client.end();
    });

    client.on('error', (err) => {
      // Log connection errors to assist with Docker network debugging
      console.error(`TCP Connection Error to Ex2 server: ${err.message}`);
      resolve(null);
    });
  });
};

// Notify Ex2 that a user viewed a product
const addViewedProduct = async (userId, productNumericId) => {
  const patchResponse = await sendCommand(`PATCH ${userId} ${productNumericId}`);

  // If user doesn't exist in Ex2 yet, create them with POST
  if (patchResponse && patchResponse.includes('404')) {
    await sendCommand(`POST ${userId} ${productNumericId}`);
  }
};

module.exports = { addViewedProduct };