#ifndef RECOMMENDATION_ENGINE_H
#define RECOMMENDATION_ENGINE_H

#include <map>
#include <set>
#include <vector>
#include <unordered_map>

// Handles all recommendation logic similarity, weighting and sorting
class RecommendationEngine {
public:
    // counts common products between two users
    static int calculateSimilarity(
        const std::set<int>& a, 
        const std::set<int>& b);

    // calculates relevance score for each product based on similar users who watched the target product
    static std::map<int, int> getProductWeights(
        int userid,
        int productid,
        const std::unordered_map<int, std::set<int>>& userProducts,
        const std::unordered_map<int, std::set<int>>& productToUsers,
        const std::unordered_map<int, int>& similarities);
        
    // sorts products by weight descending, ties broken by product id ascending
    static std::vector<int> getSortedRecommendations(
        const std::map<int, int>& productWeights);
};

#endif