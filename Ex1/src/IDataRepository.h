#ifndef IDATA_REPOSITORY_H
#define IDATA_REPOSITORY_H
#include <string>
#include <vector>

struct Product {
    int productId;
    std::string name;
};

struct User {
    int userId;
    std::vector<Product> viewedProducts;
};


class IDataRepository {
    public:
        virtual ~IDataRepository() {}

        //Adds a product to a specific user's viewed history.
        virtual void addViewedProduct(int userId, const Product& product) = 0;

        //Retrieves all data associated with a specific user.
        virtual void getUserData(int userId) = 0;

        //on startup, the system loads all existing data from the files into memory.
        virtual void loadAll() = 0;
};

#endif
