#include "RecommendCommand.h"
#include "RecommendationEngine.h"
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

using std::cout;

// Constructor implementation
RecommendCommand::RecommendCommand(std::unordered_map<int, std::set<int>>& db) 
    : userProducts(db) {}

// Execute function implementation
void RecommendCommand::execute(const Command& cmd) {
    
    // שליפת הנתונים ישירות מהמבנה של הפקודה שהתקבלה כפרמטר
    int userid = std::stoi(cmd.userId);
    int productid = std::stoi(cmd.productIds[0]); 
    
    std::unordered_map<int,int> dictionaryOfSimilarities;
    
    // the user exist in list
    // שימי לב: אנחנו משתמשים ב-userProducts של המחלקה (שהגיעה מהבנאי)
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
    
    // making sure we are not over the max limit of printung Top 10 products
    int limit = std::min(10, (int)finalRecommendations.size());
    
    for (int i=0; i < limit; i++) {
        std::cout << finalRecommendations[i];
        if (i < limit - 1) {
            std::cout << " ";
        }
    }
    std::cout << "\n";
}