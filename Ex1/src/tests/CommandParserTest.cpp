#include <gtest/gtest.h>
#include "CommandParser.h" // Ensure the path to this file is correct for your project

// --- Valid Cases ---

TEST(CommandParserTest, ParseRecommendCommand_ValidInput) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("recommend 123 456");

    EXPECT_EQ(cmd.type, CommandType::RECOMMEND);
    EXPECT_EQ(cmd.userId, "123");
    ASSERT_EQ(cmd.productIds.size(), 1);
    EXPECT_EQ(cmd.productIds[0], "456");
}

TEST(CommandParserTest, ParseRecommendCommand_ValidInputWithExtraSpaces) {
    CommandParser parser;
    // The function should gracefully ignore multiple spaces or tabs
    Command cmd = parser.parseRecommendCommand("   recommend \t 10 \t  20   ");

    EXPECT_EQ(cmd.type, CommandType::RECOMMEND);
    EXPECT_EQ(cmd.userId, "10");
    ASSERT_EQ(cmd.productIds.size(), 1);
    EXPECT_EQ(cmd.productIds[0], "20");
}

TEST(CommandParserTest, ParseRecommendCommand_ValidInputNegativeIds) {
    CommandParser parser;
    // The current implementation uses 'int', so it can theoretically accept negative numbers
    Command cmd = parser.parseRecommendCommand("recommend -5 -10");

    EXPECT_EQ(cmd.type, CommandType::RECOMMEND);
    EXPECT_EQ(cmd.userId, "-5");
    ASSERT_EQ(cmd.productIds.size(), 1);
    EXPECT_EQ(cmd.productIds[0], "-10");
}

// --- Invalid Cases ---

TEST(CommandParserTest, ParseRecommendCommand_EmptyString) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_WrongCommandName) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("add 1 2");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_CaseSensitiveName) {
    CommandParser parser;
    // The function expects strictly lowercase characters for the command name
    Command cmd = parser.parseRecommendCommand("Recommend 1 2");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_MissingOneArgument) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("recommend 1");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_MissingBothArguments) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("recommend");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_ExtraArguments) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("recommend 1 2 3");

    // Due to the extra parameter, the function should return INVALID
    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_StringInsteadOfInt) {
    CommandParser parser;
    Command cmd = parser.parseRecommendCommand("recommend one two");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}

TEST(CommandParserTest, ParseRecommendCommand_ExtraTrashAttachedToInt) {
    CommandParser parser;
    // In this case, istringstream reads '2' and leaves 'a' in the stream.
    // This will be caught by the 'extra' variable mechanism, failing the command.
    Command cmd = parser.parseRecommendCommand("recommend 1 2a");

    EXPECT_EQ(cmd.type, CommandType::INVALID);
}