using namespace std;
#include "HelpCommand.h"
#include <iostream>

HelpCommand::HelpCommand() {}

// Prints all available commands to the output stream
std::string HelpCommand::execute() {
    std::string helpText = "add [userid] [productid1] [productid2] ...\n";
    helpText += "recommend [userid] [productid]\n";
    helpText += "help";
    return helpText;
}