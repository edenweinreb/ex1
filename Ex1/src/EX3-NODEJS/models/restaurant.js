const crypto = require('crypto');

class Restaurant {
  constructor({ name, address, description, phone, cuisineType, lat, lng, rating }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.address = address;
    this.description = description;
    this.phone = phone;
    this.cuisineType = cuisineType;
    this.lat = lat;          
    this.lng = lng;          
    this.rating = rating || 0;
  }
}

module.exports = Restaurant;