using namespace std;
#ifndef APP_H
#define APP_H
#include <map>
#include "IMenu.h"
#include "ICommand.h"
#include "IDataRepository.h"

// Runs the main loop: reads input and executes the right command
class App {
private:
    IMenu* menu;
    map<string, ICommand*> commands;
    IDataRepository* repo; 

public:
    App(IMenu* menu, map<string, ICommand*> commands, IDataRepository* repo);
    void run();
};

#endif