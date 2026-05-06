#pragma once
#include "ICommand.h"
#include "IDataRepository.h"
#include <ostream>

class RecommendCommand : public ICommand {
private:
    IDataRepository& repo;  // data access through interface
    std::ostream& output;   // output stream for loose coupling
public:
    RecommendCommand(IDataRepository& repo, std::ostream& output);
    void execute() override;
    ~RecommendCommand() override {}
};

#include "RecommendCommand.h"
#include "RecommendationEngine.h"
#include <algorithm>
#include <vector>

RecommendCommand::RecommendCommand(IDataRepository& repo, std::ostream& output)
    : repo(repo), output(output) {}

void RecommendCommand::execute() {
    // get args from currentCmd
    int userid = std::stoi(currentCmd.userId);
    int productid = std::stoi(currentCmd.productIds[0]);

    // get current user's watched products
    std::set<int> userWatched = repo.getUserData(userid);

    // calculate similarity with all users who watched target product
    std::set<int> filteredUsers = repo.getProductUsers(productid);
   
    std::map<int, int> similarities;
    for (int user : filteredUsers) {
        if (user == userid) continue;
        std::set<int> otherWatched = repo.getUserData(user);
        similarities[user] = RecommendationEngine::calculateSimilarity(userWatched, otherWatched);
    }

    // get weighted and sorted recommendations
    auto weights = RecommendationEngine::getProductWeights(
        userid, productid, repo, similarities);
   
    auto sorted = RecommendationEngine::getSortedRecommendations(weights);

    // print top 10
    int limit = std::min(10, (int)sorted.size());
    for (int i = 0; i < limit; i++) {
        output << sorted[i];
        if (i < limit - 1) output << " ";
    }
    output << "\n";
}
