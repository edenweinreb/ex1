#pragma once
#include "IDataRepository.h"
#include "AddCommand.h"

class PATCHCommand: public AddCommand {
public:
    PATCHCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    std::string execute() override;
    ~PATCHCommand();
};


