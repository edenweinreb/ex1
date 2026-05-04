#include "CommandParser.h"
#include "AddCommand.h"
#include <sstream>
#include <vector>

ICommand* CommandParser::parse(const std::string& input, IDataRepository& repo) {
    std::stringstream ss(input);
    std::string commandName;

    // Extract the first word to determine the command type
    ss >> commandName;

    if (commandName == "add") {
        int uId;
        // Attempt to read the User ID. If it's not a valid integer, return nullptr (Silent Ignore)
        if (!(ss >> uId)) return nullptr;

        std::vector<int> pIds;
        int pId;
        // Extract all subsequent integers as Product IDs
        while (ss >> pId) {
            pIds.push_back(pId);
        }

        //The 'add' command must contain at least one product ID
        if (pIds.empty()) return nullptr;

        return new AddCommand(repo, uId, pIds);
    }

    // Return nullptr for unrecognized commands or invalid formats
    return nullptr;
}