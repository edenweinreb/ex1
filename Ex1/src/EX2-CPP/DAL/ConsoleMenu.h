#pragma once
#include "IMenu.h"
#include <string>
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <set>
#include <unordered_map>

// Reads input from stdin and writes errors to stdout
class ConsoleMenu : public IMenu {
    public:
        //void executeRecommendCommand(const std::string& line, const std::unordered_map<int, std::set<int>>& userProducts) override;
        std::string nextCommand();
        void displayError(std::string message) override;
};

