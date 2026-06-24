import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo-vector-icons';
import { styles } from '../../styles/tabs._layout.styles'; 
import { COLORS } from '../../styles/Theme'; 

export default function TabsLayout() {
  return (
    <View style={styles.wrapper}>
      
      {/* Custom Header */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.logoText}>MyWolt</Text>
        </View>
      </SafeAreaView>

      {/* Bottom Tabs Menu */}
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primary }}>
        
        <Tabs.Screen 
          name="index" 
          options={{
            tabBarLabel: 'Restaurants',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant" size={size} color={color} />
            ),
          }} 
        />
        
        <Tabs.Screen 
          name="profile" 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }} 
        />
        
        {/* Additional screens can be added here in the future and hidden from the bottom tab using href: null */}
      </Tabs>

    </View>
  );
}