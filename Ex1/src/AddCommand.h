#ifndef ADD_COMMAND_H
#define ADD_COMMAND_H

#include "ICommand.h"
#include "IDataRepository.h"
#include <vector>

class AddCommand: public ICommand {
private:
    IDataRepository& repo;
    int userId;
    std::vector<int> productIds;


public:
    AddCommand(IDataRepository& r, int uId, const std::vector<int>& pIds);
    AddCommand(IDataRepository& r);
    void execute() override;
    virtual ~AddCommand() {}

};

#endif

