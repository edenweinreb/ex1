#ifndef FILE_REPOSITORY_H
#define FILE_REPOSITORY_H

#include "IDataRepository.h"
#include <string>
#include <vector>
#include <map>

class FileRepository : public IDataRepository {
private:
    std::string filePath;
    // Maps User ID: Set of Product IDs they viewed
    std::map<int, std::set<int>> userData;
    // Maps Product ID: Set of User IDs who viewed it (Inverse index)
    std::map<int, std::set<int>> productToUsers;

public:
    // Constructor taking the path to the CSV/data file
    FileRepository(const std::string& path);

    // Adds a record to the memory maps
    void addViewedProduct(int userId, int productId) override;
    // Returns all products a specific user has seen
    std::set<int> getUserData(int userId) override;
    // Returns all users who watched a specific product
    std::set<int> getProductUsers(int productId) override;
    // Reads all data from the file into memory
    void loadAll() override;
    // Check if user exists
    bool userExists(int userId);

    virtual ~FileRepository() {}
};

#endif