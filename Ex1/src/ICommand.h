#pragma once
#include "CommandParser.h"

// Abstract interface for all system commands
class ICommand {
protected:
    // the parameters for the current command
    Command currentCmd;

public:
    virtual ~ICommand() {}
    
    // Setter
    virtual void setArgs(const Command& cmd) {
        currentCmd = cmd;
    }
    
    virtual void execute() = 0;
};