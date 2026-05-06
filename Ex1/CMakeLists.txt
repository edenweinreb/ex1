# Define the minimum CMake version required to process this file 
cmake_minimum_required(VERSION 3.14)

# Define the project name and the language used (CXX stands for C++)
project(ex1 CXX)

# Require the modern C++17 standard
set(CMAKE_CXX_STANDARD 17)

# Strictly enforce the standard (compilation will fail if not supported)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include CMake's built-in module for downloading packages from the internet
include(FetchContent)

# Define download details for the Google Test library from its official repository
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)

# Specific setting to prevent compilation errors in Windows environments
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

# Execute the actual download and preparation of the library for project use
FetchContent_MakeAvailable(googletest)

# Enable the testing mechanism for our project
enable_testing()

# Define the main executable and the source files it depends on
add_executable(myapp 
    src/Main.cpp 
    src/CommandParser.cpp 
    src/RecommendationEngine.cpp
)

# Define a separate executable for the tests and its source files
add_executable(run_tests 
    src/tests/SimilarityTest.cpp 
    src/tests/CommandParserTest.cpp 
    src/CommandParser.cpp
    src/RecommendationEngine.cpp
)

# Link the downloaded testing library to our test executable
target_link_libraries(run_tests gtest_main)

# Include the module that allows CMake to detect tests in the workspace
include(GoogleTest)

# Scan the test executable to discover all tests so they appear in VS Code's UI
gtest_discover_tests(run_tests)