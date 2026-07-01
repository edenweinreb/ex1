import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  dishCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishInfo: {
    flex: 1,
    paddingRight: 16,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dishDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C2E8',
  },
  dishImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  bottomSpacer: {
    height: 40,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  emptyMenuText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  }
});