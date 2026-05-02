#pragma once
#include <string>

class CommandParser {
public:
    // The function receives an input line and variables to store the result.
// Returns true if the command is valid, or false on failure (silently ignored).
    static bool parseRecommendCommand(const std::string& line, int& out_userid, int& out_productid);
};