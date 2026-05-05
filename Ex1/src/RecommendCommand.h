#pragma once
#include "ICommand.h"
#include <unordered_map>
#include <set>

class RecommendCommand : public ICommand {
private:
    // Stores a reference to the main database located in main()
    std::unordered_map<int, std::set<int>>& userProducts;

public:

    // The execute function receives the parsed Command struct
    void execute() override;

    RecommendCommand(std::unordered_map<int, std::set<int>>& db);

};
