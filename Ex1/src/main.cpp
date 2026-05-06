#include <iostream>
#include <map>
#include <string>
#include "FileRepository.h"
#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"

using namespace std;

// TODO: Merge with AE-25 Branch (it seems the merge here has been completed!)
int main() {
    // load the data from RAM
    FileRepository* repo = new FileRepository("database.csv");
    repo->loadAll();

    // map command names to their implementations
    map<string, ICommand*> commands;

    // create each command and register it
    // I assumed that AddCommand needs to receive the repo, based on your first line
    ICommand* add = new AddCommand(*repo); 
    commands["add"] = add;

    ICommand* recommend = new RecommendCommand(*repo, cout);
    commands["recommend"] = recommend;

    ICommand* help = new HelpCommand(cout);
    commands["help"] = help;

    IMenu* menu = new ConsoleMenu();
    App app(menu, commands, repo);
    app.run();

    // memory cleanup
    delete add;
    delete recommend;
    delete help; 
    delete menu;
    delete repo; // I added this to prevent a memory leak

    return 0;
}