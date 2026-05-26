#pragma once
#include <string>

class DefaultIO {
public:
    virtual std::string read() = 0;
    virtual void write(const std::string& text) = 0;
    virtual ~DefaultIO() = default;
};