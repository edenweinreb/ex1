#pragma once

#include "ICommand.h"
#include "IDataRepository.h"
#include <vector>
#include <set>

class AddCommand: public ICommand {
private:
    IDataRepository& repo;
    int userId;
    std::set<int> productIds;


public:
    AddCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    AddCommand(IDataRepository& r);
    void execute() override;
    virtual ~AddCommand() {}

};


