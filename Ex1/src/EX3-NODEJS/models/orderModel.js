const crypto = require('crypto');

class Order {
  constructor({ userId, restaurantId, items, totalAmount, status = 'pending' }) {
    this.id = crypto.randomUUID();
    this.userId = userId;
    this.restaurantId = restaurantId; // Reference to the restaurant from which the order was placed
    this.items = items;               // Array of items/dishes
    this.totalAmount = totalAmount;   // Total payment amount
    this.status = status;             // Order status
    this.createdAt = new Date();
  }
}

module.exports = Order;