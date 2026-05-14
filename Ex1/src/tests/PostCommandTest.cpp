#include <gtest/gtest.h>
#include "CommandParser.h"
#include "FileRepository.h"
#include "ICommand.h"
#include <fstream>

// helper to create a repo for testing
class POSTCommandTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"};
     void SetUp() override {
         // Empty the file contents before each test starts
         std::ofstream ofs("data/test.csv", std::ofstream::trunc);
     }
};

TEST_F(POSTCommandTest, ParseValidPOSTCommand) {
    ICommand* cmd = CommandParser::parse("POST 20 400", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "201 Created");
    delete cmd;

    std::set<int> userProducts = repo.getUserData(20);
    std::set<int> productUsers = repo.getProductUsers(400);
    
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(POSTCommandTest, ParseSamePIdPOSTCommand) {
    ICommand* cmd = CommandParser::parse("POST 20 400 400", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "201 Created");
    delete cmd;

    std::set<int> productUsers = repo.getProductUsers(400);
    std::set<int> userProducts = repo.getUserData(20);
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(POSTCommandTest, POSTCommandWithExtraSpaces) {
    ICommand* cmd = CommandParser::parse("  POST   20   400  ", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "201 Created");
    delete cmd; 

    std::set<int> productUsers = repo.getProductUsers(400);
    std::set<int> userProducts = repo.getUserData(20);
    EXPECT_EQ(userProducts.size(), 1);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(POSTCommandTest, POSTFailsIfUserAlreadyExists) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("POST 20 500", repo); 
    ASSERT_NE(cmd2, nullptr);
    
    EXPECT_EQ(cmd2->execute(), "404 Not Found"); 
    delete cmd2;
}

TEST_F(POSTCommandTest, InvalidFormatMissingProductId) {
    ICommand* cmd = CommandParser::parse("POST 20", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "400 Bad Request"); 
    delete cmd;
}

TEST_F(POSTCommandTest, InvalidNonNumericInput) {
    ICommand* cmd = CommandParser::parse("POST aaa 400", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "400 Bad Request"); 
    delete cmd;
}

TEST_F(POSTCommandTest, InvalidNonNumericProductInput) {
    ICommand* cmd = CommandParser::parse("POST 20 aaa", repo);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "400 Bad Request"); 
    delete cmd;
}