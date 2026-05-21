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
    
    // Handle Windows/Telnet carriage return (\r) if present before \n
    if (!command.empty() && command.back() == '\r') {
        command.pop_back();
    }
    
    // Remove the extracted command from the buffer, leaving any remaining data
    buffer.erase(0, pos + 1);

    return command;
}

// Writes data to the socket, appending a newline, ensuring complete transmission
void SocketIO::write(const std::string& text) {
    std::string response = text + "\n";
    size_t total_sent = 0;
    size_t length = response.length();
    const char* data = response.c_str();

    // Keep sending until all bytes are transmitted
    while (total_sent < length) {
        ssize_t bytes_sent = send(client_socket, data + total_sent, length - total_sent, 0);
        
        if (bytes_sent <= 0) {
            // Client disconnected prematurely or network error
            break; 
        }
        
        total_sent += bytes_sent;
    }
}