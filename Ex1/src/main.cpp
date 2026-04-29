using namespace std;
#include "app.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "HelpCommand.h"

int main() {
    map<string, ICommand*> commands;

    ICommand* add = new AddCommand();
    commands["1"] =add;
 
    ICommand* recommend = new RecommendCommand();
    commands["2"] = recommend;

    ICommand* help = new HelpCommand();
    commands["3"] = help;
 
    App app(commands);
    app.run();
  
    delete add;
    delete recommend;
    delete help; 
    return 0;
}



