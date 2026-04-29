using namespace std;
#ifndef APP_H
#define APP_H

#include <map>
#include "IMenu.h"
#include "ICommand.h"

class App {
private:
    IMenu* menu;
    map<int, ICommand*> commands;

public:
    App(IMenu* menu, map<int, ICommand*> commands);
    void run();
};

#endif