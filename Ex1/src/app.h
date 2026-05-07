#ifndef APP_H
#define APP_H

#include "IMenu.h"
#include "IDataRepository.h"
#include <ostream>

// Runs the main loop: reads input and executes the right command
class App {
private:
    IMenu* menu;
    IDataRepository& repo;
    std::ostream& output;

public:
    App(IMenu* menu, IDataRepository& repo, std::ostream& output);
    void run();
};

#endif