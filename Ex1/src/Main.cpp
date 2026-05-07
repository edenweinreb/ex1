#include <iostream>
#include <map>
#include <string>
#include "FileRepository.h"
#include "app.h"
#include "ICommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"

using namespace std;

int main() {
    // load data from file
    FileRepository* repo = new FileRepository("data/database.csv");
    repo->loadAll();

    // use console for input/output
    IMenu* menu = new ConsoleMenu();
    
    // pass repo and menu to App - CommandParser creates commands dynamically
    App app(menu, *repo, cout);
    app.run();

    // clean up memory
    delete menu;
    delete repo;
    return 0;
}