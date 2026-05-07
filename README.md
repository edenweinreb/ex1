# Ex1 - Advanced programing

Product Recommendation System
A CLI-based product recommendation system written in C++. The system recommends products to users based on similarity with other users' viewing history.

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
docker run -it -v "${PWD}/data:/usr/src/myapp/data" ex1

Example Run:
add 1 100 101 102 103
add 2 101 102 104 105 106
add 3 100 104 105 107 108
add 4 101 105 106 107 109 110
add 5 100 102 103 105 108 111
add 6 100 103 104 110 111 112 113
add 7 102 105 106 107 108 109 110
add 8 101 104 105 106 109 111 114
add 9 100 103 105 107 112 113 115
add 10 100 102 105 106 107 109 110 116
recommend 1 104
105 106 111 110 112 113 107 108 109 114
help
add [userid] [productid1] [productid2] …
recommend [userid] [productid]
help


