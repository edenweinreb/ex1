#pragma once
#include <string>
#include "CommandParser.h"

class ICommand {
protected:
    // Stores the parameters and data for the current command
    Command currentCmd;

public:
    // Virtual destructor ensures proper cleanup of derived classes
    virtual ~ICommand() = default; 
    
    // Setter for injecting arguments into the command before execution
    virtual void setArgs(const Command& cmd) {
        currentCmd = cmd;
    }
    
    // Executes the command's logic and returns the resulting output as a string.
    // support sending the response over a TCP socket.
    virtual std::string execute() = 0;
};