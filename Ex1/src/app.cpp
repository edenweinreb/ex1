#include <string>
#include <map>
#include <sstream> 
#include "ICommand.h"
#include "IMenu.h"
#include "CommandParser.h"

using namespace std;

class App
{
    IMenu* menu;
    map<string, ICommand*> commands;
    string inputLine;
    
public:
    App(IMenu* menu, map<string, ICommand*> commands) : menu(menu), commands(commands) {}
    
    void run() {
        while (true) {
            // 1. Get the full line of input from the user (e.g., "recommend 10 20")
            string task = menu->nextCommand();

            // 2. Extract just the first word to identify the command name (e.g., "recommend")
            std::istringstream iss(task);
            string commandName;
            iss >> commandName;
            
            // 3. Safety Check: Verify the command exists in our map BEFORE trying to access it.
            // This prevents the application from crashing if the user types a typo or unknown command.
            if (commands.find(commandName) == commands.end()) {
                menu->displayError("Command not recognized.");
                continue; // Skip the rest of the loop and wait for new input
            }

            try {
                // 4. Send the FULL input line ('task') to the parser to extract arguments.
                // The parser will return an INVALID command object if the syntax is wrong.
                Command cmd = CommandParser::parseRecommendCommand(task);
                
                // 5. Validation: Check if parsing failed (replaces the old 'to_string' check)
                if (cmd.type == CommandType::INVALID) {
                    menu->displayError("Invalid parameters for this command.");
                    continue; 
                }

                // 6. Execution: Use 'commandName' (NOT 'task'!) to access the correct command pointer.
                // Pass the parsed arguments via the setter, then execute.
                commands[commandName]->setArgs(cmd);
                commands[commandName]->execute();
            }
            catch(...) {
                menu->displayError("An unexpected error occurred during execution.");
            }
        }
    }
};