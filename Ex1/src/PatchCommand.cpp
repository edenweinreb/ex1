#include "PATCHCommand.h"

PATCHCommand::PATCHCommand(IDataRepository& r, int uId, const std::set<int>& pIds) 
    : AddCommand(r, uId, pIds){}

std::string PATCHCommand::execute() {
    if (!repo.userExists(userId)) {
        return ("404 Not Found");
    }
    AddCommand::execute();
    return ("204 No Content");
}