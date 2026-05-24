const crypto = require('crypto');

class Product {
  constructor({ name, description, price, restaurantId }, numericId) {
    // UUID for Ex3 REST API
    this.id = crypto.randomUUID();

    // Integer ID for Ex2 TCP server
    this.numericId = numericId;

    this.restaurantId = restaurantId;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

module.exports = Product;