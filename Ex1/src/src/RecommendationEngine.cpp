
#include "RecommendationEngine.h"
#include <algorithm> //  set_intersection
#include <iterator>  //  back_inserter

int RecommendationEngine::calculateSimilarity(std::vector<int> userA, std::vector<int> userB) {
    // set_intersection
    std::sort(userA.begin(), userA.end());
    std::sort(userB.begin(), userB.end());

    std::vector<int> intersection;
    std::set_intersection(userA.begin(), userA.end(),
                          userB.begin(), userB.end(),
                          std::back_inserter(intersection));

    //the nummber of values that similar
    return (int)intersection.size();
}
