#include "gtest/gtest.h"
#include "CommandParser.h"
#include "FileRepository.h"
#include "../Data/DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

class ParserTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"};
    MockIO dio;
};

TEST_F(ParserTest, ValidPOSTCommand) {
    std::string input = "POST 1 101 102";
    ICommand* cmd = CommandParser::parse(input, repo, dio);
    ASSERT_NE(cmd, nullptr);
    delete cmd;

    std::set<int> userProducts = repo.getUserData(1);
    EXPECT_EQ(userProducts.size(), 2);
    EXPECT_TRUE(userProducts.count(101));
    EXPECT_TRUE(userProducts.count(102));
}

TEST_F(ParserTest, ValidGETCommand) {
    repo.addViewedProduct(1, 104);
    std::string input = "GET 1 104";
    ICommand* cmd = CommandParser::parse(input, repo, dio);
    ASSERT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(ParserTest, ValidHelpCommand) {
    ICommand* cmd = CommandParser::parse("help", repo, dio);
    ASSERT_NE(cmd, nullptr);
    delete cmd;
}

TEST_F(ParserTest, ExtraSpacesHandling) {
    std::string input = "  POST   5      200    201";
    ICommand* cmd = CommandParser::parse(input, repo, dio);
    ASSERT_NE(cmd, nullptr);
    delete cmd;

    std::set<int> userProducts = repo.getUserData(5);
    EXPECT_EQ(userProducts.size(), 2);
    EXPECT_TRUE(userProducts.count(200));
    EXPECT_TRUE(userProducts.count(201));
}

TEST_F(ParserTest, InvalidCommandsSilence) {
    EXPECT_EQ(CommandParser::parse("foo 1 2", repo, dio), nullptr);
    EXPECT_EQ(CommandParser::parse("POST 1", repo, dio), nullptr);
    EXPECT_EQ(CommandParser::parse("", repo, dio), nullptr);
}