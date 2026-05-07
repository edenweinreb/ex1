#pragma once
#include <string>

// Interface for handling user input and output
class IMenu {
public:
    virtual ~IMenu() {}
    virtual std::string nextCommand() = 0;
    virtual void displayError(std::string message) = 0;
};