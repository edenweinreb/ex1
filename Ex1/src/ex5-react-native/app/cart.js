import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '../components/CartContext';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const orderData = {
        restaurantId: cartItems[0].restaurantId, 
        items: cartItems.map(item => ({
          productId: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalAmount
      };

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('Order placed successfully! 🎉');
        clearCart(); 
        router.push('/'); 
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert('An error occurred while sending the order.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsList}>
        {cartItems.map((item) => (
          <View key={item.id || item._id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.quantity} x ₪{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id || item._id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₪{totalAmount.toFixed(2)}</Text>
        
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.checkoutButton} 
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyText: { fontSize: 20, color: '#666' },
  itemsList: { flex: 1, padding: 16 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemPrice: { fontSize: 16, color: '#666', marginTop: 4 },
  removeText: { color: 'red', fontWeight: 'bold' },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  clearButton: { padding: 15, borderRadius: 8, backgroundColor: '#ffe6e6', flex: 0.3, alignItems: 'center' },
  clearText: { color: 'red', fontWeight: 'bold' },
  checkoutButton: { padding: 15, borderRadius: 8, backgroundColor: '#00C2E8', flex: 0.65, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});