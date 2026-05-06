#ifndef FILE_REPOSITORY_H
#define FILE_REPOSITORY_H

#include "IDataRepository.h"
#include <string>
#include <vector>
#include <map>

class FileRepository : public IDataRepository {
private:
    std::string filePath;
    std::map<int, std::set<int>> userData;
    std::map<int, std::set<int>> productToUsers;

public:
    FileRepository(const std::string& path);

    void addViewedProduct(int userId, int productId) override;
    std::set<int> getUserData(int userId) override;
    std::set<int> getProductUsers(int productId) override;
    void loadAll() override;

    virtual ~FileRepository() {}
};

#endif