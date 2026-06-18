const initialRestaurants = [
  { 
    id: "r1", 
    name: "Napoli Pizza", 
    address: "10 Main St", 
    description: "Authentic Neapolitan pizza", 
    phone: "050-1111111", 
    cuisineType: "pizza", 
    lat: 32.08, 
    lng: 34.88, 
    ratings: [], 
    averageRating: 9.0,
    menu: [
      { id: "m1", name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella, and basil", price: 45, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
      { id: "m2", name: "Pepperoni Pizza", description: "Spicy pepperoni, mozzarella, and tomato sauce", price: 55, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" }
    ]
  },
  { 
    id: "r2", 
    name: "Sushi Master", 
    address: "20 Center Rd", 
    description: "Fresh sushi and sashimi", 
    phone: "050-2222222", 
    cuisineType: "asian", 
    lat: 32.06, 
    lng: 34.77, 
    ratings: [], 
    averageRating: 8.8,
    menu: [
      { id: "m3", name: "Spicy Tuna Roll", description: "Fresh tuna with spicy mayo and cucumber", price: 40, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
      { id: "m4", name: "Salmon Nigiri", description: "Two pieces of fresh salmon over seasoned rice", price: 35, image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400" }
    ]
  },
  { 
    id: "r3", 
    name: "Burger Station", 
    address: "30 High St", 
    description: "Premium beef burgers", 
    phone: "050-3333333", 
    cuisineType: "burger", 
    lat: 32.08, 
    lng: 34.80, 
    ratings: [], 
    averageRating: 9.2,
    menu: [
      { id: "m5", name: "Classic Cheeseburger", description: "100% beef patty with cheddar, lettuce, and tomato", price: 50, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
      { id: "m6", name: "Truffle Fries", description: "Crispy fries tossed in truffle oil and parmesan", price: 25, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400" }
    ]
  },
  { 
    id: "r4", 
    name: "Hummus Kings", 
    address: "40 Old City", 
    description: "Freshly made daily hummus", 
    phone: "050-4444444", 
    cuisineType: "middle-eastern", 
    lat: 32.05, 
    lng: 34.75, 
    ratings: [], 
    averageRating: 9.5,
    menu: [
      { id: "m7", name: "Classic Hummus Bowl", description: "Served with warm pita, olive oil, and chickpeas", price: 30, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400" },
      { id: "m8", name: "Hummus with Mushrooms", description: "Hummus topped with warm spiced mushrooms", price: 35, image: "https://images.unsplash.com/photo-1628678229413-ebae949171ee?w=400" }
    ]
  },
  { 
    id: "r5", 
    name: "Taco Fiesta", 
    address: "50 Market St", 
    description: "Spicy Mexican street tacos", 
    phone: "050-5555555", 
    cuisineType: "mexican", 
    lat: 32.17, 
    lng: 34.90, 
    ratings: [], 
    averageRating: 8.7,
    menu: [
      { id: "m9", name: "Carne Asada Tacos", description: "Grilled steak with onions and cilantro", price: 38, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400" },
      { id: "m10", name: "Guacamole & Chips", description: "Freshly mashed avocado with homemade tortilla chips", price: 28, image: "https://images.unsplash.com/photo-1583002497672-882f0ab7b0b2?w=400" }
    ]
  },
  { 
    id: "r6", 
    name: "Green Bowl", 
    address: "60 Park Ave", 
    description: "Healthy salads and grain bowls", 
    phone: "050-6666666", 
    cuisineType: "healthy", 
    lat: 32.18, 
    lng: 34.87, 
    ratings: [], 
    averageRating: 8.4,
    menu: [
      { id: "m11", name: "Quinoa Salad", description: "Fresh quinoa with mixed greens, nuts, and a light citrus dressing", price: 48, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
      { id: "m12", name: "Acai Bowl", description: "Topped with fresh berries, banana, and granola", price: 35, image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400" }
    ]
  },
  { 
    id: "r7", 
    name: "Curry House", 
    address: "70 Spice Ln", 
    description: "Traditional Indian curries", 
    phone: "050-7777777", 
    cuisineType: "indian", 
    lat: 31.97, 
    lng: 34.79, 
    ratings: [], 
    averageRating: 9.1,
    menu: [
      { id: "m13", name: "Chicken Tikka Masala", description: "Creamy tomato curry with tender chicken", price: 55, image: "https://images.unsplash.com/photo-1565557613262-b8bbfaaf5118?w=400" },
      { id: "m14", name: "Garlic Naan", description: "Freshly baked Indian flatbread with garlic and butter", price: 15, image: "https://images.unsplash.com/photo-1605651268686-218206d4eeb0?w=400" }
    ]
  },
  { 
    id: "r8", 
    name: "Pasta Bella", 
    address: "80 River Blvd", 
    description: "Handmade pasta dishes", 
    phone: "050-8888888", 
    cuisineType: "pizza", 
    lat: 32.01, 
    lng: 34.78, 
    ratings: [], 
    averageRating: 8.9,
    menu: [
      { id: "m15", name: "Fettuccine Alfredo", description: "Rich and creamy parmesan sauce over fresh fettuccine", price: 55, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400" },
      { id: "m16", name: "Spaghetti Bolognese", description: "Slow-cooked meat sauce with tomatoes and herbs", price: 58, image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400" }
    ]
  },
  { 
    id: "r9", 
    name: "Wok This Way", 
    address: "90 Neon Pl", 
    description: "Stir-fry noodles and rice", 
    phone: "050-9999999", 
    cuisineType: "asian", 
    lat: 32.07, 
    lng: 34.81, 
    ratings: [], 
    averageRating: 8.6,
    menu: [
      { id: "m17", name: "Pad Thai", description: "Rice noodles stir-fried with peanuts, egg, and tamarind sauce", price: 52, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400" },
      { id: "m18", name: "Crispy Spring Rolls", description: "Vegetable spring rolls served with sweet chili sauce", price: 28, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" }
    ]
  },
  { 
    id: "r10", 
    name: "Steakhouse 42", 
    address: "100 Prime Ct", 
    description: "Aged steaks and fine wines", 
    phone: "050-1010101", 
    cuisineType: "burger", 
    lat: 32.16, 
    lng: 34.84, 
    ratings: [], 
    averageRating: 9.4,
    menu: [
      { id: "m19", name: "Ribeye Steak", description: "300g premium aged beef cooked to perfection", price: 140, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400" },
      { id: "m20", name: "Creamy Mashed Potatoes", description: "Silky smooth potatoes with butter and cream", price: 30, image: "https://images.unsplash.com/photo-1616421008064-07d2f9d50b4a?w=400" }
    ]
  },
  { 
    id: "r11", 
    name: "Shawarma Express", 
    address: "110 Busy St", 
    description: "Quick and tasty street shawarma", 
    phone: "050-2020202", 
    cuisineType: "middle-eastern", 
    lat: 32.09, 
    lng: 34.85, 
    ratings: [], 
    averageRating: 9.3,
    menu: [
      { id: "m21", name: "Chicken Shawarma Pita", description: "Juicy chicken with tahini, hummus, and salad in pita", price: 35, image: "https://images.unsplash.com/photo-1529692236671-f1f6c9688a43?w=400" },
      { id: "m22", name: "Shawarma Plate", description: "Large portion of meat served with fries and dips", price: 55, image: "https://images.unsplash.com/photo-1633353457174-8b89410115e5?w=400" }
    ]
  },
  { 
    id: "r12", 
    name: "Pancake Corner", 
    address: "120 Sweet Pl", 
    description: "Fluffy pancakes served all day", 
    phone: "050-3030303", 
    cuisineType: "dessert", 
    lat: 32.04, 
    lng: 34.76, 
    ratings: [], 
    averageRating: 8.5,
    menu: [
      { id: "m23", name: "Buttermilk Pancakes", description: "Stack of 3 fluffy pancakes with maple syrup", price: 38, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400" },
      { id: "m24", name: "Chocolate Chip Waffle", description: "Belgian waffle loaded with chocolate chips and whipped cream", price: 42, image: "https://images.unsplash.com/photo-1562376552-0d160a2f9fa6?w=400" }
    ]
  },
  { 
    id: "r13", 
    name: "Vegan Delight", 
    address: "130 Green Rd", 
    description: "100% plant-based creative menu", 
    phone: "050-4040404", 
    cuisineType: "vegan", 
    lat: 32.10, 
    lng: 34.82, 
    ratings: [], 
    averageRating: 8.8,
    menu: [
      { id: "m25", name: "Beyond Burger", description: "Plant-based patty with vegan cheddar and special sauce", price: 55, image: "https://images.unsplash.com/photo-1594998893017-361fd74b7d56?w=400" },
      { id: "m26", name: "Vegan Caesar Salad", description: "Crisp romaine, cashew dressing, and chickpea croutons", price: 45, image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400" }
    ]
  },
  { 
    id: "r14", 
    name: "Ocean Bites", 
    address: "140 Beach Walk", 
    description: "Fresh local seafood catch", 
    phone: "050-5050505", 
    cuisineType: "seafood", 
    lat: 32.02, 
    lng: 34.74, 
    ratings: [], 
    averageRating: 9.0,
    menu: [
      { id: "m27", name: "Fish and Chips", description: "Crispy battered cod served with thick-cut fries", price: 65, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400" },
      { id: "m28", name: "Grilled Salmon", description: "Fresh salmon fillet with roasted asparagus", price: 85, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400" }
    ]
  },
  { 
    id: "r15", 
    name: "Dim Sum Drop", 
    address: "150 Lantern St", 
    description: "Authentic steamed dumplings", 
    phone: "050-6060606", 
    cuisineType: "asian", 
    lat: 32.08, 
    lng: 34.79, 
    ratings: [], 
    averageRating: 8.7,
    menu: [
      { id: "m29", name: "Pork Dumplings", description: "Handmade steamed dumplings (6 pieces)", price: 40, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
      { id: "m30", name: "Bao Buns", description: "Fluffy steamed buns filled with sweet BBQ meat", price: 35, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400" }
    ]
  },
  { 
    id: "r16", 
    name: "Cheese & Wine", 
    address: "160 Vintage Ave", 
    description: "Gourmet cheese platters", 
    phone: "050-7070707", 
    cuisineType: "european", 
    lat: 32.06, 
    lng: 34.78, 
    ratings: [], 
    averageRating: 9.2,
    menu: [
      { id: "m31", name: "Artisan Cheese Board", description: "Selection of 4 premium cheeses, nuts, and honey", price: 95, image: "https://images.unsplash.com/photo-1631379577930-b74a3f5a05b5?w=400" },
      { id: "m32", name: "Baked Camembert", description: "Warm gooey cheese served with crusty baguette", price: 65, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400" }
    ]
  },
  { 
    id: "r17", 
    name: "Falafel Magic", 
    address: "170 Round Cir", 
    description: "Crispy falafel in hot pita", 
    phone: "050-8080808", 
    cuisineType: "middle-eastern", 
    lat: 32.03, 
    lng: 34.75, 
    ratings: [], 
    averageRating: 8.6,
    menu: [
      { id: "m33", name: "Falafel Pita", description: "Fresh falafel balls, tahini, and Israeli salad in pita", price: 22, image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400" },
      { id: "m34", name: "Falafel Box", description: "10 falafel balls with dips on the side", price: 30, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400" }
    ]
  },
  { 
    id: "r18", 
    name: "BBQ Bros", 
    address: "180 Smoke Dr", 
    description: "Slow-smoked ribs and brisket", 
    phone: "050-9090909", 
    cuisineType: "burger", 
    lat: 32.11, 
    lng: 34.83, 
    ratings: [], 
    averageRating: 9.5,
    menu: [
      { id: "m35", name: "Smoked Brisket Sandwich", description: "14-hour smoked brisket with BBQ sauce", price: 65, image: "https://images.unsplash.com/photo-1529692236671-f1f6c9688a43?w=400" },
      { id: "m36", name: "BBQ Ribs", description: "Half rack of slow-cooked ribs falling off the bone", price: 85, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" }
    ]
  },
  { 
    id: "r19", 
    name: "Smoothie Vibes", 
    address: "190 Fresh Walk", 
    description: "Fruit smoothies and acai bowls", 
    phone: "050-0101010", 
    cuisineType: "healthy", 
    lat: 32.09, 
    lng: 34.86, 
    ratings: [], 
    averageRating: 8.3,
    menu: [
      { id: "m37", name: "Mango Passion Smoothie", description: "Mango, passionfruit, and banana blended to perfection", price: 25, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
      { id: "m38", name: "Green Detox Juice", description: "Spinach, apple, celery, and ginger", price: 28, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400" }
    ]
  },
  { 
    id: "r20", 
    name: "French Bakery", 
    address: "200 Morning St", 
    description: "Fresh croissants and coffee", 
    phone: "050-1212121", 
    cuisineType: "bakery", 
    lat: 32.05, 
    lng: 34.77, 
    ratings: [], 
    averageRating: 9.6,
    menu: [
      { id: "m39", name: "Butter Croissant", description: "Flaky and buttery, baked fresh daily", price: 16, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
      { id: "m40", name: "Chocolate Eclair", description: "Choux pastry filled with cream and topped with chocolate", price: 22, image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400" }
    ]
  }
];

module.exports = initialRestaurants;