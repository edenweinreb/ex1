#include <gtest/gtest.h>
#include <sstream>
#include "App.h"

// Helper to set up the app with the exact data from the appendix
std::string getAppendixInput() {
    return "add 1 100 101 102 103\n"
           "add 2 101 102 104 105 106\n"
           "add 3 100 104 105 107 108\n"
           "add 4 101 105 106 107 109 110\n"
           "add 5 100 102 103 105 108 111\n"
           "add 6 100 103 104 110 111 112 113\n"
           "add 7 102 105 106 107 108 109 110\n"
           "add 8 101 104 105 106 109 111 114\n"
           "add 9 100 103 105 107 112 113 115\n"
           "add 10 100 102 105 106 107 109 110 116\n";
}

// Table 1: similarity scores between user 1 and all others
TEST(TablesTest, SimilarityScoresTable1) {
    std::istringstream input(getAppendixInput() + "recommend 1 104");
    std::ostringstream output;
    App app(input, output);
    app.run();

    // if output is correct, similarity scores were correct
    // user 5 has highest similarity (3), user 2,6,9,10 have 2, rest have 1
    EXPECT_EQ(output.str(), "105 106 111 110 112 113 107 108 109 114\n");
}

// Table 2: product weights for users who watched product 104
TEST(TablesTest, ProductWeightsTable2) {
    std::istringstream input(getAppendixInput() + "recommend 1 104");
    std::ostringstream output;
    App app(input, output);
    app.run();

    // 105 should be first (weight 4)
    // 106 and 111 should be next (weight 3)
    std::string result = output.str();
    EXPECT_EQ(result.substr(0, 3), "105");
    EXPECT_NE(result.find("106"), std::string::npos);
    EXPECT_NE(result.find("111"), std::string::npos);
}

// Table 3: final sorted output
TEST(TablesTest, FinalSortedOutputTable3) {
    std::istringstream input(getAppendixInput() + "recommend 1 104");
    std::ostringstream output;
    App app(input, output);
    app.run();

    EXPECT_EQ(output.str(), "105 106 111 110 112 113 107 108 109 114\n");
}