using namespace std;
#include "ConsoleMenu.h"
#include "CommandParser.h" 
#include <iostream>
#include <string>

string ConsoleMenu::nextCommand() {
    std::string input;
    std::cout << "> "; 
    
    if (std::getline(std::cin, input)) {
        return input;
    }
    return "";
}

void ConsoleMenu::displayError(string message) {
    cout << "Error: " << message << endl;
}