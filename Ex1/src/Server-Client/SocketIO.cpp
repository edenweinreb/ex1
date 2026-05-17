#include "SocketIO.h"
#include <sys/socket.h>
#include <unistd.h>

// Constructor
SocketIO::SocketIO(int client_sock) : client_socket(client_sock), buffer("") {}

// Destructor
SocketIO::~SocketIO() {
    close(client_socket);
}

// Reads data from the socket until a complete command (newline) is found
std::string SocketIO::read() {
    char temp_buf[1024];
    size_t pos;

    // Continue reading from the network as long as there is no full line in the buffer
    while ((pos = buffer.find('\n')) == std::string::npos) {
        int bytes_received = recv(client_socket, temp_buf, sizeof(temp_buf), 0);
        if (bytes_received <= 0) {
            return ""; // Client disconnected or an error occurred
        }
        buffer.append(temp_buf, bytes_received);
    }

    // Extract the complete command (excluding the newline character)
    std::string command = buffer.substr(0, pos);
    
    // Remove the extracted command from the buffer, leaving any remaining data
    buffer.erase(0, pos + 1);

    return command;
}

// Writes data to the socket, appending a newline
void SocketIO::write(const std::string& text) {
    std::string response = text + "\n";
    send(client_socket, response.c_str(), response.length(), 0);
}