import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  
    card: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      elevation: 2, // Android shadow
    },
  
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8
    },
  
    status: {
      fontSize: 16,
      color: '#007AFF',
      marginBottom: 4,
      textTransform: 'capitalize'
    },
  
    date: {
      fontSize: 14,
      color: '#888',
      marginBottom: 16
    },
  
    divider: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 16
    },
  
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12
    },
  
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8
    },
  
    itemName: {
      fontSize: 16,
      color: '#333'
    },
  
    itemPrice: {
      fontSize: 16,
      color: '#666'
    },
  
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8
    },
  
    totalText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
  
    totalAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'
    },
  
    error: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 18,
      color: 'red'
    }
  });