#include "gtest/gtest.h"
#include "CommandParser.h"
#include <string>
#include <vector>

using namespace std;

// Verifies that the parser correctly extracts the command type, the user ID, and a number of product IDs
TEST(ParserTest, ValidAddCommand) {
    string input = "add 1 101 102";
    Command cmd = CommandParser::parse(input);
    EXPECT_EQ(cmd.type, CommandType::ADD);
    
    // Fixed: Comparing to integer 1 instead of string "1"
    EXPECT_EQ(cmd.userId, 1); 
    
    ASSERT_EQ(cmd.productIds.size(), 2); 
    // Fixed: Comparing to integers 101, 102
    EXPECT_EQ(cmd.productIds[0], 101);
    EXPECT_EQ(cmd.productIds[1], 102);
}

// Ensures the parser enforces the strict format of [userid] and exactly one [productid] 
TEST(ParserTest, ValidRecommendCommand) {
    string input = "recommend 1 104";
    Command cmd = CommandParser::parse(input);
    EXPECT_EQ(cmd.type, CommandType::RECOMMEND);
    
    // Fixed: Comparing to integer 1
    EXPECT_EQ(cmd.userId, 1);
    ASSERT_EQ(cmd.productIds.size(), 1);
    // Fixed: Comparing to integer 104
    EXPECT_EQ(cmd.productIds[0], 104);
}

// Verifies that the word 'help' is recognized as a valid command type.
TEST(ParserTest, ValidHelpCommand) {
    Command cmd = CommandParser::parse("help");
    EXPECT_EQ(cmd.type, CommandType::HELP);
}

// Test for whitespace flexibility
TEST(ParserTest, ExtraSpacesHandling) {
    string input = "add   5      200    201";
    Command cmd = CommandParser::parse(input);
    EXPECT_EQ(cmd.type, CommandType::ADD);
    
    // Fixed: Comparing to integer 5
    EXPECT_EQ(cmd.userId, 5);
    EXPECT_EQ(cmd.productIds.size(), 2);
}

// Test for silent failure on invalid input 
TEST(ParserTest, InvalidCommandsSilence) {
    EXPECT_EQ(CommandParser::parse("foo 1 2").type, CommandType::INVALID);
    EXPECT_EQ(CommandParser::parse("add 1").type, CommandType::INVALID);
    EXPECT_EQ(CommandParser::parse("").type, CommandType::INVALID);
}