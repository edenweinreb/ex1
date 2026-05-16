#pragma once
#include "ICommand.h"
#include "IDataRepository.h"

class DeleteCommand: public ICommand {
private:
    /* data */
public:
    DeleteCommand(/* args */);
    std::string DeleteCommand::execute();

    ~DeleteCommand();
};


