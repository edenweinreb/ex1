using namespace std;
#include <string>
#include <map>
#include "Icommand.h"
#include "IMenu.h"
#include "CommandParser.h"

class App
{
    IMenu* menu;
    map<string, ICommand*> commands;
    string inputLine;
    public:
    App(IMenu* menu, map<string, ICommand*> commands) : menu(menu), commands(commands) {}
        void run() {
            while (true) {
                string task = menu->nextCommand();
                if (task == to_string((int)CommandType::INVALID))
                {
                    continue;
                }
                try {
                    // need to add all the varaibles that declered
                    Command cmd = parseRecommendCommand(task);
                    commands[task]->execute(cmd);
                }
                catch(...){
                    menu->displayError("");
                }
            }
        }
};

