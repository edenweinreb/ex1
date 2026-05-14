using namespace std;
#include "HelpCommand.h"
#include <iostream>

// Constructor: receives output stream for loose coupling
HelpCommand::HelpCommand(ostream& output) : output(output) {}

// Prints all available commands to the output stream
std::string HelpCommand::execute() {
    output << "add [userid] [productid1] [productid2] …\n";
    output << "recommend [userid] [productid]\n";
    output << "help\n";

    return "";
}