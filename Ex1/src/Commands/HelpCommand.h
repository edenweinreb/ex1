#pragma once
#include "ICommand.h"
#include "../Data/DefaultIO.h"
#include <string>

class HelpCommand : public ICommand {
private:
    DefaultIO& dio;

public:
    HelpCommand(DefaultIO& dio);
    std::string execute() override;
};