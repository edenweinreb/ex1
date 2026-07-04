# Environment Setup & Installation

This guide explains how to compile the code and start all the necessary servers and applications (Backend, Database, Web Client, and Mobile App).

## 1. Building and Running with Docker Compose

To start the backend architecture, navigate to the project's root directory in your terminal and execute the Docker Compose build command:

```bash
docker-compose up --build
```

![Docker Compose Command](images/dockercompose.PNG)

## 2. Verifying Containers and Starting the Mobile Client

Once the Docker Compose process completes, you will see all the services (MongoDB, Node.js server, React web client, etc.) running successfully in the terminal.

Next, to run the React Native mobile application, open a second terminal instance and start the Expo bundler:

```
npx expo start -c
```

The split terminal below shows the Docker containers running on the left, and the Expo bundler with the generated QR code on the right:

Note: Scan the QR code using the Expo Go application on your mobile device to launch the client.

![Running Terminals and Expo](images/running-2-treminals.PNG)