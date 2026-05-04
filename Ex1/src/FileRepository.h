#ifndef FILE_REPOSITORY_H
#define FILE_REPOSITORY_H

#include "IDataRepository.h"
#include <string>
#include <vector>
#include <map>

class FileRepository : public IDataRepository {
private:
    std::string filePath;
    std::map<int, User> userData;

public:
    FileRepository(const std::string& path);

    void addViewedProduct(int userId, const Product& product) override;
    std::vector<Product> getUserData(int userId) override;
    void loadAll() override;

    virtual ~FileRepository() {}
};

#endif