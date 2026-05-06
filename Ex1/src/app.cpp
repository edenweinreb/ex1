using namespace std;
#include <string>
#include <map>
#include "Icommand.h"
#include "IMenu.h"
#include "CommandParser.h"

// TODO: Merge with AE-25 Branch
class App
{
    IMenu* menu;
    map<string, ICommand*> commands;
    string inputLine;
    
    public:
    // Constructor: receives menu and commands map
    App(IMenu* menu, map<string, ICommand*> commands) : menu(menu), commands(commands) {}
        void run() {
            while (true) {
                string task = menu->nextCommand();
                // if command is invalid, ignore and move to next input
                if (task == to_string((int)CommandType::INVALID))
                {
                    continue;
                }
                try {
                    // find the right command and execute it
                    commands[task]->execute();
                }
                catch(...){
                    menu->displayError("");
                }
            }
        }
};

