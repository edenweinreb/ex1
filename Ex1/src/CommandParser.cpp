#include "CommandParser.h"
#include "AddCommand.h"
#include <sstream>
#include <set>

ICommand* CommandParser::parse(const std::string& input, IDataRepository& repo) {
    std::stringstream ss(input);
    std::string commandName;

    // Extract the first word to determine the command type
    if (!(ss >> commandName)) return nullptr;

    // Process "add" command: add <userId> <productId1> <productId2> ...
    if (commandName == "add") {
        int uId;
        // Attempt to read the User ID. Return nullptr if it's not a valid integer.
        if (!(ss >> uId)) return nullptr;

        std::set<int> pIds;
        int pId;
        // Extract all subsequent integers as Product IDs and insert into a set to avoid duplicates
        while (ss >> pId) {
            pIds.insert(pId);
        }

        // Validation: The 'add' command must contain at least one product ID
        if (pIds.empty()) return nullptr;

        // Return a new AddCommand object which stores the repo reference, userId, and product set
        return new AddCommand(repo, uId, pIds);
    }

    // Process "recommend" command: recommend <userId> <productId>
    if (commandName == "recommend") {
        int uId, pId;
        // Both userId and productId must be valid integers
        if (!(ss >> uId >> pId)) return nullptr;

        // Implementation for RecommendCommand would go here
        // return new RecommendCommand(repo, uId, pId);
    }

    // Process "help" command
    if (commandName == "help") {
        // return new HelpCommand();
    }

    // Return nullptr for unrecognized commands or invalid formats (Silent Ignore)
    return nullptr;
}