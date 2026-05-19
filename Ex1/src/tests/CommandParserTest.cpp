#include <gtest/gtest.h>
#include "CommandParser.h"
#include "FileRepository.h"
#include "../Commands/ICommand.h"
#include "../Data/DefaultIO.h"

class MockIO : public DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

class CommandParserTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"};
    MockIO dio;
};

TEST_F(CommandParserTest, ParseGETCommand_ValidInput) {
    ICommand* cmd = CommandParser::parse("GET 123 456", repo, dio);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParseGETCommand_CaseSensitiveName) {
    ICommand* cmd = CommandParser::parse("get 1 2", repo, dio);
    EXPECT_NE(cmd, nullptr);
    delete cmd; 
}

TEST_F(CommandParserTest, ParseGETCommand_MissingOneArgument) {
    ICommand* cmd = CommandParser::parse("GET 1", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseGETCommand_MissingBothArguments) {
    ICommand* cmd = CommandParser::parse("GET", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseGETCommand_ExtraArguments) {
    ICommand* cmd = CommandParser::parse("GET 1 2 3", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseGETCommand_EmptyString) {
    ICommand* cmd = CommandParser::parse("", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, ParseGETCommand_WrongCommandName) {
    ICommand* cmd = CommandParser::parse("POST 1 2", repo, dio);
    EXPECT_NE(cmd, nullptr);  
    delete cmd;
}

TEST_F(CommandParserTest, ParseHelpCommand_Valid) {
    ICommand* cmd = CommandParser::parse("help", repo, dio);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParsePOSTCommand_Valid) {
    ICommand* cmd = CommandParser::parse("POST 1 100 101 102", repo, dio);
    EXPECT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(CommandParserTest, ParsePOSTCommand_NoProducts) {
    ICommand* cmd = CommandParser::parse("POST 1", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}

TEST_F(CommandParserTest, UnknownCommand) {
    ICommand* cmd = CommandParser::parse("foo 1 2", repo, dio);
    EXPECT_EQ(cmd, nullptr);
}