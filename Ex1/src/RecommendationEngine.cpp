#include "RecommendationEngine.h"
#include <algorithm> 

// TODO: Merge with AE-12 Branch

// counts how many products two users have in common
static int calculateSimilarity(const std::set<int>& a, const std::set<int>& b) {
    int count = 0;
    for (int product : a) {
        if (b.find(product) != b.end()) count++;
    }
    return count;
}

// calculates a relevance score for each product based on similar users who watched the target product
static std::map<int, int> getProductWeights(
    int userid,
    int productid,
    const std::unordered_map<int, std::set<int>>& userProducts,
    const std::unordered_map<int, std::set<int>>& productToUsers,
    const std::unordered_map<int, int>& similarities) {

    std::map<int, int> productWeights;
    const std::set<int>& userWatched = userProducts.at(userid);

     // if no one watched the target product, return empty
    if (productToUsers.find(productid) == productToUsers.end())
        return productWeights;

    // get only users who watched the target product
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

// sorts products by weight descending, ties broken by product id ascending
static std::vector<int> getSortedRecommendations(
    const std::map<int, int>& productWeights) {

    // copy to vector for sorting
    std::vector<std::pair<int,int>> products(productWeights.begin(), productWeights.end());

    std::sort(products.begin(), products.end(),
        [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });

    // extract just the product ids
    std::vector<int> result;
    for (const auto& p : products) {
        result.push_back(p.first);
    }
    return result;
}