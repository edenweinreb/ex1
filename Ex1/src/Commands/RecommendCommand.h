#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

// Import necessary libraries and interfaces
#include "ICommand.h"
#include "FileRepository.h" 
#include <iostream>

class RecommendCommand: public ICommand {
private:
    IDataRepository& repo;
    std::ostream& output;
    int userId;
    int productId;  

public:
    // Constructor receiving the data repository and the output stream.
    // These are the parameters passed when creating the object in main.cpp.
    RecommendCommand(IDataRepository& repo, std::ostream& output, int uId, int pId);
    RecommendCommand(IDataRepository& repo, std::ostream& output);
    
    // Overriding the virtual function from ICommand. 
    // The recommendation logic will be implemented here.
    std::string execute() override;
    
    // Virtual destructor - essential in derived classes to prevent memory leaks.
    virtual ~RecommendCommand() {}
};

#endif