#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <set>
#include "CommandParser.h"


bool CommandParser::parseRecommendCommand(const std::string& line, int& out_userid, int& out_productid)
{
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
                    // if it is just the command return true
                    out_userid = userid;
                    out_productid = productid;
                    return true; 
                }
           }
        }
        return false;
    }
    
