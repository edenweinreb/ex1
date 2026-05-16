#include "FileRepository.h"
#include <fstream>
#include <sstream>
#include <filesystem>
#include <set>

FileRepository::FileRepository(const std::string& path) : filePath(path) {
    std::filesystem::path p(path);
    //check if there is directorry
    if (p.has_parent_path()) {
        std::filesystem::create_directories(p.parent_path());
    }

    //open the file if exist
    std::ofstream file(filePath, std::ios::app);
}

void FileRepository::addViewedProduct(int userId, int productId) {
    // Attempt to insert the product
    bool inserted = userData[userId].insert(productId).second;

    if (inserted) {
        //insert userId to productToUsers
        productToUsers[productId].insert(userId);

        // Open the file in append mode to log the new entry
        std::ofstream outFile(filePath, std::ios::app);
        if (outFile.is_open()) {
            outFile << userId << "," << productId << "\n";
        }
    }
}

std::set<int> FileRepository::getUserData(int userId) {
    // Look for the user in the in-memory map
    auto it = userData.find(userId);

    // If user exists, return their set of viewed products
    if (it != userData.end()) {
        return it->second;
    }
    return {}; // Return empty vector if user not found
}

std::set<int> FileRepository::getProductUsers(int productId) {
    // Look for the productId in the in-memory map
    auto it = productToUsers.find(productId);

    // If productId exists, return their set of user
    if (it != productToUsers.end()) {
        return it->second;
    }
    return {}; // Return empty vector if product not found
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
            userData[uId].insert({pId});
            productToUsers[pId].insert({uId});
        }

    }
}

    bool FileRepository::userExists(int userId) {
        return userData.find(userId) != userData.end();
}