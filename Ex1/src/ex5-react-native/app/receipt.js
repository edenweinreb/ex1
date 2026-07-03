import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ReceiptScreen() {
  const router = useRouter();
  // שולפים את הנתונים שנעביר מהעגלה (מספר הזמנה וסכום)
  const { orderId, total } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>Your food is being prepared and will be on its way soon.</Text>

      <View style={styles.receiptBox}>
        <Text style={styles.receiptText}>Order ID:</Text>
        <Text style={styles.idText}>{orderId || 'N/A'}</Text>
        
        <Text style={styles.totalText}>Total Paid: ₪{total ? parseFloat(total).toFixed(2) : '0.00'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', padding: 20 },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center', paddingHorizontal: 20 },
  receiptBox: { backgroundColor: '#fff', padding: 25, borderRadius: 15, width: '100%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, marginBottom: 40 },
  receiptText: { fontSize: 14, color: '#888', marginBottom: 5 },
  idText: { fontSize: 16, color: '#333', marginBottom: 20, fontWeight: '500' },
  totalText: { fontSize: 22, fontWeight: 'bold', color: '#00C2E8', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  button: { backgroundColor: '#00C2E8', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});