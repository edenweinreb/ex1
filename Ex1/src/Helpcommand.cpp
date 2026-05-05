using namespace std;
#include "HelpCommand.h"
#include <iostream>

HelpCommand::HelpCommand(ostream& output) : output(output) {}

void HelpCommand::execute() {
    output << "add [userid] [productid1] [productid2]\n";
    output << "recommend [userid] [productid]\n";
    output << "help\n";
}