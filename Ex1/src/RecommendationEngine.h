#pragma once 

#include <vector>

class RecommendationEngine {
public:
    static int calculateSimilarity(const std::vector<int>& userA, const std::vector<int>& userB);
};