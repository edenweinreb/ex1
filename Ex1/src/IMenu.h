using namespace std;
#ifndef IMENU_H
#define IMENU_H
#include <string>

// Interface for handling user input and output
class IMenu {
public:
    virtual ~IMenu() {}
    virtual string nextCommand() = 0;
    virtual void displayError(string message) = 0;
};

#endif