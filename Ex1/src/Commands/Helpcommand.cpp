#include "HelpCommand.h"
#include <sstream>

HelpCommand::HelpCommand(DefaultIO& dio) : dio(dio) {}

std::string HelpCommand::execute() {
    std::ostringstream oss;
    
    oss << "DELETE, arguments: [userid] [productid1] [productid2] ...\n";
    oss << "GET, arguments: [userid] [productid]\n";
    oss << "PATCH, arguments: [userid] [productid1] [productid2] ...\n";
    oss << "POST, arguments: [userid] [productid1] [productid2] ...\n";
    oss << "help\n";
    
    return oss.str();
}