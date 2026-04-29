using namespace std;
#include "ConsoleMenu.h"
#include "CommandParser.h" 
#include <iostream>
#include <string>

string ConsoleMenu::nextCommand() {
    string input;
    // Display command prompt
    cout << "> "; 
    
    // Read the input form the user
    getline(cin, input);

    Command cmd = CommandParser::parse(input);
    return to_string((int)cmd.type);
}

void ConsoleMenu::displayError(string message) {
    cout << "Error: " << message << endl;
}