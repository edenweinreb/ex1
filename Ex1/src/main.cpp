using namespace std;
#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"


int main() {
    map<string, ICommand*> commands;

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



