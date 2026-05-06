#include "RecommendationEngine.h"
#include <algorithm>

int RecommendationEngine::calculateSimilarity(
    const std::set<int>& a, const std::set<int>& b) {
    int count = 0;
    for (int product : a) {
        if (b.find(product) != b.end()) count++;
    }
    return count;
}

std::map<int, int> RecommendationEngine::getProductWeights(
    int userid,
    int productid,
    IDataRepository& repo,
    const std::map<int, int>& similarities) {

    std::map<int, int> productWeights;
    std::set<int> userWatched = repo.getUserData(userid);

    // get only users who watched the target product
    std::set<int> filteredUsers = repo.getProductUsers(productid);
    if (filteredUsers.empty()) return productWeights;

    for (int user : filteredUsers) {
        if (user == userid) continue;
        if (similarities.find(user) == similarities.end()) continue;
        int similarity = similarities.at(user);
        for (int product : repo.getUserData(user)) {
            if (userWatched.find(product) != userWatched.end()) continue;
            if (product == productid) continue;
            productWeights[product] += similarity;
        }
    }
    return productWeights;
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