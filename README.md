# Ex4 - Advanced Programming: Full Stack Web Application

## Description
This project expands on the previous exercise by introducing a dynamic React frontend application inspired by Wolt. The system now consists of a RESTful web server built with Node.js and Express, an Ex2 TCP server for product view tracking, and a new React client that consumes the API and presents a complete user interface.

## New Features & Architecture (Exercise 4)
* **React Frontend:** A component-based React application utilizing `React Router` for seamless single-page navigation without page refreshes.
* **User Authentication:** Registration and login functionality using JWT (JSON Web Tokens). Protected routes ensure that only authenticated users can access certain views or perform specific actions.
* **Dynamic Data Fetching:** The frontend dynamically fetches and displays real data from the Ex3 Node.js server using asynchronous requests (`fetch`), without relying on hard-coded information.
* **Theme Toggle:** The application features a button in the top menu to toggle between Light mode and Dark mode seamlessly.
* **Form Validation:** Client-side and server-side validation are implemented for user inputs, ensuring proper data formatting (e.g., password complexity) and visual feedback before submission.

## Frontend Project Structure
The React application (`ex4-react`) is logically divided into modular components:
* **`components/auth/`**: Contains `Login`, `Register`, and `ProtectedRoute` components for session management and JWT verification.
* **`components/home/`**: Contains the main `Home` view displaying nearby and promoted restaurants.
* **`components/layout/`**: Contains the `Header` component.
* **`components/orders/`** & **`components/restaurants/`**: Handle the logic and views for browsing menus, executing orders, and viewing order history.

## API Endpoints

### Authentication
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/users | Create a new user |
| POST | /api/tokens | Generate a JWT for a registered user |

### Restaurants
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/restaurants | Get all restaurants |
| POST | /api/restaurants | Create a restaurant |
| GET | /api/restaurants/:id | Get a restaurant by id |
| PATCH | /api/restaurants/:id | Update a restaurant |
| DELETE | /api/restaurants/:id | Delete a restaurant |

### Products
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/restaurants/:id/products | Get all products |
| POST | /api/restaurants/:id/products | Create a product |
| GET | /api/restaurants/:id/products/:pId | Get a product by id |
| PATCH | /api/restaurants/:id/products/:pId | Update a product |
| DELETE | /api/restaurants/:id/products/:pId | Delete a product |

### Orders
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/orders | Get all orders of logged in user |
| POST | /api/orders | Create a new order |
| GET | /api/orders/:id | Get an order by id |
| PATCH | /api/orders/:id | Update an order |
| DELETE | /api/orders/:id | Delete an order |

## How to Run

### Prerequisites
- Docker
- Docker Compose

### Execution Command
The entire application stack—including the React frontend, Node.js server, and TCP server—is containerized. Open your terminal in the root directory of the project and run the following exact command to build and start all services:

```bash
# Build and start all containers
docker-compose up --build
```

### Accessing the Application
According to the project requirements, the Node.js web server directly serves the React application upon accessing its home page. 

Once the Docker containers are successfully running, open your web browser and navigate to the server's root address:

```text
http://localhost:3000
```
<img width="812" height="376" alt="image" src="https://github.com/user-attachments/assets/e6377e66-c119-44de-a5da-e73e47629226" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/604a4089-8a8f-4f0a-9066-b5cf67a2be34" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/2305191a-056e-434b-ae34-80e539a584c2" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/46e4fefb-5117-40c9-a940-0de75ee6d7f6" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/8ed64eb3-5c35-47a2-8c17-e955f38f4f89" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/875b3ddb-b67c-459b-878c-5ab840d52ae3" />




