# Full Stack Web & Mobile Application (Wolt Clone) - Ex4 & Ex5

## Description
This project is a comprehensive full-stack application inspired by Wolt. It consists of a RESTful backend server built with Node.js and Express, a TCP server for product view tracking, a React web frontend, and a newly integrated React Native mobile application. The backend has been upgraded to persistently store all data in a MongoDB database rather than in-memory arrays.

The entire development lifecycle was managed using Agile methodologies via JIRA and strict GitHub collaborative workflows.

---

## New Features & Architecture (Exercise 5)

* **React Native Mobile App:** A dedicated mobile application built with React Native. The visual design is inspired by the real Wolt mobile experience.
* **Functionality Parity:** The mobile client replicates the core functionality and all screens of the Ex4 web client.
* **MongoDB & Mongoose Integration:** The Node.js server has been refactored to transition from in-memory arrays to persistent data storage using MongoDB and Mongoose.
* **Input Form Validation:** Comprehensive validation on the Login and Registration screens. All fields are mandatory, and specific logic is enforced (e.g., password complexity of at least 8 characters combining letters and numbers) with clear visual feedback.
* **Media & Image Handling:** Support for profile image attachment during registration, allowing users to select an existing image from their device's phone or camera.
* **Agile Management (JIRA):** Application features and tasks were organized hierarchically into Epics, User Stories, and Tasks. The development process involved Sprint planning, assigning a Scrum Master, and tracking issues dynamically using state transitions (in progress, code review, done) and dependency mapping (is blocked by).
* **Strict Git Workflow:** Development was done exclusively via feature branches merged into the main branch through Pull Requests. Every PR required mandatory code reviews and approvals from all other team members before merging.

---

## Existing Features & Component Structure (Exercise 4)

* **React Web Frontend:** A component-based React application utilizing `React Router` for dynamic navigation without full-page reloads.
* **User Authentication:** Registration and login functionality using JSON Web Tokens (JWT). Protected frontend routes prevent unauthenticated access to certain views.
* **Dynamic Data Fetching:** Asynchronous architecture leveraging the `fetch` API to query dynamic real-time data from the Node.js server.
* **Theme Toggle:** Built-in Light/Dark mode switcher available within the top menu.

---

## API Endpoints Reference

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

---

## How to Run the Project

### Prerequisites
- Docker & Docker Compose
- Node.js & npm
- Expo Go application installed on your mobile device.

### Step 1: Environment Configuration (`.env`)
To enable the React Native application to communicate with your locally running backend server, you must provide your local machine's IP address.
1. Navigate to the React Native project root (`ex5-react-native`).
2. Create a file named `.env`.
3. Add your local IP address configuration (replace `<YOUR_LOCAL_IP>` with your actual machine IP):
   ```env
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:3000

   ### Step 2: Spinning up the Backend Services (Docker)
The backend services are containerized. Open your terminal in the root directory of the project and execute the following command:

```bash
# Build and start all containers
docker-compose up --build
### Step 3: Running the React Native App (Two Terminals)
To launch the Expo development packager for the mobile client, open two separate terminal windows.

#### Terminal 1: Build & Dependencies
In the first terminal, ensure all required npm packages are installed:
```bash
# Install dependencies
npm install
npx expo install @react-native-async-storage/async-storage

#### Terminal 2: Project Startup & Code Scan
In the second terminal, navigate directly into the Exercise 5 folder and start the environment:
```bash
# Navigate to the react-native directory
cd ex5-react-native

# Start the Expo server and generate QR code
npm start

## Project Documentation & Artifacts
A dedicated `wiki` folder is included in the root of the repository, containing thorough explanations, usage workflows, and step-by-step verification screenshots demonstrating:
* The compilation and running of the entire environment using Docker Compose.
* The login and registration processes with input validations.
* The creation, editing, and deletion of restaurants, products, and orders across the clients.
