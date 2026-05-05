
#include <string>
#include <vector>
#pragma once

enum class CommandType {
    ADD,
    RECOMMEND,
    HELP,
    INVALID
};

struct Command {
    CommandType type;
    std::string userId;
    std::vector<std::string> productIds;
};

class CommandParser {
public:
    // The function receives an input line and variables to store the result.
// Returns true if the command is valid, or false on failure (silently ignored).
    static ICommand* CommandParser::parse(const std::string& input, IDataRepository& repo);
};
