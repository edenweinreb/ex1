//#pragma once
#include "ICommand.h"
#include "IDataRepository.h"
#include <ostream>
#include "RecommendCommand.h"
#include "RecommendationEngine.h"
#include <algorithm>
#include <vector>

RecommendCommand::RecommendCommand(IDataRepository& repo, std::ostream& output)
    : repo(repo), output(output) {}

RecommendCommand::RecommendCommand(IDataRepository& repo, std::ostream& output, int uId, int pId)
    : repo(repo), output(output), userId(uId), productId(pId) {}

void RecommendCommand::execute() {

    // get current user's watched products
    std::set<int> userWatched = repo.getUserData(userId);

    // calculate similarity with all users who watched target product
    std::set<int> filteredUsers = repo.getProductUsers(productId);
   
    std::map<int, int> similarities;
    for (int user : filteredUsers) {
        if (user == userId) continue;
        std::set<int> otherWatched = repo.getUserData(user);
        similarities[user] = RecommendationEngine::calculateSimilarity(userWatched, otherWatched);
    }

    // get weighted and sorted recommendations
    auto weights = RecommendationEngine::getProductWeights(
        userId, productId, repo, similarities);
   
    auto sorted = RecommendationEngine::getSortedRecommendations(weights);

    // print top 10
    int limit = std::min(10, (int)sorted.size());
    for (int i = 0; i < limit; i++) {
        output << sorted[i];
        if (i < limit - 1) output << " ";
    }
    output << "\n";
}