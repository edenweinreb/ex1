#ifndef ICOMMAND_H
#define ICOMMAND_H

#include <string>

class ICommand {
public:
    virtual ~ICommand() = default;
    virtual std::string execute() = 0;
};

#endif