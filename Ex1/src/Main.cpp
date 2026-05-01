#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <set>
#include "RecommendationEngine.h"


int main() {
    // need to be removed after merge with Shiraz
    std::unordered_map<int, std::set<int>> userProducts;
    std::string line;
//read the input from user    
    while (std::getline(std::cin, line)) {
        std::istringstream iss(line);
        std::string command;
        //read the first word
        iss >> command;

        if (command == "recommend") {
            int userid, productid;
            //make sure that there are just 2 int
            if (iss >> userid >> productid) {
                
//making sure there is no extra trash after the 2 int
                std::string extra;
                if (!(iss >> extra)) 
                {
                    //dictionary that would include the user id and the number of similar products with the other users
                     std ::unordered_map<int,int> dictionaryOfSimilarities;
                        //making sure that our user exist in system
                        if(userProducts.find(userid) != userProducts.end())
                    {
                        const std::set<int>& userVector = userProducts[userid];
                        for(const auto& pair : userProducts )
                        {
                            const int current_user = pair.first;
                            const std::set<int>& current_user_vector = pair.second;
                            if (current_user != userid) {
                            int similiarityCount = RecommendationEngine::calculateSimilarity(userVector, current_user_vector);
                            dictionaryOfSimilarities[current_user] = similiarityCount;
                            }
                        }
                    }
                    // getting from eden the vector of weighted products and print top 10 products, the vector would be sorted
                    const std::vector<int>& weightVector = RecommendationEngine :: getSortedRecommendations(userid,userProducts
                        ,dictionaryOfSimilarities);
                    // complete logic min 10 or the num in the weightVector


                } 
            }
        }
        else if (command == "add") {
// to do : add
        }
        else if (command == "help") {
// to do add
        }
    }

    return 0;
}