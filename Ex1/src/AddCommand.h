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
    // Constructor for known data
    AddCommand(IDataRepository& r, int uId, const std::set<int>& pIds);
    // Constructor for repository only
    AddCommand(IDataRepository& r);
    void execute() override;
    virtual ~AddCommand() {}

};


