import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRestaurant.css';

function AddRestaurant() {
  const navigate = useNavigate();

  // State for restaurant details
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    cuisineType: '',
    image: '',
    lat: '',
    lng: ''
  });

  // State for the products array and the single product form
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState({
    name: '',
    description: '',
    price: ''
  });

  // Function to add a product to the local array
  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent page refresh and submission of the main form

    if (!productInput.name || !productInput.price) return;

    setProducts([...products, productInput]);

    // Reset input fields
    setProductInput({
      name: '',
      description: '',
      price: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create the restaurant
      const restRes = await fetch('http://localhost:3000/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng)
        })
      });

      if (!restRes.ok) {
        const errorData = await restRes.json();
        alert(
          `Error: ${errorData.error || errorData.message || 'Failed to add restaurant'}`
        );
        return;
      }

      // Extract the ID of the newly created restaurant
      const newRestaurant = await restRes.json();
      const restaurantId = newRestaurant.id;

      //Add all products one by one to the newly created restaurant
      for (const product of products) {
        await fetch(
          `http://localhost:3000/api/restaurants/${restaurantId}/products`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...product,
              price: parseFloat(product.price)
            })
          }
        );
      }

      alert('Restaurant and products added successfully!');
      navigate('/');

    } catch (error) {
      console.error('Error submitting:', error);
      alert('An error occurred while creating the restaurant.');
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add New Restaurant</h2>

      <form className="add-restaurant-form" onSubmit={handleSubmit}>
        <h3>Restaurant Details</h3>

        <input
          placeholder="Name"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          placeholder="Description"
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <input
          placeholder="Address"
          onChange={e =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone"
          onChange={e =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
        />

        <input
          placeholder="Cuisine Type"
          onChange={e =>
            setFormData({ ...formData, cuisineType: e.target.value })
          }
          required
        />

        <input
          placeholder="Image URL"
          onChange={e =>
            setFormData({ ...formData, image: e.target.value })
          }
        />

        <input
          type="number"
          step="any"
          placeholder="Latitude (e.g. 32.1)"
          onChange={e =>
            setFormData({ ...formData, lat: e.target.value })
          }
          required
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude (e.g. 34.8)"
          onChange={e =>
            setFormData({ ...formData, lng: e.target.value })
          }
          required
        />

        <hr />

        <h3>Menu Items</h3>

        <div
          className="add-product-section"
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '15px'
          }}
        >
          <input
            placeholder="Product Name"
            value={productInput.name}
            onChange={e =>
              setProductInput({
                ...productInput,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Product Description"
            value={productInput.description}
            onChange={e =>
              setProductInput({
                ...productInput,
                description: e.target.value
              })
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Price"
            value={productInput.price}
            onChange={e =>
              setProductInput({
                ...productInput,
                price: e.target.value
              })
            }
          />

          <button
            onClick={handleAddProduct}
            style={{ marginTop: '10px' }}
            type="button"
          >
            + Add to Menu
          </button>
        </div>

        {/* Display the products that have been temporarily added */}
        {products.length > 0 && (
          <ul style={{ textAlign: 'left', marginBottom: '15px' }}>
            {products.map((p, index) => (
              <li key={index}>
                {p.name} - {p.description} - ₪{p.price}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="submit-btn">
          Create Restaurant
        </button>
      </form>
    </div>
  );
}

export default AddRestaurant;