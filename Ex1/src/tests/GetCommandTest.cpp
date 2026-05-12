#include <gtest/gtest.h>
#include <string>
#include <sstream>
#include "CommandParser.h"
#include "RecommendCommand.h"
#include "ICommand.h"
#include "IDataRepository.h" // The class that implements IDataRepository

class GetCommandTest : public ::testing::Test {
protected:
    IDataRepository repo; 
    
    // We use ostringstream to capture the output exactly like the TCP server will
    std::ostringstream outputStream;

    
    void SetUp() override {
        // *** TODO: Setup a valid user in the repo for testing
        // e.g., repo.addUser(1); 
        // repo.addView(1, 100);
        // repo.addView(2, 100);
    }
};

// Test 1: Valid GET Request (Logical Success)
TEST_F(GetCommandTest, ValidGetRequestReturns200AndRecommendations) {
    // Action - Create the command directly with a valid user ID (e.g., 1) and product ID (e.g., 100)
    // *** TODO: Use IDs that you actually added in the SetUp() function
    RecommendCommand cmd(repo, outputStream, 1, 100);
    cmd.execute();
    
    // Capture the output that the command wrote to the stream
    std::string response = outputStream.str();
    std::string expected_prefix = "200 Ok\n\n";
    
    // Assertions
    EXPECT_EQ(response.substr(0, expected_prefix.length()), expected_prefix);
    EXPECT_EQ(response.back(), '\n');
}

// Test 2: User not found in repository (Logical Error - 404)
TEST_F(GetCommandTest, UserNotFoundReturns404) {
    // Action - Create the command with a user ID that DOES NOT exist (e.g., 999)
    RecommendCommand cmd(repo, outputStream, 999, 100);
    cmd.execute();
    
    std::string response = outputStream.str();
    
    // Assertion - Must return exactly 404 Not Found
    EXPECT_EQ(response, "404 Not Found\n");
}

// Test 3: Invalid Syntax - Missing Arguments (Syntax Error - 400)
TEST_F(GetCommandTest, MissingArgumentsReturnsNullptrFor400) {
    CommandParser parser;
    
    // Action 1 - Missing product ID
    ICommand* cmd1 = parser.parse("GET 1", repo);
    EXPECT_EQ(cmd1, nullptr); // The server should translate this nullptr to "400 Bad Request"
    delete cmd1; // Just in case it fails and returns an object
    
    // Action 2 - Missing both IDs
    ICommand* cmd2 = parser.parse("GET", repo);
    EXPECT_EQ(cmd2, nullptr);
    delete cmd2;
}

// Test 4: Invalid Syntax - Too Many Arguments (Syntax Error - 400)
TEST_F(GetCommandTest, TooManyArgumentsReturnsNullptrFor400) {
    CommandParser parser;
    
    // Action - Extra parameters at the end
    ICommand* cmd = parser.parse("GET 1 100 200", repo);
    
    // Assertion
    EXPECT_EQ(cmd, nullptr);
    delete cmd;
}

// Test 5: Invalid Syntax - Strings instead of Integers (Syntax Error - 400)
TEST_F(GetCommandTest, InvalidTypesReturnsNullptrFor400) {
    CommandParser parser;
    
    // Action - Passing strings where ints are expected
    ICommand* cmd = parser.parse("GET userX prodY", repo);
    
    // Assertion
    EXPECT_EQ(cmd, nullptr);
    delete cmd;
}