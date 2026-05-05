#ifndef RECOMMENDATION_ENGINE_H
#define RECOMMENDATION_ENGINE_H

#include <map>
#include <set>
#include <vector>
#include <unordered_map>

class RecommendationEngine {
public:
    static int calculateSimilarity(
        const std::set<int>& a, 
        const std::set<int>& b);

    static std::map<int, int> getProductWeights(
        int userid,
        int productid,
        const std::unordered_map<int, std::set<int>>& userProducts,
        const std::unordered_map<int, std::set<int>>& productToUsers,
        const std::unordered_map<int, int>& similarities);

    static std::vector<int> getSortedRecommendations(
        const std::map<int, int>& productWeights);
};

#endif