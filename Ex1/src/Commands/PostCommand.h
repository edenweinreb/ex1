#pragma once
#include "IDataRepository.h"
#include "AddCommand.h"

class PostCommand: public AddCommand {
public:
    PostCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    std::string execute() override;
    ~PostCommand();
};




