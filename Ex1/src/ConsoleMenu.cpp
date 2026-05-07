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
std::string ConsoleMenu::nextCommand() {
    std::string input;
    std::cout << "> ";
    
    if (std::getline(std::cin, input)) {
        return input;
    }
    return "";
}

void ConsoleMenu::displayError(std::string message) {
    std::cout << "Error: " << message << std::endl;
}