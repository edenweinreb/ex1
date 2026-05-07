#include <gtest/gtest.h>
#include "CommandParser.h"
#include "FileRepository.h"

// helper to create a repo for testing
class CommandParserTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"};
};

// --- Valid Cases ---

TEST_F(CommandParserTest, ParseRecommendCommand_ValidInput) {
    ICommand* cmd = CommandParser::parse("recommend 123 456", repo);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParseRecommendCommand_CaseSensitiveName) {
    ICommand* cmd = CommandParser::parse("Recommend 1 2", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseRecommendCommand_MissingOneArgument) {
    ICommand* cmd = CommandParser::parse("recommend 1", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseRecommendCommand_MissingBothArguments) {
    ICommand* cmd = CommandParser::parse("recommend", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseRecommendCommand_ExtraArguments) {
    ICommand* cmd = CommandParser::parse("recommend 1 2 3", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseRecommendCommand_EmptyString) {
    ICommand* cmd = CommandParser::parse("", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseRecommendCommand_WrongCommandName) {
    ICommand* cmd = CommandParser::parse("add 1 2", repo);
    EXPECT_NE(cmd, nullptr);  // add is valid
    delete cmd;
}

TEST_F(CommandParserTest, ParseHelpCommand_Valid) {
    ICommand* cmd = CommandParser::parse("help", repo);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParseAddCommand_Valid) {
    ICommand* cmd = CommandParser::parse("add 1 100 101 102", repo);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParseAddCommand_NoProducts) {
    ICommand* cmd = CommandParser::parse("add 1", repo);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, UnknownCommand) {
    ICommand* cmd = CommandParser::parse("foo 1 2", repo);
    EXPECT_EQ(cmd, nullptr);
}