#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

// Import necessary libraries and interfaces
#include "ICommand.h"
#include "FileRepository.h" 
#include <iostream>

class RecommendCommand: public ICommand {
private:
    // Using a reference (&) to avoid copying the entire database, 
    // and instead work on the original repository defined in main.
    FileRepository& repo; 
    
    // Using a reference to the output stream (allows flexibility, 
    // e.g., printing to a file instead of the console).
    std::ostream& out;    

public:
    // Constructor receiving the data repository and the output stream.
    // These are the parameters passed when creating the object in main.cpp.
    RecommendCommand(FileRepository& repository, std::ostream& output);
    
    // Overriding the virtual function from ICommand. 
    // The recommendation logic will be implemented here.
    void execute() override;
    
    // Virtual destructor - essential in derived classes to prevent memory leaks.
    virtual ~RecommendCommand() {}
};

#endif