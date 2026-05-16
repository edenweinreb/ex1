#include "app.h"
#include "CommandParser.h"
#include "ICommand.h" 
#include <sstream>

App::App(IMenu* menu, IDataRepository& repo, std::ostream& output)
    : menu(menu), repo(repo), output(output) {}

void App::run() {
    while (true) {
        std::string task = menu->nextCommand();
        if (task.empty()) continue;

        // parse and create the right command
        ICommand* cmd = CommandParser::parse(task, repo);

        // if null, ignore silently
        if (cmd == nullptr) {
            continue;
           // sendToSocket("400 Bad Request\n");
        }
        cmd->execute();
        delete cmd;
    }
}