#pragma once
#include "IDataRepository.h"
#include "AddCommand.h"

class PatchCommand: public AddCommand {
public:
    PatchCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    std::string execute() override;
    ~PatchCommand();
};


