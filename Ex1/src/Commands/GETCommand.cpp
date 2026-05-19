//#pragma once
#include "ICommand.h"
#include "IDataRepository.h"
#include <ostream>
#include <sstream>
#include "GetCommand.h"
#include "RecommendationEngine.h"
#include <algorithm>
#include <vector>

GetCommand::GetCommand(IDataRepository& repo, std::ostream& output)
    : repo(repo), output(output) {}

GetCommand::GetCommand(IDataRepository& repo, std::ostream& output, int uId, int pId)
    : repo(repo), output(output), userId(uId), productId(pId) {}

std::string GetCommand::execute() {
    std::ostringstream localOutput;
    if (!repo.userExists(userId)) 
    return "404 Not Found\n";
    
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
        localOutput << sorted[i];
        if (i < limit - 1) localOutput << " ";
    }
    localOutput << "\n";

    // returns 200 Ok followed by two newlines and the results
    return "200 Ok\n\n" + localOutput.str();
}