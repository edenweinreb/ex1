#include "app.h"
#include "CommandParser.h"
#include "ICommand.h" 
#include <sstream>

App::App(DefaultIO* dio, IDataRepository& repo)
    : dio(dio), repo(repo) {}

void App::run() {
    while (true) {
        std::string buffer = dio->read();
        if (buffer.empty()) {
            break; 
        }

        std::stringstream ss(buffer);
        std::string task;
        std::string final_result = "";

        while (std::getline(ss, task)) {
            if (task.empty() || task == "\r") continue;
            
            ICommand* cmd = CommandParser::parse(task, repo, *dio);
            if (cmd != nullptr) {
                final_result = cmd->execute();
                delete cmd;
            } else {
                final_result = "400 Bad Request";
            }
        }
        
        if (!final_result.empty()) {
            dio->write(final_result);
        }
    }
}