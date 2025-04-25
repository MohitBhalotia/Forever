import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { products as sampleProducts } from '../assets/assets';
import API_CONFIG from '../config/apiConfig';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  // For Android emulator, use 10.0.2.2 to access localhost
  // For iOS simulator, use localhost
  // For web/browser, use localhost or your actual backend URL
  // For Expo Go on physical devices, use your computer's IP address
  const [backendUrl, setBackendUrl] = useState(API_CONFIG.BASE_URL);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [allProducts, setAllProducts] = useState(sampleProducts);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  // Determine the correct backend URL based on platform
  useEffect(() => {
    const determineBackendUrl = async () => {
      try {
        // Try to connect to your computer's IP address (for Expo Go on physical devices)
        console.log('Trying to connect to backend on your network IP...');
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL}`, { 
          method: 'HEAD',
          timeout: 5000 
        });
        if (response.ok) {
          setBackendUrl(API_CONFIG.BASE_URL);
          console.log('Using network IP backend URL:', API_CONFIG.BASE_URL);
          setConnectionError(false);
          return;
        }
      } catch (error) {
        console.log('Could not connect to network IP, trying Android emulator URL...');
      }

      try {
        // Try to detect if we're running in an Android emulator
        const response = await fetch(`${API_CONFIG.ANDROID_EMULATOR_URL}${API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL}`, { 
          method: 'HEAD',
          timeout: 2000 
        });
        if (response.ok) {
          setBackendUrl(API_CONFIG.ANDROID_EMULATOR_URL);
          console.log('Using Android emulator backend URL');
          setConnectionError(false);
          return;
        }
      } catch (error) {
        console.log('Could not connect to Android emulator URL, trying localhost...');
      }

      try {
        // If Android URL fails, try localhost (for iOS or web)
        const response = await fetch(`${API_CONFIG.LOCALHOST_URL}${API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL}`, { 
          method: 'HEAD',
          timeout: 2000 
        });
        if (response.ok) {
          setBackendUrl(API_CONFIG.LOCALHOST_URL);
          console.log('Using localhost backend URL');
          setConnectionError(false);
          return;
        }
      } catch (error) {
        console.error('Could not connect to backend:', error);
        setConnectionError(true);
        Alert.alert(
          'Connection Error',
          'Could not connect to the server. Using sample data instead. Please check your backend connection.'
        );
      }
    };
    
    determineBackendUrl();
  }, []);

  // Get token from AsyncStorage on component mount
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
        
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    getToken();
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log('Fetching products from:', backendUrl);
        console.log('Full URL:', `${backendUrl}${API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL}`);
        
        const response = await axios.get(`${backendUrl}${API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL}`);
        console.log('Response status:', response.status);
        console.log('Response data type:', typeof response.data);
        console.log('Response data sample:', Array.isArray(response.data) ? response.data.slice(0, 2) : response.data);
        
        if (response.status === 200) {
          console.log('Products fetched successfully:', Array.isArray(response.data) ? response.data.length : 'Not an array');
          setAllProducts(response.data);
          setConnectionError(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', error.response ? {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        } : 'No response details');
        
        // Fallback to sample products if backend is not available
        setAllProducts(sampleProducts);
        setConnectionError(true);
        Alert.alert(
          'Connection Error',
          'Could not connect to the server. Using sample data instead. Please check your backend connection.'
        );
      } finally {
        setLoading(false);
      }
    };
    
    if (backendUrl) {
      fetchProducts();
    }
  }, [backendUrl]);

  // Fetch cart items when token changes
  useEffect(() => {
    if (token) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [token]);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      console.log('Fetching cart items from:', backendUrl);
      const response = await axios.get(`${backendUrl}${API_CONFIG.ENDPOINTS.CART.GET_CART}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        console.log('Cart items fetched successfully:', response.data.length);
        setCartItems(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // If there's a 401 error, the token is invalid
      if (error.response && error.response.status === 401) {
        Alert.alert('Session Expired', 'Your session has expired. Please login again.');
        logout();
      } else if (connectionError) {
        // If we already know there's a connection error, don't show another alert
        setCartItems([]);
      } else {
        Alert.alert(
          'Error',
          'Failed to fetch cart items. Please try again later.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, size, quantity = 1) => {
    if (!token) {
      Alert.alert('Login Required', 'Please login to add items to your cart', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => {
          // Use a callback function instead of direct navigation reference
          // The component using this context should handle navigation
          Alert.alert('Login Required', 'Please go to the login screen to sign in first.');
        }}
      ]);
      return;
    }
    
    if (connectionError) {
      Alert.alert(
        'Offline Mode',
        'You are currently in offline mode. Cart operations are not available until you reconnect to the server.'
      );
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}${API_CONFIG.ENDPOINTS.CART.ADD_TO_CART}`,
        { productId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 201) {
        fetchCartItems(); // Refresh cart after adding
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      if (error.response && error.response.status === 401) {
        Alert.alert('Session Expired', 'Your session has expired. Please login again.');
        logout();
      } else {
        Alert.alert(
          'Error',
          'Failed to add item to cart. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity in cart
  const updateQuantity = async (cartItemId, quantity) => {
    if (!token) return;
    
    if (connectionError) {
      Alert.alert(
        'Offline Mode',
        'You are currently in offline mode. Cart operations are not available until you reconnect to the server.'
      );
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}${API_CONFIG.ENDPOINTS.CART.UPDATE_CART}`,
        { itemId: cartItemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200) {
        fetchCartItems();
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    if (!token) return;
    
    if (connectionError) {
      Alert.alert(
        'Offline Mode',
        'You are currently in offline mode. Cart operations are not available until you reconnect to the server.'
      );
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}${API_CONFIG.ENDPOINTS.CART.REMOVE_FROM_CART}/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200) {
        fetchCartItems();
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!token) return;
    
    if (connectionError) {
      Alert.alert(
        'Offline Mode',
        'You are currently in offline mode. Cart operations are not available until you reconnect to the server.'
      );
      return;
    }
    
    try {
      setLoading(true);
      // There's no clear-cart endpoint in the backend, so we'll have to implement this differently
      // For now, we'll just clear the cart locally
      setCartItems([]);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      setLoading(false);
      return false;
    }
  };

  // Calculate cart total
  const getCartAmount = () => {
    let amount = 0;
    cartItems.forEach((item) => {
      const product = allProducts.find(
        (product) => product._id === item.productId
      );
      if (product) {
        amount += product.price * item.quantity;
      }
    });
    return amount;
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      setToken("");
      setUserData(null);
      setCartItems([]);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const contextValue = {
    currency,
    delivery_fee,
    allProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    token,
    setToken,
    userData,
    setUserData,
    backendUrl,
    connectionError,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartAmount,
    getCartCount,
    logout,
    fetchCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
