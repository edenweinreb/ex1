#ifndef RECOMMENDATION_ENGINE_H
#define RECOMMENDATION_ENGINE_H

#include <set>
#include <map>
#include <vector>
#include "IDataRepository.h" // Required for the IDataRepository reference

class RecommendationEngine {
public:
    // Default constructor and destructor (no member variables to initialize or clean up)
    RecommendationEngine() = default;
    ~RecommendationEngine() = default;

    // Counts how many products two users have in common
    static int calculateSimilarity(const std::set<int>& a, const std::set<int>& b);

    // Calculates a relevance score for each product based on similar users who watched the target product
    static std::map<int, int> getProductWeights(
        int userid,
        int productid,
        IDataRepository& repo,
        const std::map<int, int>& similarities);

    // Sorts products by weight descending, ties broken by product id ascending
    static std::vector<int> getSortedRecommendations(const std::map<int, int>& productWeights);
};

#endif // RECOMMENDATION_ENGINE_H