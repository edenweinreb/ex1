#include "DeleteCommand.h"

// Constructor: stores repo reference, userId, and productIds to delete
DeleteCommand::DeleteCommand(IDataRepository& r, int uId, const std::set<int>& pIds)
    : repo(r), userId(uId), productIds(pIds) {}

// Executes the DELETE command:
// Sets result to 404 Not Found if user doesn't exist or product wasn't viewed
// Sets result to 204 No Content if deletion was successful
std::string DeleteCommand::execute() {
    // Check if user exists
    if (!repo.userExists(userId)) {
        result = "404 Not Found";
        return result;
    }

    // Check all products exist for this user before deleting
    std::set<int> existing = repo.getUserData(userId);
    for (int pId : productIds) {
        if (existing.find(pId) == existing.end()) {
            result = "404 Not Found";
            return result;
        }
    }

    // All valid - remove each product from user's viewed history
    for (int pId : productIds) {
        repo.removeViewedProduct(userId, pId);
    }

    result = "204 No Content";
    return result;
}

// Returns the result of the last execute() call
std::string DeleteCommand::getResult() {
    return result;
}