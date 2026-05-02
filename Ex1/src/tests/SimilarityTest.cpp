#include <gtest/gtest.h>
#include <vector>
#include <set>
#include "../RecommendationEngine.h" 

// test case 1: users with no products at all would get 0
TEST(SimilarityTest, ReturnsZeroForNoCommonProducts) {
    // (Arrange)
    std::set<int> productList1 = {101, 105, 110};
    std::set<int> productList2 = {102, 106, 111};
    
    // (Act)
    // 2. קריאה לפונקציה מתוך המחלקה שיצרת
    int score = RecommendationEngine::calculateSimilarity(productList1, productList2);
    
    // (Assert)
    // 0 intersections expected
    EXPECT_EQ(score, 0); 
}
// another test in case that there is an intersection
TEST(SimilarityTest, ReturnsCorrectScoreForCommonProducts) {
    std::set<int> listA = {1, 2, 3, 4};
    std::set<int> listB = {3, 4, 5, 6}; // חפיפה של 3 ו-4 (ציון 2)
    
    int score = RecommendationEngine::calculateSimilarity(listA, listB);
    
    EXPECT_EQ(score, 2);
}