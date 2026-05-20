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
    // Validate command-line arguments
    if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <port>" << endl;
        return 1;
    }

    int port = stoi(argv[1]);

    // Initialize TCP socket
    int server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket < 0) {
        cerr << "Error creating socket" << endl;
        return 1;
    }

    struct sockaddr_in server_address;
    memset(&server_address, 0, sizeof(server_address));
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = INADDR_ANY; 
    server_address.sin_port = htons(port);       

    if (bind(server_socket, (struct sockaddr*)&server_address, sizeof(server_address)) < 0) {
        cerr << "Error binding to port " << port << endl;
        close(server_socket);
        return 1;
    }

    // Listen for incoming connections (max 1 concurrent client as specified)
    if (listen(server_socket, 1) < 0) {
        cerr << "Error listening on socket" << endl;
        close(server_socket);
        return 1;
    }

    cout << "Server is listening on port " << port << "..." << endl;

    // Load data repository once before accepting clients
    FileRepository* repo = new FileRepository("data/database.csv");
    repo->loadAll();

    // Main server loop
    while (true) {
        int client_socket = accept(server_socket, nullptr, nullptr);
        if (client_socket < 0) {
            cerr << "Error accepting client" << endl;
            continue; 
        }

        cout << "Client connected!" << endl;

        // Initialize dependencies for the connected client
        DefaultIO* dio = new SocketIO(client_socket);
        App app(dio, *repo);
        
        // Execute application logic; blocks until client disconnects
        app.run();

        // Cleanup client resources
        delete dio; 
    }

    // Cleanup server resources (unreachable in infinite loop)
    delete repo;
    close(server_socket);
    
    return 0;
}