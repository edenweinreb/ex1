#pragma once
#include <string>

class IMenu {
public:
    virtual ~IMenu() {}
    virtual std::string nextCommand() = 0;
    virtual void displayError(string message) = 0;
};