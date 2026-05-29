const crypto = require('crypto');

class Restaurant {
  constructor({ name, address, description, phone, cuisineType }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.address = address;
    this.description = description;
    this.phone = phone;
    this.cuisineType = cuisineType;
  }
}

module.exports = Restaurant;