import React, { useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';
import Header from '../components/Header';

const CartScreen = () => {
  const { 
    allProducts, 
    cartItems, 
    currency, 
    updateQuantity, 
    removeFromCart, 
    getCartAmount,
    getCartCount,
    delivery_fee,
    token,
    loading
  } = useContext(ShopContext);
  const navigation = useNavigation();

  // Update cart badge when cart count changes
  useEffect(() => {
    navigation.setParams({ cartCount: getCartCount() });
  }, [cartItems]);

  // Redirect to login if not authenticated
  useFocusEffect(
    React.useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [token])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Cart" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!token || cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Cart" />
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={colors.border} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Collection')}
          >
            <Text style={styles.shopButtonText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleQuantityChange = (cartItemId, quantity) => {
    if (quantity < 1) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => updateQuantity(cartItemId, 1)
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeFromCart(cartItemId)
          }
        ]
      );
    } else {
      updateQuantity(cartItemId, quantity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cart" />
      <Text style={styles.title}>YOUR CART</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => {
          const productData = allProducts.find(
            (product) => product._id === item.productId
          );
          
          if (!productData) return null;
          
          return (
            <View key={item._id} style={styles.cartItem}>
              <View style={styles.productContainer}>
                <Image 
                  source={{ uri: productData.image[0] }} 
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{productData.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{currency}{productData.price}</Text>
                    <View style={styles.sizeContainer}>
                      <Text style={styles.sizeText}>{item.size}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.actionContainer}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    <Ionicons name="remove" size={16} color={colors.text.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={16} color={colors.text.primary} />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => removeFromCart(item._id)}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
                
                <Text style={styles.itemTotal}>
                  {currency}{item.quantity * productData.price}
                </Text>
              </View>
            </View>
          );
        })}
        
        <View style={styles.summaryContainer}>
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
          
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('PlaceOrder')}
          >
            <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyText: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 4,
  },
  shopButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semiBold,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  productName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  sizeContainer: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sizeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.secondary,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    fontSize: typography.fontSizes.sm,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  itemTotal: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  summaryContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    backgroundColor: colors.lightGray,
    padding: spacing.lg,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
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
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  checkoutButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
});

export default CartScreen;
