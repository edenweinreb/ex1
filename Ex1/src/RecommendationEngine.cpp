
#include "RecommendationEngine.h"
#include <algorithm> //  set_intersection
#include <iterator>  //  back_inserter
#include <vector>
#include <set>
#include <unordered_map>


int RecommendationEngine::calculateSimilarity(const std::set<int>& userA, const std::set<int>& userB) {
        // set_intersection
    //std::sort(userA.begin(), userA.end());
    //std::sort(userB.begin(), userB.end());

    std::vector<int> intersection;
    std::set_intersection(userA.begin(), userA.end(),
                          userB.begin(), userB.end(),
                          std::back_inserter(intersection));

    //the nummber of values that similar
    return (int)intersection.size();
}

std::vector<int> RecommendationEngine::getSortedRecommendations(int user_id, const std::unordered_map<int, std::set<int>>& user_products, const std::unordered_map<int,int>& dictionaryOfSimilarities) {
    
    return {}; // מחזיר וקטור ריק בינתיים
}