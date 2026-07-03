import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { COLORS } from '../styles/Theme';
import { CartProvider } from '../components/CartContext';

export default function RootLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    // GestureHandlerRootView is required for the drawer swipe gestures to work properly
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              labelStyle={{ color: '#d9534f', fontWeight: 'bold' }}
              onPress={handleLogout}
            />
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerShown: true, // Shows the top bar with the hamburger icon
          drawerActiveTintColor: COLORS.primary, // Highlights the active screen in cyan
          drawerInactiveTintColor: COLORS.textDark,
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textDark,
        }}
      >
        {/* Main Client Area (The Bottom Tabs) */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home / Order Food',
            title: 'Wolt App',
          }}
        />

        {/* Admin Dashboard Screen */}
        <Drawer.Screen
          name="admin/index"
          options={{
            drawerLabel: 'Admin Dashboard',
            title: 'Manage Restaurants',
          }}
        />

        {/* Hiding sub-admin screens from appearing as items in the drawer menu list */}
        <Drawer.Screen
          name="admin/create"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Add New Restaurant',
          }}
        />

        <Drawer.Screen
          name="admin/edit/[id]"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Edit Restaurant',
          }}
        />

        <Drawer.Screen
          name="admin/dishes/[id]"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Manage Menu',
          }}
        />
        <Drawer.Screen
        name="restaurant/[id]"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
        <Drawer.Screen
        name="order/[id]"
        options={{
          drawerItemStyle: { display: 'none' }, // מסתיר אותו מהתפריט הצדדי כדי שלא יופיע ככפתור
          title: 'Order Details',
        }}
      />

      <Drawer.Screen
        name="+not-found"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="receipt"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Order Receipt', 
          headerLeft: () => null, 
        }}
      />
      </Drawer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
