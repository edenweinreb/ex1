#include "PostCommand.h"

PostCommand::PostCommand(IDataRepository& r, int uId, const std::set<int>& pIds) 
    : AddCommand(r, uId, pIds) {
}

std::string PostCommand::execute() {
    if (repo.userExists(userId)) {
        return ("404 Not Found");
    }
    AddCommand::execute();
    return ("201 Created");
}
PostCommand::~PostCommand() {}