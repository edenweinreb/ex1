#pragma once
#include "ICommand.h"
#include "IDataRepository.h"

class PatchCommand: public ICommand {
private:
    /* data */
public:
    PatchCommand(/* args */);
    ~PatchCommand();
};


