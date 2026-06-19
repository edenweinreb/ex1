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
<img width="1265" height="586" alt="image" src="https://github.com/user-attachments/assets/2e5c6572-17d6-4976-923e-d4546bec6817" />
<img width="1262" height="592" alt="image" src="https://github.com/user-attachments/assets/9243a238-9398-4521-9f7a-0306920f96ed" />
<img width="1264" height="521" alt="image" src="https://github.com/user-attachments/assets/c75d6030-8030-43e7-8654-593b7e330e3c" />
<img width="1256" height="582" alt="image" src="https://github.com/user-attachments/assets/aa26824e-0af7-4d54-944a-8b8ea6ca5982" />
<img width="1271" height="580" alt="image" src="https://github.com/user-attachments/assets/08270120-cf9f-47b3-bfee-81126ce90397" />
<img width="1264" height="581" alt="image" src="https://github.com/user-attachments/assets/27046a38-a545-423d-bd1d-816e31c57191" />
<img width="1274" height="562" alt="image" src="https://github.com/user-attachments/assets/9ebb77ef-1749-4ea0-9498-047ed11dca57" />
<img width="1268" height="554" alt="image" src="https://github.com/user-attachments/assets/efc7a083-f563-46a2-815b-bcf324e39ec0" />
<img width="1262" height="521" alt="image" src="https://github.com/user-attachments/assets/a8f2cb43-7434-4437-be4a-96ae260cedc3" />
<img width="1270" height="589" alt="image" src="https://github.com/user-attachments/assets/6fab8ca4-b478-46b8-88f3-67b4f256e94d" />

<img width="812" height="376" alt="image" src="https://github.com/user-attachments/assets/e6377e66-c119-44de-a5da-e73e47629226" />
<img width="814" height="383" alt="image" src="https://github.com/user-attachments/assets/8e6d42b8-e571-4229-8749-42c4cbf7146d" />
<img width="815" height="386" alt="image" src="https://github.com/user-attachments/assets/b711f3ad-45ed-4a20-96a4-89172cab803b" />
<img width="817" height="390" alt="image" src="https://github.com/user-attachments/assets/3d7ff925-cc0f-4f63-9de1-7a4709508218" />
<img width="1256" height="539" alt="image" src="https://github.com/user-attachments/assets/a611fe50-287a-4f4b-92f0-e54e6eea7045" />




