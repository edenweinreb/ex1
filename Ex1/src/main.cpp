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
    // both need to be removed and to  be initate in Shiraz class or in any design that keep all the rest logic.
    // pay attention that your class should be static or you should make the recommendationEngine to inherit your class.
    unordered_map<int, set<int>> userProducts;
    unordered_map<int, set<int>> ProductsUser;

    //2. TO DO: upload from file - SHIRAZ.
    // I saw you have diffrent class for that, so if needed - delete.
    map<string, ICommand*> commands;

    // 2. Inject the database reference into the commands that need it
    // . TO DO: shiraz -need to implement constructor
    ICommand* add = new AddCommand();
    commands["add"] = add;
 
    //after deleting the refrences at 14 15 it would be fine.
    ICommand* recommend = new RecommendCommand();
    commands["recommend"] = recommend;

    // Help doesn't need the database, so we don't pass it
    //. TO DO: EDEN -need to implement constructor
    ICommand* help = new HelpCommand();
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
    delete menu; 
    
    return 0;
}