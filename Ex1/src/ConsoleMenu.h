using namespace std;
#ifndef CONSOLE_MENU_H
#define CONSOLE_MENU_H

#include "IMenu.h"
#include <string>

class ConsoleMenu : public IMenu {
    public:
    string nextCommand() override;
    void displayError(string message) override;
};

#endif

