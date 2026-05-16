#pragma once
#include "ICommand.h"
#include "IDataRepository.h"

class PATCHCommand: public ICommand {
private:
    /* data */
public:
    PATCHCommand(/* args */);
    std::string execute() override;
    ~PATCHCommand();
};


