#pragma once
#include "ICommand.h"
#include "IDataRepository.h"

class PostCommand: public ICommand {
private:
    /* data */
public:
    PostCommand(/* args */);
    ~PostCommand();
};

PostCommand::PostCommand(/* args */)
{
}


