#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <set>
#include <algorithm>
#include "RecommendationEngine.h"
#include "CommandParser.h"

//need to be modified to the struct change
int main() {
    // need to be removed after merge with Shiraz -including the user id and the user item vector
    std::unordered_map<int, std::set<int>> userProducts;
    std::string line;

    while(std::getline(std::cin, line)) {
        //Command cmd = CommandParser::parse(line);
        std::istringstream iss(line);
        std::string command;
        
        // read the first word in order to know what kind of function it is
        iss >> command;
 //after the change of the struct
        if (cmd.type == CommandType::RECOMMEND) {
            int userid, productid;
            
            // make sure that the line is correct
            if (CommandParser::parseRecommendCommand(line, userid, productid)) {
                
                std::unordered_map<int,int> dictionaryOfSimilarities;
                 //the user exist in list
                if(userProducts.find(userid) != userProducts.end()) {
                    const std::set<int>& userVector = userProducts[userid];
                    // loop that goes and check all the other users vs the current user
                    for(const auto& pair : userProducts ) {
                        const int current_user = pair.first;
                        const std::set<int>& current_user_vector = pair.second;
                        // not checking the user vs itself
                        if (current_user != userid) {
                            int similiarityCount = RecommendationEngine::calculateSimilarity(userVector, current_user_vector);
                            // updating in the dictionary the num of similarities if the current user vs all the others
                            dictionaryOfSimilarities[current_user] = similiarityCount;
                        }
                    }
                }
                // depend on the name of function that Eden choose - the function that return the products that similar
                std::vector<int> finalRecommendations = RecommendationEngine::getSortedRecommendations(productid, userProducts, dictionaryOfSimilarities);
                
                //making sure we are not over the max limit of printung Top 10 products
                int limit = std::min(10, (int)finalRecommendations.size());
                
                for (int i=0; i < limit; i++) {
                    std::cout << finalRecommendations[i];
                    if (i < limit - 1) {
                        std::cout << " ";
                    }
                }
                std::cout << "\n";
            } 
        }
        else if (cmd.type == CommandType::ADD) {
            // to do : add
        }
        else if (cmd.type == CommandType::HELP) {
            // to do : help
        }
    }

    return 0;
}