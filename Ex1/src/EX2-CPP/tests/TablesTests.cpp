#include <gtest/gtest.h>
#include <sstream>
#include "../app.h"
#include "FileRepository.h"
#include "../Data/DefaultIO.h"

class StringIO : public DefaultIO {
private:
    std::string input_data;
    std::string output_data;
    bool read_done = false;

public:
    StringIO(const std::string& input) : input_data(input) {}

    std::string read() override {
        if (read_done) return "";
        read_done = true;
        return input_data;
    }

    void write(const std::string& text) override {
        output_data += text;
    }

    std::string getOutput() const {
        return output_data;
    }
};

std::string getAppendixInput() {
    return "POST 1 100 101 102 103\n"
           "POST 2 101 102 104 105 106\n"
           "POST 3 100 104 105 107 108\n"
           "POST 4 101 105 106 107 109 110\n"
           "POST 5 100 102 103 105 108 111\n"
           "POST 6 100 103 104 110 111 112 113\n"
           "POST 7 102 105 106 107 108 109 110\n"
           "POST 8 101 104 105 106 109 111 114\n"
           "POST 9 100 103 105 107 112 113 115\n"
           "POST 10 100 102 105 106 107 109 110 116\n";
}

TEST(TablesTest, SimilarityScoresTable1) {
    FileRepository repo("data/test.csv");
    StringIO dio(getAppendixInput() + "GET 1 104");
    
    App app(&dio, repo);
    app.run();

    std::string expected = "200 Ok\n\n105 106 111 110 112 113 107 108 109 114\n\n";
    EXPECT_EQ(dio.getOutput(), expected);
}

TEST(TablesTest, ProductWeightsTable2) {
    FileRepository repo("data/test.csv");
    StringIO dio(getAppendixInput() + "GET 1 104");
    
    App app(&dio, repo);
    app.run();

    std::string result = dio.getOutput();
    EXPECT_NE(result.find("105"), std::string::npos);
    EXPECT_NE(result.find("106"), std::string::npos);
    EXPECT_NE(result.find("111"), std::string::npos);
}

TEST(TablesTest, FinalSortedOutputTable3) {
    FileRepository repo("data/test.csv");
    StringIO dio(getAppendixInput() + "GET 1 104");
    
    App app(&dio, repo);
    app.run();

    std::string expected = "200 Ok\n\n105 106 111 110 112 113 107 108 109 114\n\n";
    EXPECT_EQ(dio.getOutput(), expected);
}