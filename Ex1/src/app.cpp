#include "app.h"
#include "CommandParser.h"
#include "ICommand.h" 

App::App(DefaultIO* dio, IDataRepository& repo)
    : dio(dio), repo(repo) {}

void App::run() {
    while (true) {
        // Read input from the unified I/O interface (Socket or Console)
        std::string task = dio->read();
        
        // Handle client disconnection
        // If read() returns an empty string, it means the client disconnected.
        if (task.empty()) {
            break; // Exit the loop to finish the session cleanly
        }

        // Parse and create the right command
        ICommand* cmd = CommandParser::parse(task, repo, *dio);

        // If null (invalid command), ignore silently and wait for next input
        if (cmd == nullptr) continue;

        // Execute the command and get the response
        std::string result = cmd->execute();
        
        //Send the result back to the client
        if (!result.empty()) {
            dio->write(result);
        }

        delete cmd;
    }
}