#ifndef IDATA_REPOSITORY_H
#define IDATA_REPOSITORY_H
#include <string>
#include <vector>
#include <set>

class IDataRepository {
    public:
        virtual ~IDataRepository() {}

        //Adds a product to a specific user's viewed history.
        virtual void addViewedProduct(int userId, int product) = 0;

        //Retrieves all data associated with a specific user.
        virtual std::set<int> getUserData(int userId) = 0;

        //Retrieves all data associated with a specific product.
        virtual std::set<int> getProductUsers(int productId) = 0;

        // Removes a specific product from a user's viewed history
        virtual void removeViewedProduct(int userId, int productId) = 0;

        // Checks if a user exists in the repository
        virtual bool userExists(int userId) = 0;

        // On startup, the system loads all existing data from the files into memory.
        virtual void loadAll() = 0;
};

#endif
