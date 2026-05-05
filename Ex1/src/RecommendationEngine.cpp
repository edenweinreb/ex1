#include "RecommendationEngine.h"
#include <algorithm> 

static int calculateSimilarity(const std::set<int>& a, const std::set<int>& b) {
    int count = 0;
    for (int product : a) {
        if (b.find(product) != b.end()) count++;
    }
    return count;
}

static std::map<int, int> getProductWeights(
    int userid,
    int productid,
    const std::unordered_map<int, std::set<int>>& userProducts,
    const std::unordered_map<int, std::set<int>>& productToUsers,
    const std::unordered_map<int, int>& similarities) {

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

static std::vector<int> getSortedRecommendations(
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