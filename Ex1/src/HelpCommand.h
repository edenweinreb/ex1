#ifndef HELP_COMMAND_H
#define HELP_COMMAND_H
#include "ICommand.h"
#include <iostream>

class HelpCommand : public ICommand {
private:
    std::ostream& output;
public:
    HelpCommand(std::ostream& output);
    ~HelpCommand() override {}
    void execute() override;
};

#endif





