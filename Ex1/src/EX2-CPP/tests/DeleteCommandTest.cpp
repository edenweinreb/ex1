#include <gtest/gtest.h>
#include "FileRepository.h"
#include "IDataRepository.h"
#include "CommandParser.h"
#include "DeleteCommand.h"
#include "../Data/DefaultIO.h" 
#include <set>

class MockIO : public DefaultIO {
public:
    std::string read() override { return ""; }
    void write(const std::string& text) override {}
};

// Test DELETE returns 204 No Content when user and product exist
TEST(DeleteCommandTest, DeleteExistingProductReturns204) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    // First POST the user
    auto post = parser.parse("POST 1 1 2 3", repo, dio);
    if (post) { post->execute(); delete post; }

    // Then DELETE
    auto cmd = parser.parse("DELETE 1 1", repo, dio);
    ASSERT_NE(cmd, nullptr);
    cmd->execute();
    EXPECT_EQ(static_cast<DeleteCommand*>(cmd)->getResult(), "204 No Content");
    delete cmd;
}

// Test DELETE returns 404 when user does not exist
TEST(DeleteCommandTest, DeleteNonExistingUserReturns404) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    auto cmd = parser.parse("DELETE 99 1", repo, dio);
    ASSERT_NE(cmd, nullptr);
    cmd->execute();
    EXPECT_EQ(static_cast<DeleteCommand*>(cmd)->getResult(), "404 Not Found");
    delete cmd;
}

// Test DELETE returns 404 when product was not viewed by user
TEST(DeleteCommandTest, DeleteNonExistingProductReturns404) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    auto post = parser.parse("POST 1 1 2 3", repo, dio);
    if (post) { post->execute(); delete post; }

    auto cmd = parser.parse("DELETE 1 99", repo, dio);
    ASSERT_NE(cmd, nullptr);
    cmd->execute();
    EXPECT_EQ(static_cast<DeleteCommand*>(cmd)->getResult(), "404 Not Found");
    delete cmd;
}

// Test DELETE removes multiple products at once
TEST(DeleteCommandTest, DeleteMultipleProducts) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    auto post = parser.parse("POST 1 1 2 3", repo, dio);
    if (post) { post->execute(); delete post; }

    auto cmd = parser.parse("DELETE 1 1 2", repo, dio);
    ASSERT_NE(cmd, nullptr);
    cmd->execute();
    EXPECT_EQ(static_cast<DeleteCommand*>(cmd)->getResult(), "204 No Content");
    delete cmd;
}

// Test DELETE returns 400 for invalid format
TEST(DeleteCommandTest, InvalidFormatReturns400) {
    FileRepository repo("test_data.csv");
    CommandParser parser;
    MockIO dio;

    EXPECT_EQ(parser.parse("DELETE", repo, dio), nullptr);
}