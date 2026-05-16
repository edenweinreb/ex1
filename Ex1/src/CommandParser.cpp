#include "CommandParser.h"
// #include "AddCommand.h"
#include "PatchCommand.h"
#include "PostCommand.h"
#include "RecommendCommand.h" 
#include "HelpCommand.h"      
#include "ICommand.h"
#include "IDataRepository.h"
#include "DeleteCommand.h"
#include <sstream>
#include <set>
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>


ICommand* CommandParser::parse(const std::string& input, IDataRepository& repo) {
    std::stringstream ss(input);
    std::string commandName;

    // Extract the first word to determine the command type
    if (!(ss >> commandName)) return nullptr;

    // Process "POST" or "PATCH" command: add <userId> <productId1> <productId2> ...
    if (commandName == "POST" || commandName == "PATCH") {
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

        // // Return a new AddCommand object which stores the repo reference, userId, and product set
        // return new AddCommand(repo, uId, pIds);

        if (commandName == "POST") {
            return new PostCommand(repo, uId, pIds);
        } 
        else if (commandName == "PATCH") {
            return new PatchCommand(repo, uId, pIds);
        }
    }

    // Process "recommend" command: recommend <userId> <productId>
    if (commandName == "recommend") {
        int uId, pId;
        // Both userId and productId must be valid integers
        if (!(ss >> uId >> pId)) return nullptr;
            
        // Validate that there is no trailing "trash" or extra parameters at the end of the line
        std::string extra;
        if (!(ss >> extra)) {
            // Parsing succeeded. Return the appropriate command object.
            return new RecommendCommand(repo, std::cout, uId, pId);
        }
        
        // Return nullptr if the format is invalid or if trailing text was found
        return nullptr;
    }

    // Process "DELETE" command: DELETE <userId> <productId1> <productId2> ...
    if (commandName == "DELETE") {
        int uId;
        // Attempt to read the User ID. Return nullptr if not a valid integer.
        if (!(ss >> uId)) return nullptr;

        std::set<int> pIds;
        int pId;
        // Extract all subsequent integers as Product IDs
        while (ss >> pId) {
            pIds.insert(pId);
        }

        // Validation: DELETE must contain at least one product ID
        if (pIds.empty()) return nullptr;

        return new DeleteCommand(repo, uId, pIds);
    }

    // Process "help" command
    if (commandName == "help") {
        return new HelpCommand(std::cout);
    }

    // Return nullptr for unrecognized commands or invalid formats (Silent Ignore)
    return nullptr;
}