#ifndef HELP_COMMAND_H
#define HELP_COMMAND_H
#include "ICommand.h"
#include <iostream>

// Handles the help command: prints all available commands
class HelpCommand : public ICommand {
private:
    std::ostream& output;
public:
    HelpCommand(std::ostream& output);
    ~HelpCommand() override {}
    std::string execute() override;
};

#endif





