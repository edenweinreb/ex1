#ifndef GET_COMMAND_H
#define GET_COMMAND_H

// Import necessary libraries and interfaces
#include "ICommand.h"
#include "FileRepository.h" 
#include <iostream>

class GETCommand: public ICommand {
private:
    IDataRepository& repo;
    std::ostream& output;
    int userId;
    int productId;  

public:
    // Constructor receiving the data repository and the output stream.
    // These are the parameters passed when creating the object in main.cpp.
    GETCommand(IDataRepository& repo, std::ostream& output, int uId, int pId);
    GETCommand(IDataRepository& repo, std::ostream& output);
    
    // Overriding the virtual function from ICommand. 
    // The recommendation logic will be implemented here.
    std::string execute() override;
    
    // Virtual destructor - essential in derived classes to prevent memory leaks.
    virtual ~GETCommand() {}
};

#endif