cmake_minimum_required(VERSION 3.14)
project(ex1 CXX)

# Set C++ standard to 17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# --- Fetch GoogleTest ---
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows compatibility
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)
enable_testing()

# --- Define Source Files based on new folder structure ---
set(SOURCES
    # Command Pattern implementations
    src/Commands/AddCommand.cpp
    src/Commands/DeleteCommand.cpp
    src/Commands/GetCommand.cpp
    src/Commands/HelpCommand.cpp
    src/Commands/PatchCommand.cpp
    src/Commands/PostCommand.cpp
    src/Commands/RecommendationEngine.cpp
    
    # Data Access Layer & UI Logic
    src/DAL/CommandParser.cpp
    src/DAL/ConsoleMenu.cpp
    
    # Data Repositories
    src/Data/FileRepository.cpp
    
    # Networking / Communication
    src/Server-Client/SocketIO.cpp
    
    # Main Application Logic
    src/app.cpp
)

# --- Main Application Target ---
add_executable(myapp src/Main.cpp ${SOURCES})

# Include directories to allow cleaner #include statements
target_include_directories(myapp PRIVATE 
    src/
    src/Commands/
    src/DAL/
    src/Data/
    src/Server-Client/
)

# --- Test Target (Google Test) ---
set(TEST_SOURCES
    src/tests/SimilarityTest.cpp 
    src/tests/DeleteCommandTest.cpp
    src/tests/CommandParserTest.cpp
    src/tests/GetCommandTest.cpp
    src/tests/HelpCommandTest.cpp
    src/tests/PatchCommandTest.cpp
    src/tests/PostCommandTest.cpp
    src/tests/TablesTests.cpp
    src/tests/test_parser.cpp
    src/tests/test_repository.cpp
    src/tests/test_addCommand.cpp
)
add_executable(run_tests ${TEST_SOURCES} ${SOURCES})

# Include directories for tests
target_include_directories(run_tests PRIVATE 
    src/
    src/Commands/
    src/DAL/
    src/Data/
    src/Server-Client/
    src/tests/
)

# Link GTest libraries
target_link_libraries(run_tests gtest_main)

# Automatic test discovery
include(GoogleTest)
gtest_discover_tests(run_tests)