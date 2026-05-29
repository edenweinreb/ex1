#include <gtest/gtest.h>
#include <string>
#include <sstream>
#include "CommandParser.h"
#include "GetCommand.h"
#include "ICommand.h"
#include "FileRepository.h"
#include "../Data/DefaultIO.h" 

class MockIO : public DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

class GetCommandTest : public ::testing::Test {
protected:
    FileRepository repo{"data/test.csv"}; 
    std::ostringstream outputStream;
    MockIO dio; 
    
    void SetUp() override {
        repo.addViewedProduct(1, 100);
        repo.addViewedProduct(2, 100);
        repo.addViewedProduct(2, 200);
    }
};

// Test 1: Valid GET Request (Logical Success)
TEST_F(GetCommandTest, ValidGetRequestReturns200AndRecommendations) {
    GetCommand cmd(repo, outputStream, 1, 100); 
    
    std::string response = cmd.execute();
    std::string expected_prefix = "200 Ok\n\n";
    
    EXPECT_EQ(response.substr(0, expected_prefix.length()), expected_prefix);
    EXPECT_EQ(response.back(), '\n');
}

// Test 2: User not found in repository (Logical Error - 404)
TEST_F(GetCommandTest, UserNotFoundReturns404) {
    GetCommand cmd(repo, outputStream, 999, 100); 
    
    std::string response = cmd.execute();
    
    EXPECT_EQ(response, "404 Not Found\n");
}

// Test 3: Invalid Syntax - Missing Arguments (Syntax Error - 400)
TEST_F(GetCommandTest, MissingArgumentsReturnsNullptrFor400) {
    ICommand* cmd1 = CommandParser::parse("GET 1", repo, dio); 
    EXPECT_EQ(cmd1, nullptr); 
    delete cmd1; 
    
    ICommand* cmd2 = CommandParser::parse("GET", repo, dio); 
    EXPECT_EQ(cmd2, nullptr);
    delete cmd2;
}

// Test 4: Invalid Syntax - Too Many Arguments (Syntax Error - 400)
TEST_F(GetCommandTest, TooManyArgumentsReturnsNullptrFor400) {
    ICommand* cmd = CommandParser::parse("GET 1 100 200", repo, dio); 
    
    EXPECT_EQ(cmd, nullptr);
    delete cmd;
}

// Test 5: Invalid Syntax - Strings instead of Integers (Syntax Error - 400)
TEST_F(GetCommandTest, InvalidTypesReturnsNullptrFor400) {
    ICommand* cmd = CommandParser::parse("GET userX prodY", repo, dio); 
    
    EXPECT_EQ(cmd, nullptr);
    delete cmd;
}

// Test 6: Case Insensitivity 
TEST_F(GetCommandTest, ValidGetRequestWithDifferentCases) {

    ICommand* cmd1 = CommandParser::parse("get 1 100", repo, dio); 
    ASSERT_NE(cmd1, nullptr);
    delete cmd1;


    ICommand* cmd2 = CommandParser::parse("GeT 1 100", repo, dio); 
    ASSERT_NE(cmd2, nullptr);
    delete cmd2;
}