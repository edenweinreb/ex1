#include <gtest/gtest.h>
#include "../CommandParser.h" 

// 1. validation of input
TEST(RecommendParserTest, ValidCommand) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend 1 104", userid, productid);
    
    EXPECT_TRUE(isValid);      
    EXPECT_EQ(userid, 1);      
    EXPECT_EQ(productid, 104);  
}

// 2. more shifts in the command - suppose to run correctly
TEST(RecommendParserTest, ValidCommandWithExtraSpaces) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend    5     200", userid, productid);
    
    EXPECT_TRUE(isValid);
    EXPECT_EQ(userid, 5);
    EXPECT_EQ(productid, 200);
}

// 3. one parameter or more is lack
TEST(RecommendParserTest, MissingParameter) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend 1", userid, productid);
    
    EXPECT_FALSE(isValid);      // אנחנו מצפים שהפונקציה תדחה את הפקודה
}

// 4. extra text after command
TEST(RecommendParserTest, ExtraParameters) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend 1 104 105", userid, productid);
    
    EXPECT_FALSE(isValid);
}

// 5. extra text after the end of command
TEST(RecommendParserTest, ExtraTextTrash) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend 1 104 blabla", userid, productid);
    
    EXPECT_FALSE(isValid);
}

// 6. diffrent type of varaibales
TEST(RecommendParserTest, InvalidVariableTypes) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recommend A 104", userid, productid);
    
    EXPECT_FALSE(isValid);
}

// 7.wrong command or typo
TEST(RecommendParserTest, TypoInCommand) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("recomand 1 104", userid, productid);
    
    EXPECT_FALSE(isValid);
}

//8. trying to run differend method
TEST(RecommendParserTest, DifferentCommand) {
    int userid = 0, productid = 0;
    bool isValid = CommandParser::parseRecommendCommand("add 1 104", userid, productid);
    
    EXPECT_FALSE(isValid);
}