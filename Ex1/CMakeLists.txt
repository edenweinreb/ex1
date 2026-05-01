cmake_minimum_required(VERSION 3.10)
project(ex1 CXX)
set(CMAKE_CXX_STANDARD 17)

file(GLOB SOURCES "src/*.cpp")
add_executable(myapp ${SOURCES})

#For the tests
find_package(GTest REQUIRED)
file(GLOB TEST_SOURCES "src/*.cpp")
list(FILTER TEST_SOURCES EXCLUDE REGEX "main.cpp")
add_executable(run_tests ${TEST_SOURCES})
target_link_libraries(run_tests GTest::GTest GTest::Main)
