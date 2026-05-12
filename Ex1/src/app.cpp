#include "app.h"
#include "CommandParser.h"
#include "ICommand.h" 
// #include <sstream> // You might not need this here anymore depending on your parser

// 1. Constructor updated to use DefaultIO instead of IMenu and std::ostream
App::App(DefaultIO* dio, IDataRepository& repo)
    : dio(dio), repo(repo) {}

void App::run() {
    while (true) {
        // 2. Read input from the unified I/O interface (Socket or Console)
        std::string task = dio->read();
        
        // 3. Handle client disconnection
        // If read() returns an empty string, it means the client disconnected.
        if (task.empty()) {
            break; // Exit the loop to finish the session cleanly
        }

        // Parse and create the right command
        ICommand* cmd = CommandParser::parse(task, repo);

        // If null (invalid command), ignore silently and wait for next input
        if (cmd == nullptr) continue;

        // 4. Execute the command and get the response
        // NOTE: You will need to change ICommand::execute() to return a std::string
        // so that the App can send the output back through the network.
        std::string result = cmd->execute();
        
        // 5. Send the result back to the client
        if (!result.empty()) {
            dio->write(result);
        }

        delete cmd;
    }
}