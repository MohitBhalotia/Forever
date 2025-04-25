// API Configuration for Forever App
// Update this file with your computer's IP address when running on a different network

// Get your computer's IP address by running 'ipconfig' in the command prompt
// Look for the IPv4 Address under your active network connection (usually Wi-Fi)
const API_CONFIG = {
  // Your computer's IP address (for Expo Go on physical devices)
  NETWORK_IP: '192.168.151.101',
  
  // Port your backend is running on
  PORT: 5000,
  
  // API base URL with your network IP
  BASE_URL: 'http://192.168.151.101:5000',
  
  // API base URL for Android emulator
  ANDROID_EMULATOR_URL: 'http://10.0.2.2:5000',
  
  // API base URL for iOS simulator or web browser
  LOCALHOST_URL: 'http://localhost:5000',
  
  // API endpoints
  ENDPOINTS: {
    // Product endpoints
    PRODUCTS: {
      GET_ALL: '/api/v1/product/get-all-products',
      GET_SINGLE: '/api/v1/product/get-single-product',
    },
    
    // User endpoints
    USER: {
      LOGIN: '/api/v1/user/login',
      REGISTER: '/api/v1/user/register',
    },
    
    // Cart endpoints
    CART: {
      GET_CART: '/api/v1/cart/get-cart',
      ADD_TO_CART: '/api/v1/cart/add-to-cart',
      UPDATE_CART: '/api/v1/cart/update-cart',
      REMOVE_FROM_CART: '/api/v1/cart/remove-from-cart', // Requires itemId parameter
    },
    
    // Order endpoints
    ORDER: {
      CREATE: '/api/v1/order/create',
      GET_USER_ORDERS: '/api/v1/order/user-orders',
      GET_ORDER_BY_ID: '/api/v1/order', // Requires orderId parameter
      CANCEL_ORDER: '/api/v1/order/cancel', // Requires orderId parameter
    },
  },
};

export default API_CONFIG;
