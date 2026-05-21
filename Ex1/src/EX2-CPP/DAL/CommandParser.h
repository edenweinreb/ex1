#ifndef COMMANDPARSER_H
#define COMMANDPARSER_H

#include <string>

class ICommand;
class IDataRepository;
class DefaultIO;

class CommandParser {
public:
    static ICommand* parse(const std::string& input, IDataRepository& repo, DefaultIO& dio);
};

#endif