#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>

#include "FileRepository.h"
#include "app.h"
#include "SocketIO.h"

using namespace std;

int main(int argc, char* argv[]) {
    // 1. Validate command-line arguments
    if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <port>" << endl;
        return 1;
    }

    // Convert the port argument from string to integer
    int port = stoi(argv[1]);

    // 2. Create the TCP socket
    int server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket < 0) {
        cerr << "Error creating socket" << endl;
        return 1;
    }

    // 3. Define the server address and port
    struct sockaddr_in server_address;
    memset(&server_address, 0, sizeof(server_address));
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = INADDR_ANY; // Listen on all local interfaces
    server_address.sin_port = htons(port);       // Convert port to network byte order

    // 4. Bind the socket to the specified IP and port
    if (bind(server_socket, (struct sockaddr*)&server_address, sizeof(server_address)) < 0) {
        cerr << "Error binding to port " << port << endl;
        close(server_socket);
        return 1;
    }

    // 5. Listen for incoming connections (max 1 queued connection as per requirements)
    if (listen(server_socket, 1) < 0) {
        cerr << "Error listening on socket" << endl;
        close(server_socket);
        return 1;
    }

    cout << "Server is listening on port " << port << "..." << endl;

    // 6. Accept a single client connection (blocking call)
    int client_socket = accept(server_socket, nullptr, nullptr);
    if (client_socket < 0) {
        cerr << "Error accepting client" << endl;
        close(server_socket);
        return 1;
    }

    cout << "Client connected!" << endl;

    // --- System Initialization ---
    
    // Load the database
    FileRepository* repo = new FileRepository("data/database.csv");
    repo->loadAll();

    // Inject dependencies: Create the SocketIO object wrapping the client socket
    DefaultIO* dio = new SocketIO(client_socket);
    
    // Initialize the application with the abstract I/O interface and the repository
    App app(dio, *repo);
    
    // Run the main application loop
    app.run();

    // --- Memory Cleanup ---
    
    // Deleting 'dio' will automatically close 'client_socket' via the SocketIO destructor
    delete dio; 
    delete repo;
    
    // Close the main server socket
    close(server_socket);
    
    return 0;
}