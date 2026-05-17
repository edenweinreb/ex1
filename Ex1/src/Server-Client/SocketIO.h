#pragma once
#include "DefaultIO.h"
#include <string>

class SocketIO : public DefaultIO {
private:
    int client_socket;
    std::string buffer; // Stores incomplete incoming data

public:
    // Constructor
    SocketIO(int client_sock);

    // Destructor
    ~SocketIO();

    // Reads data from the socket until a complete command (newline) is found
    std::string read() override;

    // Writes data to the socket, appending a newline
    void write(const std::string& text) override;
};