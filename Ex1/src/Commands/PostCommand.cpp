#include "POSTCommand.h"

POSTCommand::POSTCommand(IDataRepository& r, int uId, const std::set<int>& pIds) 
    : AddCommand(r, uId, pIds) {
}

std::string POSTCommand::execute() {
    if (repo.userExists(userId)) {
        return ("404 Not Found");
    }
    AddCommand::execute();
    return ("201 Created");
}