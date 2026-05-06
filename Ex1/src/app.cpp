#include <string>
#include <map>
#include <fstream>
#include <sstream>
#include <filesystem>
#include "Icommand.h"
#include "IMenu.h"
#include "CommandParser.h"

using namespace std;

class App
{
    IMenu* menu;
    map<string, ICommand*> commands;
    IDataRepository* repo;

    public:
    App(IMenu* menu, map<string, ICommand*> commands, IDataRepository* repo) 
        : menu(menu), commands(commands), repo(repo) {}

    void run() {
            while (true) {
                string task = menu->nextCommand();
                if (task.empty()) break;

                std::istringstream iss(task);
                string commandName;
                iss >> commandName;

                if (commands.find(commandName) == commands.end()) {
                    continue;
                }

                ICommand* cmdToExecute = CommandParser::parse(task, *repo);

                if (cmdToExecute != nullptr) {
                    cmdToExecute->execute();
                    delete cmdToExecute;
                } 
            }
        }
};