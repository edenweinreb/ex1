#pragma once
#include "ICommand.h"
#include "IDataRepository.h"
#include <set>
#include <string>

// Handles the DELETE command: removes product views for a specific user
class DeleteCommand : public ICommand {
private:
    IDataRepository& repo;
    int userId;
    std::set<int> productIds;
    // Stores the result of the last execute() call
    std::string result;

public:
    // Constructor: receives repository reference, user ID, and product IDs to delete
    DeleteCommand(IDataRepository& r, int uId, const std::set<int>& pIds);

    // Executes the delete logic and stores the appropriate HTTP-like response
    void execute() override;

    // Returns the result of the last execute() call
    std::string getResult();

    virtual ~DeleteCommand() {}
};