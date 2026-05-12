#include <gtest/gtest.h>
#include "FileRepository.h"
#include "IDataRepository.h"
#include <fstream>
#include <vector>

TEST(FileRepositoryTest, SavesAndLoadsDataCorrectly) {
    int userId = 1;
    Product p = {76, "Coffee"};
    std::string testFile = "data/test_data.txt";

    {
        FileRepository repo(testFile);
        repo.addViewedProduct(userId, p);
    }

    FileRepository newRepo(testFile);
    newRepo.loadAll();

    auto history = newRepo.getUserData(userId); 
    
    ASSERT_EQ(history.size(), 1);
    EXPECT_EQ(history[0].productId, 76);
    EXPECT_EQ(history[0].name, "Coffee");
}
