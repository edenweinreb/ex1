#ifndef APP_H
#define APP_H

#include "DefaultIO.h"
#include "IDataRepository.h"

// Runs the main application loop: reads input via DefaultIO, 
// parses it, executes the right command, and writes the output back.
class App {
private:
    // Unified I/O interface handling both reading and writing (Console or Socket)
    DefaultIO* dio;
    
    // Reference to the data repository
    IDataRepository& repo;

public:
    // Constructor using Dependency Injection for the unified I/O interface
    App(DefaultIO* dio, IDataRepository& repo);
    
    // Starts the main execution loop
    void run();
};

#endif