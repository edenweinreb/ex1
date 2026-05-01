#pragma once 
#include <set>
#include <vector>

class RecommendationEngine {
public:
    static int calculateSimilarity(const std::set<int>& userA, const std::set<int>& userB);
public:
    static std::vector<int> RecommendationEngine::getSortedRecommendations
    (int user_id, const unordered_map<int, std::set<int>> user_products, const std ::unordered_map<int,int> dictionaryOfSimilarities);

};