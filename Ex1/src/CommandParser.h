#ifndef COMMANDPARSER_H
#define COMMANDPARSER_H

#include "IDataRepository.h"
#include <string>
#include <vector>

enum class CommandType {
    ADD,
    RECOMMEND,
    HELP,
    INVALID
};

struct Command {
    CommandType type;
    std::string userId;
    std::vector<std::string> productIds;
};

class CommandParser {
public:
    //Parses a raw input string and creates the corresponding Command object
    static ICommand* parse(const std::string& input, IDataRepository& repo);
};
#endif