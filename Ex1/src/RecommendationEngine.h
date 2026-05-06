#ifndef RECOMMENDATION_ENGINE_H
#define RECOMMENDATION_ENGINE_H

#include "IDataRepository.h"
#include <map>
#include <set>
#include <vector>

// Handles all recommendation logic - similarity, weighting and sorting
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
        IDataRepository& repo,
        const std::map<int, int>& similarities);
       
    // sorts products by weight descending, ties broken by product id ascending
    static std::vector<int> getSortedRecommendations(
        const std::map<int, int>& productWeights);
};

#endif