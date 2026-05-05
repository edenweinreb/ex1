using namespace std;
#include "gtest/gtest.h"
#include "App.h"

TEST(HelpCommandTest, PrintsCorrectOutput) {
    istringstream input("help");
    ostringstream output;
    App app(input, output);
    app.run();
    
    string expected = "add [userid] [productid1] [productid2]\n"
                           "recommend [userid] [productid]\n"
                           "help\n";
    EXPECT_EQ(output.str(), expected);
}

