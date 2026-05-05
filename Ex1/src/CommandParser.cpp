#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <set>
#include "CommandParser.h"


Command CommandParser::parseRecommendCommand(const std::string& line)
{
    Command resultCmd;
    resultCmd.type = CommandType::INVALID;

    std::istringstream iss(line);
    std::string command;
    //read the first word
        iss >> command;

        if (command == "recommend") {
            int userid, productid;
            //make sure that there are just 2 int
            if (iss >> userid >> productid)
             {
                
            //making sure there is no extra trash after the 2 int
            std::string extra;
                if (!(iss >> extra)) 
                {
                    //parsing succed then update the value of the var
                    resultCmd.type = CommandType::RECOMMEND;

                    // update the command struct values
                    resultCmd.userId = std::to_string(userid);
                    resultCmd.productIds.push_back(std::to_string(productid));
                }
           }
        }
       return resultCmd;
    }
    
