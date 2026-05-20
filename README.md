# Ex2 - Advanced programing

Exercise 2 (Client-Server TCP)
This project extends the recommendation system from Exercise 1 into a client-server architecture over TCP.

Server (C++): Handles all business logic manages user data, processes commands, and returns HTTP-like responses.
Client (Python 3): Accepts commands from the user via the console, sends them to the server over a persistent TCP connection, and displays the server's response.

The client establishes a single TCP connection at startup and reuses it for all commands.
The server handles one client at a time.

POST is valid only if the user does not already exist.
PATCH is valid only if the user already exists.
DELETE is valid only if the user exists and has viewed the specified products.
Invalid command format returns 400 Bad Request.
Logical errors (e.g., user not found) return 404 Not Found.
Every command sent from client to server ends with \n.
Every response from server to client ends with \n.

help output example
DELETE, arguments: [userid] [productid1] [productid2] ...
GET, arguments: [userid] [productid]
PATCH, arguments: [userid] [productid1] [productid2] ...
POST, arguments: [userid] [productid1] [productid2] ...
help

How to Run
Prerequisites:
Docker installed

1. Build all containers:
docker compose build
2. Run the server (Terminal 1):
docker compose up server
3. Run the client (Terminal 2):
docker compose run client
4. Run the unit tests (Terminal 3):
docker compose run tests

Example Session
$ docker compose run client
POST 1 100 200 300
201 Created
GET 1 100
200 Ok

200 300
PATCH 1 400
204 No Content
DELETE 1 100
204 No Content
DELETE 1 999
404 Not Found
help
DELETE, arguments: [userid] [productid1] [productid2] ...
GET, arguments: [userid] [productid]
PATCH, arguments: [userid] [productid1] [productid2] ...
POST, arguments: [userid] [productid1] [productid2] ...
help

Open/Closed Principle Analysis
1. Did renaming commands (add to POST) require modifying closed code?
No.
The implementation idea from Exercise 1 that helped: we used the Command Pattern, where each command is an independent class implementing ICommand. The App::run() loop only knows about ICommand it never references specific command names. Renaming a command only required updating the CommandParser mapping, which is designed to be extended. The App class and all command classes remained completely untouched.

2. Did adding new commands (DELETE, PATCH) require modifying closed code?
No.
Same reason as above the Command Pattern kept the core logic closed. Adding a new command only required creating a new class implementing ICommand and registering it in CommandParser. No existing class needed to change.

3. Did changing command output formats require modifying closed code?
Yes and we fixed it.
In Exercise 1, ICommand::execute() returned void and printed directly to std::cout, tightly coupling the command logic to a specific output medium. 
Fix: We refactored execute() to return std::string. Commands now only produce a result string, they are completely agnostic to where or how it is displayed. Future output format changes will not require touching the command classes at all.

4. Did moving I/O from console to TCP sockets require modifying closed code?
Yes and we fixed it.
In Exercise 1, App depended directly on IMenu for input and std::ostream for output. Switching to TCP sockets required modifying the App class internals.
Fix: We introduced the DefaultIO interface that abstracts both reading and writing. App now depends only on this interface via Dependency Injection. A SocketIO class implements DefaultIO for TCP, and a ConsoleIO or MockIO can be added for other needs without changing App at all.

5.Did our implementation prepare us for handling multiple concurrent clients? Is the code closed for modification but open for extension in this regard? 
Yes, our architecture heavily minimizes the need for modification if concurrent client support is required in the future. Because we separated the network connection layer from the business logic, the Command classes, the CommandParser, and the core recommendation algorithms remain completely agnostic to how many clients are connected. To support multiple clients, we would only need to extend the server's listening loop to dispatch each incoming DefaultIO socket to a separate thread (e.g., using std::thread).However, concurrency introduces the risk of race conditions on the shared state (the user and product data). Because we designed the system using interfaces and Dependency Injection, our code is open for extension to handle this: instead of modifying the existing database class, we can create a new "Thread-Safe Database" decorator class. This new class would implement the same data interface, wrap the existing logic, and introduce the necessary synchronization primitives (like mutexes or read-write locks) to protect critical sections. We can then inject this thread-safe version into the application, leaving the original logic entirely closed to modification.

<img width="392" height="232" alt="pass tests" src="https://github.com/user-attachments/assets/5f108645-5bb4-4f15-88e3-a3242f154e19" />

<img width="833" height="489" alt="Client-Server" src="https://github.com/user-attachments/assets/1a66b83c-8e89-4117-9c47-b6d8872cb491" />

