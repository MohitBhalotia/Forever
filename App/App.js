import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import ProductScreen from './src/screens/ProductScreen';
import CartScreen from './src/screens/CartScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import LoginScreen from './src/screens/LoginScreen';
import PlaceOrderScreen from './src/screens/PlaceOrderScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import context
import { ShopContextProvider } from './src/context/ShopContext';
import { colors } from './src/utils/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Collection') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={({ route }) => ({
          tabBarBadge: route.params?.cartCount > 0 ? route.params.cartCount : null,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ShopContextProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShopContextProvider>
  );
}
