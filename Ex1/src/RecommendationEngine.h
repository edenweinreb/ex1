#pragma once 
#include <set>
#include <vector>
#include <unordered_map>

class RecommendationEngine {
public:
    static int calculateSimilarity(const std::set<int>& userA, const std::set<int>& userB);
public:
    static std::vector<int> getSortedRecommendations
    (int user_id, const std::unordered_map<int, std::set<int>>& user_products, const std::unordered_map<int,int>& dictionaryOfSimilarities);

};