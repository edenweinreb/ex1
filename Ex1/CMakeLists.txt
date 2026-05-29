cmake_minimum_required(VERSION 3.14)
project(ex1 CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Fetch and configure GoogleTest
include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)
enable_testing()

# Define project sources
set(SOURCES
    src/EX2-CPP/Commands/AddCommand.cpp
    src/EX2-CPP/Commands/DeleteCommand.cpp
    src/EX2-CPP/Commands/GetCommand.cpp
    src/EX2-CPP/Commands/HelpCommand.cpp
    src/EX2-CPP/Commands/PatchCommand.cpp
    src/EX2-CPP/Commands/PostCommand.cpp
    src/EX2-CPP/Commands/RecommendationEngine.cpp
    src/EX2-CPP/DAL/CommandParser.cpp
    src/EX2-CPP/DAL/ConsoleMenu.cpp
    src/EX2-CPP/Data/FileRepository.cpp
    src/EX2-CPP/Server-Client/SocketIO.cpp
    src/EX2-CPP/app.cpp
)

# Main executable target (Fixed Main.cpp path)
add_executable(myapp src/EX2-CPP/Main.cpp ${SOURCES})

target_include_directories(myapp PRIVATE 
    src/
    src/EX2-CPP/
    src/EX2-CPP/Commands/
    src/EX2-CPP/DAL/
    src/EX2-CPP/Data/
    src/EX2-CPP/Server-Client/
)

# Define test sources
set(TEST_SOURCES
    src/EX2-CPP/tests/SimilarityTest.cpp 
    src/EX2-CPP/tests/DeleteCommandTest.cpp
    src/EX2-CPP/tests/CommandParserTest.cpp
    src/EX2-CPP/tests/GetCommandTest.cpp
    src/EX2-CPP/tests/HelpCommandTest.cpp
    src/EX2-CPP/tests/PatchCommandTest.cpp
    src/EX2-CPP/tests/PostCommandTest.cpp
    src/EX2-CPP/tests/TablesTests.cpp
    src/EX2-CPP/tests/test_parser.cpp
    src/EX2-CPP/tests/test_repository.cpp
    src/EX2-CPP/tests/test_addCommand.cpp
)

# Tests executable target
add_executable(run_tests ${TEST_SOURCES} ${SOURCES})

target_include_directories(run_tests PRIVATE 
    src/
    src/EX2-CPP/
    src/EX2-CPP/tests/
    src/EX2-CPP/Commands/
    src/EX2-CPP/DAL/
    src/EX2-CPP/Data/
    src/EX2-CPP/Server-Client/
)

# Link GTest and enable automatic discovery
target_link_libraries(run_tests gtest_main)
include(GoogleTest)
gtest_discover_tests(run_tests)