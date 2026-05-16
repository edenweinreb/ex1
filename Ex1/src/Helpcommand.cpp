using namespace std;
#include "HelpCommand.h"
#include <iostream>
#include <sstream>

// Constructor: receives output stream for loose coupling
HelpCommand::HelpCommand(ostream& output) : output(output) {}

// Prints all available commands to the output stream
std::string HelpCommand::execute() {
    std::ostringstream output;

    output << "DELETE, arguments: [userid] [productid1] [productid2] ...\n";
    output << "GET, arguments: [userid] [productid]\n";
    output << "PATCH, arguments: [userid] [productid1] [productid2]  ...\n";
    output << "POST, arguments: [userid] [productid1] [productid2]  ...\n";
    output << "HELP\n";

    return output.str();
}