#include "AddCommand.h"

//Construct a new Add Command object
AddCommand::AddCommand(IDataRepository& r, int uId, const std::set<int>& pIds)
        : repo(r), userId(uId), productIds(pIds) {}


// AddCommand::AddCommand(IDataRepository& r) 
//         : repo(r) {}


//Executes the add command logic
std::string AddCommand::execute() { 
    for (int pId : productIds) {
        repo.addViewedProduct(userId, pId);
    }
    return ""; // 
}