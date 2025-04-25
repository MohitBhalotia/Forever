# Forever E-Commerce Mobile App

This is a React Native mobile app version of the Forever E-Commerce website, built using Expo.

## Overview

This mobile app is designed to work with the existing MERN stack backend of the Forever E-Commerce platform. It provides a native mobile shopping experience while maintaining the same functionality and design aesthetics as the web version.

## Features

- **Home Screen**: Showcases featured products, latest collections, and promotions
- **Collection Screen**: Browse products by category with search and filter functionality
- **Product Detail**: View detailed product information, select sizes, and add to cart
- **Cart Management**: Add, remove, and update quantities of items in your cart
- **User Authentication**: Login and registration functionality
- **Checkout Process**: Complete order placement with shipping and payment information
- **About & Contact**: Information about the company and contact form

## Tech Stack

- **React Native**: Core framework for building the mobile app
- **Expo**: Development platform for easier cross-platform development
- **React Navigation**: Navigation library for screen transitions and tabs
- **Context API**: For global state management (ShopContext)
- **Axios**: For API requests to the backend
- **AsyncStorage**: For local storage of authentication tokens
- **Expo Vector Icons**: For UI icons

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on a device or emulator
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator
   - Scan the QR code with Expo Go app on your physical device

## Backend Connection

The app is configured to connect to the existing Forever E-Commerce backend. Make sure the backend server is running at the URL specified in the ShopContext.js file.

For Android emulator, the backend URL is set to `http://10.0.2.2:5000` which points to localhost on your development machine.

## Project Structure

```
my-app/
├── src/
│   ├── assets/         # Images, icons, and sample data
│   ├── components/     # Reusable UI components
│   ├── context/        # Global state management
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # App screens
│   └── utils/          # Utility functions and styles
├── App.js              # Entry point
└── package.json        # Dependencies
```

## Development Notes

- The app uses React Native's StyleSheet API for styling instead of NativeWind/Tailwind
- A utility file (`src/utils/styles.js`) provides consistent colors, spacing, and typography
- The navigation structure mirrors the web version's navigation
- Authentication uses JWT tokens stored in AsyncStorage

## Learn More

To learn more about the technologies used in this project:

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
