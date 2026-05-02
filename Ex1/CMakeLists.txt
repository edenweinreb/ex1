cmake_minimum_required(VERSION 3.14)
project(RecommendationEngine CXX)

# Define a modern C++ standard (C++17 is a solid standard)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# This part fetches Google Test automatically from GitHub!
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# A small fix to prevent compilation errors in Windows environments
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

# Enable the testing mechanism
enable_testing()

# === Here we define the executable for our tests ===
# We tell CMake to create a program called run_tests from the cpp file you created
add_executable(run_tests 
    src/tests/SimilarityTest.cpp 
    src/tests/CommandParserTest.cpp 
    src/CommandParser.cpp
    src/RecommendationEngine.cpp
)
# We link the gtest library to our test program
target_link_libraries(run_tests gtest_main)

# Automatic discovery of tests in the file so we can run them from VS Code
include(GoogleTest)
gtest_discover_tests(run_tests)

# (Later, when we create the main.cpp of the main program, we will add another add_executable command here for it)