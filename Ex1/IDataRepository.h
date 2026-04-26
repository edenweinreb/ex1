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
};
