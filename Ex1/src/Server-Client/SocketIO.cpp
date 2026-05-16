#pragma once
#include "DefaultIO.h"
#include <string>
#include <sys/socket.h>
#include <unistd.h>

class SocketIO : public DefaultIO {
private:
    int client_socket;
    std::string buffer; // Stores incomplete commands from the TCP stream

public:
    SocketIO(int client_sock) : client_socket(client_sock), buffer("") {}

    ~SocketIO() {
        close(client_socket);
    }

    // Reads from the socket until a newline character is encountered
    std::string read() override {
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

    // Writes the response back to the client, appending a newline character
    void write(const std::string& text) override {
        std::string response = text + "\n";
        send(client_socket, response.c_str(), response.length(), 0);
    }
};