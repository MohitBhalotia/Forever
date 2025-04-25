import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CollectionScreen from '../screens/CollectionScreen';
import CartScreen from '../screens/CartScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import ProductScreen from '../screens/ProductScreen';
import LoginScreen from '../screens/LoginScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';

// Import context
import { ShopContext } from '../context/ShopContext';
import { colors } from '../utils/styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for screens that need to be accessed from multiple tabs
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

// Tab navigator for main app navigation
const TabNavigator = () => {
  const { cartItems } = useContext(ShopContext);
  
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
        options={{
          tabBarBadge: cartItems.length > 0 ? cartItems.length : null,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
