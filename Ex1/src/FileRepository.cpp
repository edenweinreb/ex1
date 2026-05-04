#include "FileRepository.h"
#include <fstream>
#include <sstream>
#include <filesystem>

FileRepository::FileRepository(const std::string& path) : filePath(path) {
    std::filesystem::path p(path);
    //check if there is directorry
    if (p.has_parent_path()) {
        std::filesystem::create_directories(p.parent_path());
    }

    //open the file if exist
    std::ofstream file(filePath, std::ios::app);
}

void FileRepository::addViewedProduct(int userId, const Product& product) {
    //Checking that there are no duplicates of the same productId
    if (userData.find(userId) != userData.end()) {
        for (const auto& existingProduct : userData[userId].viewedProducts) {
            if (existingProduct.productId == product.productId) {
                return; 
            }
        }
    }

    //Update the in-memory map for fast access during runtime
    userData[userId].userId = userId;
    userData[userId].viewedProducts.push_back(product);

    // Immediate save to file (Output File Stream in Append mode)
    std::ofstream outFile(filePath, std::ios::app);
    if (outFile.is_open()) {
        outFile << userId << "," << product.productId << "\n";
        outFile.close();
    }
}

std::vector<Product> FileRepository::getUserData(int userId) {
    // Retrieve data from memory (Map)
    if (userData.find(userId) != userData.end()) {
        return userData[userId].viewedProducts;
    }
    return {}; // Return empty vector if user not found
}

void FileRepository::loadAll() {
    // Open the file for reading
    std::ifstream inFile(filePath);
    if (!inFile.is_open()) return;

    std::string line;
    // Read the file line by line
    while (std::getline(inFile, line)) {
        std::stringstream ss(line);
        std::string uId_str, pId_str;

        // Parse CSV format: userId,productId,productName
        if (std::getline(ss, uId_str, ',') && 
            std::getline(ss, pId_str, ',') ) {
            
            int uId = std::stoi(uId_str);
            int pId = std::stoi(pId_str);
            
            // Store the data in the in-memory map
            userData[uId].userId = uId;
            userData[uId].viewedProducts.push_back({pId});
        }

    }
    inFile.close();
}