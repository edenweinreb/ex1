#pragma once 
#include <set>
#include <vector>
#include <unordered_map>
#include <map>

class RecommendationEngine {
public:
    static int calculateSimilarity(const std::set<int>& userA, const std::set<int>& userB);
    
    static std::vector<int> getSortedRecommendations(const std::map<int, int>& productWeights);

    static std::map<int, int> getProductWeights(
    int userid,
    int productid,
    const std::map<int, std::set<int>>& userProducts,
    const std::map<int, std::set<int>>& productToUsers,
    const std::map<int, int>& similarities);

};