# Client Operations & Features

This section covers the core functionality of the application from both the customer and the restaurant owner perspectives.

## Customer Flow: Browsing & Ordering

### 1. Home Screen
The main dashboard allows users to browse food categories and view recommended restaurants.

![Home Screen](images/home-screen.PNG)

### 2. Viewing a Restaurant Menu
Selecting a restaurant displays its details and menu items. Users can add specific dishes to their cart.

![Restaurant Menu](images/restaurant-menu.PNG)

### 3. Cart Management
Users can access their cart at any time.
If no items have been added:

![Empty Cart](images/empty-cart.PNG)

Once items are added, the cart calculates the total price and allows the user to proceed to checkout:

![Cart with Items](images/cart-with-items.PNG)

### 4. Order Confirmation
After successful checkout, an order receipt is generated with a unique Order ID and confirmation status.

![Order Confirmed](images/order-confirmed.PNG)

### 5. Order History & Tracking
Users can navigate to the Orders tab to view their past and current orders. This screen displays the order status, total price, and allows users to rate the restaurant.

![Order History](images/order-history.png)

By clicking on a specific order, users can access the Order Details screen, which provides a breakdown of the specific items ordered, the exact timestamp, and the final price.

![Order Details](images/order-details.png)

order history by different client:

![Order History](images/order-history2.png)

 ### 6. Role-Based Access (Customer Menu)
The application enforces strict role-based access. Regular customers have a restricted navigation menu containing only standard features (Home, Cart, and Authentication). They do not have the ability to view the management dashboard, add, or edit any restaurant details. 

![Customer Menu](images/customer-menu.png)
---

## Owner Flow: Restaurant Management (CRUD)

Users with the **Owner** role have access to an administrative dashboard to manage their businesses.

### 1. The Manager Dashboard
Owners can view all their properties and manage them from a centralized list.

![Manage Restaurants](images/manage-restaurants.PNG)

### 2. Adding a New Restaurant
Owners can dynamically add a new restaurant to the platform by providing details such as name, cuisine type, address, and coordinates.

![Add New Restaurant](images/add-restaurant.png)

Once successfully created, the new restaurant immediately appears in the management list.

![Updated Restaurant List](images/restaurant-list-updated.jpeg)

### 3. Editing an Existing Restaurant
By clicking "Edit" on any restaurant, owners can update its properties, change its description, or proceed to manage its specific menu items.

![Edit Restaurant](images/edit-restaurant.png)

 For example, modifying the restaurant's name:

![Editing Restaurant Name](images/edit-name-typing.png)

Upon saving, a success confirmation is displayed:

![Edit Success](images/edit-success-popup.png)

The changes are immediately reflected across all client views. The manager's dashboard updates instantly:

![Manager List Updated](images/manager-list-updated.png)

Customers will also dynamically see the updated details on the home screen and inside the restaurant's menu:

![Home Screen Updated](images/home-screen-updated.png)

![Restaurant Menu Updated](images/restaurant-menu-updated.png)