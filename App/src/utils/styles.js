import { StyleSheet, Dimensions, Platform } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Define app-wide colors
export const colors = {
  primary: '#000000',
  secondary: '#414141',
  background: '#FFFFFF',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#FFFFFF',
  },
  border: '#CCCCCC',
  lightGray: '#F5F5F5',
  error: '#FF0000',
  success: '#4CAF50',
  card: '#FFFFFF',
  danger: '#FF3B30',
};

// Define spacing constants
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Define typography constants
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

// Helper function to create responsive styles
export const createResponsiveStyles = (phoneStyles, tabletStyles, desktopStyles) => {
  // Basic responsive breakpoints
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  if (isDesktop && desktopStyles) {
    return { ...phoneStyles, ...tabletStyles, ...desktopStyles };
  }

  if (isTablet && tabletStyles) {
    return { ...phoneStyles, ...tabletStyles };
  }

  return phoneStyles;
};
