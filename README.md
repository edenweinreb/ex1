# Ex1 - Advanced programing

Product Recommendation System
A CLI-based product recommendation system written in C++. The system recommends products to users based on similarity with other users' viewing history.

Project Structure:
project-root/
├── Dockerfile
├── CMakeLists.txt
├── README.md
├── src/
│   ├── main.cpp
│   ├── App.h / App.cpp
│   ├── ICommand.h
│   ├── IMenu.h
│   ├── ConsoleMenu.h / ConsoleMenu.cpp
│   ├── CommandParser.h / CommandParser.cpp
│   ├── HelpCommand.h / HelpCommand.cpp
│   ├── AddCommand.h / AddCommand.cpp
│   ├── RecommendCommand.h / RecommendCommand.cpp
│   ├── RecommendationEngine.h / RecommendationEngine.cpp
│   └── IDataRepository.h
└── data/
    └── users.txt


How It Works:
When a user asks for recommendations for a product, the system:
Calculates similarity between the user and all other users (number of common products)
Filters only users who watched the target product
Sums similarity scores for each product those users watched
Returns up to 10 products sorted by relevance (descending), ties broken by product ID (ascending)

Commands:
add [userid] [productid1] [productid2]
recommend [userid] [productid]
help

add:
Associates a list of products with a user. Data is automatically saved to disk.
recommend:
Returns up to 10 product recommendations for a user based on a target product.
help:
Prints the list of available commands.

Invalid or unknown commands are silently ignored.
How to Run
Using Docker (Main App)
bashdocker build --target app -t ex1 .
docker run -it ex1
Using Docker (Unit Tests)
bashdocker build --target tests -t ex1-tests .
docker run ex1-tests
Persist Data Between Runs
bashdocker run -it -v $(pwd)/data:/usr/src/myapp/data ex1

Example Run:
add 1 100 101 102 103
add 2 101 102 104 105 106
add 3 100 104 105 107 108
recommend 1 104
105 106 107 108
help
add [userid] [productid1] [productid2] …
recommend [userid] [productid]
help


