using namespace std;
#include "FileRepository.h"
#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"


int main() {
    //load the data from RAM
    FileRepository* repo = new FileRepository("database.csv");
    repo->loadAll();

    map<string, ICommand*> commands;

    ICommand* add = new AddCommand(*repo);
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
    return 0;
}



