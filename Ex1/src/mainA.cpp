#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"
#include "ConsoleMenu.h"
#include <unordered_map>
#include <set>

using namespace std;

int main() {
    // 1. Create the central database that will live throughout the program's lifecycle
    unordered_map<int, set<int>> userProducts;

    //2. TO DO: upload from file - SHIRAZ
    map<string, ICommand*> commands;

    // 2. Inject the database reference into the commands that need it
    // . TO DO: shiraz -need to implement constructor
    ICommand* add = new AddCommand(userProducts);
    commands["add"] = add;
 
    ICommand* recommend = new RecommendCommand(userProducts);
    commands["recommend"] = recommend;

    // Help doesn't need the database, so we don't pass it
    //. TO DO: EDEN -need to implement constructor
    ICommand* help = new HelpCommand(userProducts);
    commands["help"] = help;
 
    IMenu* menu = new ConsoleMenu();
    App app(menu, commands);
    
    // 3. This is where the magic happens! app.run() will loop, call your nextCommand 
    // function, parse it, and send the 'cmd' to the right command's execute() function.
    app.run();
  
    // 4. Clean up memory
    delete add;
    delete recommend;
    delete help; 
    delete menu; // Don't forget to delete the menu too!
    
    return 0;
}