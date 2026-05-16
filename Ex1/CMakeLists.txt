cmake_minimum_required(VERSION 3.14)
project(ex1 CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)
enable_testing()

# all source files except main
set(SOURCES
    src/CommandParser.cpp
    src/RecommendationEngine.cpp
    src/FileRepository.cpp
    src/AddCommand.cpp
    src/RecommendCommand.cpp
    src/Helpcommand.cpp
    src/ConsoleMenu.cpp
    src/app.cpp
)

# main app
add_executable(myapp src/Main.cpp ${SOURCES})
target_include_directories(myapp PRIVATE src/)

# tests
add_executable(run_tests 
    src/tests/SimilarityTest.cpp 
    src/tests/CommandParserTest.cpp
    src/tests/POSTCommandTest.cpp
    src/tests/PATCHCommandTest.cpp
    ${SOURCES}
)
target_include_directories(run_tests PRIVATE src/)
target_link_libraries(run_tests gtest_main)

include(GoogleTest)
gtest_discover_tests(run_tests)