#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <set>
#include "CommandParser.h"
#include "ICommand.h"
#include "IDataRepository.h"


ICommand* CommandParser::parse(const std::string& input, IDataRepository& repo) {
    std::stringstream ss(input);
    std::string commandName;

    // Extract the first word to determine the command type
    if (!(ss >> commandName)) return nullptr; // Silent ignore for empty input lines

    // Handle the 'add' command
    if (commandName == "add") {
        int uId;
        
        // Attempt to read the User ID. If it fails (not an integer), return nullptr
        if (!(ss >> uId)) return nullptr;

        std::vector<int> pIds;
        int pId;
        
        // Extract all subsequent integers as Product IDs
        while (ss >> pId) {
            pIds.push_back(pId);
        }

        // The 'add' command must contain at least one product ID to be valid
        if (pIds.empty()) return nullptr;

        return new AddCommand(repo, uId, pIds);
    }

    // Handle the 'recommend' command
    else if (commandName == "recommend") {
        int userid, productid;
        
        // Ensure exactly two integers are provided for user ID and product ID
        if (ss >> userid >> productid) {
            
            // Validate that there is no trailing "trash" or extra parameters at the end of the line
            std::string extra;
            if (!(ss >> extra)) {
                // Parsing succeeded. Return the appropriate command object.
                // Note: Ensure the RecommendCommand constructor is updated to accept these parameters.
                return new RecommendCommand(repo, userid, productid);
            }
        }
        
        // Return nullptr if the format is invalid or if trailing text was found
        return nullptr; 
    }

    // Return nullptr for unrecognized commands
    return nullptr;
}
    
