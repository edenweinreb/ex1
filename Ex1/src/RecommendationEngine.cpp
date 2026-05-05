
#include "RecommendationEngine.h"
#include <algorithm> //  set_intersection
#include <iterator>  //  back_inserter
#include <vector>
#include <set>
#include <unordered_map>
# include <map>


int RecommendationEngine::calculateSimilarity(const std::set<int>& userA, const std::set<int>& userB) {
        // set_intersection
    std::vector<int> intersection;
    std::set_intersection(userA.begin(), userA.end(),
                          userB.begin(), userB.end(),
                          std::back_inserter(intersection));

    //the nummber of values that similar
    return (int)intersection.size();
}

     std::vector<int> RecommendationEngine::getSortedRecommendations(
    const std::map<int, int>& productWeights) {

    std::vector<std::pair<int,int>> products(productWeights.begin(), productWeights.end());

    std::sort(products.begin(), products.end(),
        [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });

    std::vector<int> result;
    for (const auto& p : products) {
        result.push_back(p.first);
    }
    return result;
}
    std::map<int, int> RecommendationEngine::getProductWeights(
    int userid,
    int productid,
    const std::map<int, std::set<int>>& userProducts,
    const std::map<int, std::set<int>>& productToUsers,
    const std::map<int, int>& similarities) {

    std::map<int, int> productWeights;
    const std::set<int>& userWatched = userProducts.at(userid);

    if (productToUsers.find(productid) == productToUsers.end())
        return productWeights;

    const std::set<int>& filteredUsers = productToUsers.at(productid);

    for (int user : filteredUsers) {
        if (user == userid) continue;
        if (similarities.find(user) == similarities.end()) continue;
        int similarity = similarities.at(user);
        for (int product : userProducts.at(user)) {
            if (userWatched.find(product) != userWatched.end()) continue;
            if (product == productid) continue;
            productWeights[product] += similarity;
        }
    }
    return productWeights;
}
