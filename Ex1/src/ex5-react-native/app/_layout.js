import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { COLORS } from '../styles/Theme';

export default function RootLayout() {
  return (
    // GestureHandlerRootView is required for the drawer swipe gestures to work properly
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
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
      </Drawer>
    </GestureHandlerRootView>
  );
}