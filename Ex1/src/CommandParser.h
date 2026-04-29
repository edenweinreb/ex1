using namespace std;
#ifndef COMMANDPARSER_H
#define COMMANDPARSER_H
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
    string userId;
    vector<string> productIds;
};

class CommandParser {
public:
    static Command parse(const string& input);
};
#endif