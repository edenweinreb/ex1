#include "HelpCommand.h"
#include <iostream>
#include <sstream>

// Constructor: receives output stream for loose coupling
HelpCommand::HelpCommand(std::ostream& output) : output(output) {}

// Prints all available commands and returns them as a string
std::string HelpCommand::execute() {
    std::ostringstream oss;

    oss << "DELETE, arguments: [userid] [productid1] [productid2] ...\n";
    oss << "GET, arguments: [userid] [productid]\n";
    oss << "PATCH, arguments: [userid] [productid1] [productid2]  ...\n";
    oss << "POST, arguments: [userid] [productid1] [productid2]  ...\n";
    oss << "HELP\n";

    return oss.str();
}