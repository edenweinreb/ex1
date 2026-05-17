#include "PatchCommand.h"

PatchCommand::PatchCommand(IDataRepository& r, int uId, const std::set<int>& pIds) 
    : AddCommand(r, uId, pIds) {}

std::string PatchCommand::execute() {
    if (!repo.userExists(userId)) {
        return "404 Not Found";
    }
    
    AddCommand::execute();
    return "204 No Content";
}
PatchCommand::~PatchCommand() {}