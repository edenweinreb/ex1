#include <gtest/gtest.h>
#include "CommandParser.h"
#include "FileRepository.h"
#include "ICommand.h"
#include "../Data/DefaultIO.h" 
#include <fstream>

class MockIO : public DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

// helper to create a repo for testing
class PatchCommandTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"};
    MockIO dio; // הוספת אובייקט ה-IO לטסטים

    void SetUp() override {
        // Empty the file contents before each test starts
        std::ofstream ofs("data/test.csv", std::ofstream::trunc);
    }
};

TEST_F(PatchCommandTest, ParseValidPatchCommand) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("PATCH 20 500", repo, dio); 
    ASSERT_NE(cmd2, nullptr);
    
    EXPECT_EQ(cmd2->execute(), "204 No Content"); 
    delete cmd2;

    std::set<int> userProducts = repo.getUserData(20);
    std::set<int> productUsers = repo.getProductUsers(500);
    
    EXPECT_EQ(userProducts.size(), 2);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_TRUE(userProducts.count(500));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(PatchCommandTest, ParseSamePIdPatchCommand) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("PATCH 20 500 500", repo, dio); 
    ASSERT_NE(cmd2, nullptr);
    
    EXPECT_EQ(cmd2->execute(), "204 No Content"); 
    delete cmd2;

    std::set<int> productUsers = repo.getProductUsers(400);
    std::set<int> userProducts = repo.getUserData(20);
    EXPECT_EQ(userProducts.size(), 2);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_TRUE(userProducts.count(500));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(PatchCommandTest, PatchCommandWithExtraSpaces) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("   PATCH   20   500  ", repo, dio); 
    ASSERT_NE(cmd2, nullptr);
    
    EXPECT_EQ(cmd2->execute(), "204 No Content"); 
    delete cmd2;

    std::set<int> productUsers = repo.getProductUsers(400);
    std::set<int> userProducts = repo.getUserData(20);
    EXPECT_EQ(userProducts.size(), 2);
    EXPECT_TRUE(userProducts.count(400));
    EXPECT_TRUE(userProducts.count(500));
    EXPECT_EQ(productUsers.size(), 1);
    EXPECT_TRUE(productUsers.count(20));
}

TEST_F(PatchCommandTest, PatchFailsIfUserDoNotExists) {
    ICommand* cmd = CommandParser::parse("PATCH 20 400", repo, dio);
    ASSERT_NE(cmd, nullptr);
    EXPECT_EQ(cmd->execute(), "404 Not Found");
    delete cmd;
}

TEST_F(PatchCommandTest, InvalidFormatMissingProductId) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("PATCH 20", repo, dio); 
    // מצפים ל-nullptr בגלל שהקלט חסר
    EXPECT_EQ(cmd2, nullptr); 
}

TEST_F(PatchCommandTest, InvalidNonNumericInput) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("PATCH aaa 400", repo, dio); 
    // nullptr expected
    EXPECT_EQ(cmd2, nullptr); 
}

TEST_F(PatchCommandTest, InvalidNonNumericProductInput) {
    ICommand* cmd1 = CommandParser::parse("POST 20 400", repo, dio);
    ASSERT_NE(cmd1, nullptr);
    EXPECT_EQ(cmd1->execute(), "201 Created");
    delete cmd1; 

    ICommand* cmd2 = CommandParser::parse("PATCH 20 aaa", repo, dio); 
    // nullptr expected
    EXPECT_EQ(cmd2, nullptr); 
}