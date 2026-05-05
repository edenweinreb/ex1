#include "ConsoleMenu.h"
#include "CommandParser.h"
#include "RecommendationEngine.h"
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <set>
#include <unordered_map>

using std::cout;
using std::endl;
using std::string;

// invoking the next command
std::string ConsoleMenu::nextCommand()
{
    std::string line;
    // tring to invoke input from user
    if (std::getline(std::cin, line)) {
        return line; // the line that we read right now
    }
    
    // if it is the end of the input
    return "";
}