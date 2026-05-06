#pragma once
#include "ICommand.h"
#include "IDataRepository.h"
#include <ostream>

class RecommendCommand : public ICommand {
private:
    IDataRepository& repo;
    std::ostream& output;
public:
    RecommendCommand(IDataRepository& repo, std::ostream& output);
    void execute() override;
    ~RecommendCommand() override {}
};