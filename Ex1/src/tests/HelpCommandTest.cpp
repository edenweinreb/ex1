#include "gtest/gtest.h"
#include "FileRepository.h"
#include "../app.h"
#include "../Data/DefaultIO.h"
#include <string>

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

// Unit Test to verify that the help command prints the exact menu required
TEST(HelpCommandTest, PrintsCorrectOutput) {
    FileRepository repo("data/test.csv"); 
    StringIO dio("help");
    
    App app(&dio, repo);
    app.run();
    
    std::string expected = "DELETE, arguments: [userid] [productid1] [productid2] ...\n"
        "GET, arguments: [userid] [productid]\n"
        "PATCH, arguments: [userid] [productid1] [productid2] ...\n"
        "POST, arguments: [userid] [productid1] [productid2] ...\n"
        "HELP\n";
    EXPECT_EQ(dio.getOutput(), expected);
}