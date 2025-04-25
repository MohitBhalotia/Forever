import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const PlaceOrderScreen = () => {
  const { 
    cartItems, 
    allProducts, 
    currency, 
    getCartAmount, 
    delivery_fee,
    token,
    backendUrl,
    clearCart,
    loading: contextLoading
  } = useContext(ShopContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'COD' // cash on delivery by default
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token]);

  // Redirect to cart if empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigation.navigate('Main', { screen: 'Cart' });
    }
  }, [cartItems]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    const { name, email, phone, address, city, state, zipCode } = formData;
    
    if (!name.trim() || !email.trim() || !phone.trim() || 
        !address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Prepare order items
      const orderItems = cartItems.map(item => {
        const product = allProducts.find(p => p._id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: product ? product.price : 0,
          name: product ? product.name : 'Unknown Product'
        };
      });
      
      // Calculate totals
      const subtotal = getCartAmount();
      const total = subtotal + delivery_fee;
      
      // Create order object with proper structure for backend
      const orderData = {
        items: orderItems,
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: 'US', // Default country
          phone: formData.phone,
          email: formData.email
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: total,
        shippingFee: delivery_fee
      };
      
      // Send order to backend
      const response = await axios.post(
        `${backendUrl}${API_CONFIG.ENDPOINTS.ORDER.CREATE}`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 201) {
        // Clear cart after successful order
        clearCart();
        
        // Show success message
        Alert.alert(
          'Order Placed Successfully',
          `Your order ID is: ${response.data.orderId || 'N/A'}`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Main', { screen: 'Home' })
            }
          ]
        );
      }
    } catch (error) {
      console.error('Order error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Failed to place order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (contextLoading || cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <Text style={styles.title}>CHECKOUT</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: spacing.sm }]}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) => handleInputChange('city', text)}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: spacing.sm }]}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={formData.state}
                  onChangeText={(text) => handleInputChange('state', text)}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Zip Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter zip code"
                keyboardType="numeric"
                value={formData.zipCode}
                onChangeText={(text) => handleInputChange('zipCode', text)}
              />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                formData.paymentMethod === 'COD' && styles.selectedPayment
              ]}
              onPress={() => handleInputChange('paymentMethod', 'COD')}
            >
              <View style={styles.radioButton}>
                {formData.paymentMethod === 'COD' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                formData.paymentMethod === 'CARD' && styles.selectedPayment
              ]}
              onPress={() => handleInputChange('paymentMethod', 'CARD')}
            >
              <View style={styles.radioButton}>
                {formData.paymentMethod === 'CARD' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.paymentText}>Credit/Debit Card (Coming Soon)</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            
            <View style={styles.summaryContainer}>
              {cartItems.map((item) => {
                const product = allProducts.find(p => p._id === item.productId);
                if (!product) return null;
                
                return (
                  <View key={item._id} style={styles.summaryItem}>
                    <View style={styles.summaryItemInfo}>
                      <Text style={styles.summaryItemName} numberOfLines={1}>
                        {product.name}
                      </Text>
                      <Text style={styles.summaryItemDetails}>
                        Size: {item.size} | Qty: {item.quantity}
                      </Text>
                    </View>
                    <Text style={styles.summaryItemPrice}>
                      {currency}{item.quantity * product.price}
                    </Text>
                  </View>
                );
              })}
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{currency}{getCartAmount()}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{currency}{delivery_fee}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {currency}{getCartAmount() + delivery_fee}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.text.light} />
            ) : (
              <Text style={styles.placeOrderButtonText}>PLACE ORDER</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  backButton: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  formRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizes.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  selectedPayment: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  paymentText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  summaryContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryItemInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  summaryItemName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  summaryItemDetails: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  summaryItemPrice: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: spacing.sm,
  },
  totalLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.xxl,
  },
  placeOrderButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
});

export default PlaceOrderScreen;
