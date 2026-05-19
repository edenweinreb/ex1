#include <gtest/gtest.h>
#include "FileRepository.h"
#include "IDataRepository.h"
#include "CommandParser.h"
#include "ICommand.h"
#include "AddCommand.h"
#include "../Data/DefaultIO.h"
#include <fstream>
#include <vector>
#include <set>

class MockIO : public DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

TEST(AddCommandTest, ParseValidAddCommand) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "POST 10 203";
    
    auto cmd = parser.parse(input, repo, dio);
    if (cmd) { cmd->execute(); delete cmd; } 

    std::set<int> productUsers = repo.getProductUsers(203);
    std::set<int> userProducts = repo.getUserData(10);
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(203));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(10));
}

TEST(AddCommandTest, ParseSamePIdAddCommand) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "POST 10 203 203";
    
    auto cmd = parser.parse(input, repo, dio);
    if (cmd) { cmd->execute(); delete cmd; } 

    std::set<int> productUsers = repo.getProductUsers(203);
    std::set<int> userProducts = repo.getUserData(10);
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(203));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(10));
}

TEST(AddCommandTest, ParseAddCommandWithExtraSpaces) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "  POST   10   203";

    auto cmd = parser.parse(input, repo, dio);
    if (cmd) { cmd->execute(); delete cmd; } 

    std::set<int> productUsers = repo.getProductUsers(203);
    std::set<int> userProducts = repo.getUserData(10);
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(203));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(10));
}

TEST(RepositoryTest, GetProductUsersTest) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    std::string input1 = "POST 10 203";
    std::string input2 = "POST 20 203";

    auto cmd1 = parser.parse(input1, repo, dio);
    if (cmd1) { cmd1->execute(); delete cmd1; }

    auto cmd2 = parser.parse(input2, repo, dio);
    if (cmd2) { cmd2->execute(); delete cmd2; }

    std::set<int> productUsers = repo.getProductUsers(203);
    EXPECT_EQ(productUsers.size(), 2);
    EXPECT_TRUE(productUsers.count(10));
    EXPECT_TRUE(productUsers.count(20));
}

TEST(AddCommandTest, InvalidFormatMissingProductId) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "POST 10";

    EXPECT_EQ(parser.parse(input, repo, dio), nullptr);
}

TEST(AddCommandTest, InvalidNonNumericInput) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "POST aaa 203";

    EXPECT_EQ(parser.parse(input, repo, dio), nullptr);
}

TEST(AddCommandTest, InvalidNonNumericProductInput) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;
    std::string input = "POST 10 aaa";

    EXPECT_EQ(parser.parse(input, repo, dio), nullptr);
}