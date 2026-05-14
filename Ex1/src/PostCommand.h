#pragma once
#include "IDataRepository.h"
#include "AddCommand.h"

class POSTCommand: public AddCommand {
public:
    POSTCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    std::string execute() override;
    ~POSTCommand();
};




