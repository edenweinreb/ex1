using namespace std;
#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"

// TODO: Merge with AE-25 Branch
int main() {
    // map command names to their implementations
    map<string, ICommand*> commands;

    // create each command and register it
    ICommand* add = new AddCommand();
    commands["add"] =add;
 
    ICommand* recommend = new RecommendCommand();
    commands["recommend"] = recommend;

    ICommand* help = new HelpCommand();
    commands["help"] = help;
 
    
    IMenu* menu = new ConsoleMenu();
    App app(menu, commands);
    app.run();
  
    delete add;
    delete recommend;
    delete help; 
    delete menu;
    return 0;
}



