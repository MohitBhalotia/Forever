import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { colors, spacing, typography } from '../utils/styles';
import { ShopContext } from '../context/ShopContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { allProducts, loading, currency } = useContext(ShopContext);
  const navigation = useNavigation();
  const [bestSellers, setBestSellers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Get bestsellers
      const bestsellers = allProducts.filter(product => product.bestseller).slice(0, 4);
      setBestSellers(bestsellers);
      
      // Get latest products (using the most recently added products)
      const sortedByDate = [...allProducts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      ).slice(0, 4);
      setLatestProducts(sortedByDate);
    }
  }, [allProducts]);

  const navigateToProduct = (productId) => {
    navigation.navigate('Product', { productId });
  };

  const renderProductCard = (product) => (
    <TouchableOpacity 
      key={product._id} 
      style={styles.productCard}
      onPress={() => navigateToProduct(product._id)}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: product.image[0] }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
      <Text style={styles.productPrice}>{currency}{product.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header title="FOREVER" showSearch={true} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Forever E-Commerce</Text>
            <Text style={styles.heroSubtitle}>Shop the latest trends</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Collection')}
            >
              <Text style={styles.shopButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
          
          {/* Latest Collection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>LATEST COLLECTION</Text>
            <View style={styles.productsGrid}>
              {latestProducts.length > 0 ? (
                latestProducts.map(product => renderProductCard(product))
              ) : (
                <Text style={styles.noProductsText}>No products available</Text>
              )}
            </View>
          </View>
          
          {/* Best Sellers */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>BEST SELLERS</Text>
            <View style={styles.productsGrid}>
              {bestSellers.length > 0 ? (
                bestSellers.map(product => renderProductCard(product))
              ) : (
                <Text style={styles.noProductsText}>No bestsellers available</Text>
              )}
            </View>
          </View>
          
          {/* Policies */}
          <View style={styles.policiesContainer}>
            <View style={styles.policyItem}>
              <Text style={styles.policyTitle}>Quality Product</Text>
              <Text style={styles.policyText}>100% quality guarantee</Text>
            </View>
            <View style={styles.policyItem}>
              <Text style={styles.policyTitle}>Free Shipping</Text>
              <Text style={styles.policyText}>On orders over $100</Text>
            </View>
            <View style={styles.policyItem}>
              <Text style={styles.policyTitle}>24/7 Support</Text>
              <Text style={styles.policyText}>Dedicated support</Text>
            </View>
          </View>
          
          {/* Newsletter */}
          <View style={styles.newsletterContainer}>
            <Text style={styles.newsletterTitle}>JOIN OUR NEWSLETTER</Text>
            <Text style={styles.newsletterText}>
              Subscribe to our newsletter and get 10% off your first purchase
            </Text>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  heroSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: spacing.lg,
  },
  heroTitle: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 4,
  },
  shopButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  sectionContainer: {
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - spacing.md * 2 - spacing.md) / 2,
    marginBottom: spacing.lg,
  },
  productImageContainer: {
    height: 180,
    backgroundColor: colors.lightGray,
    marginBottom: spacing.sm,
    borderRadius: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  productPrice: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  noProductsText: {
    width: '100%',
    textAlign: 'center',
    padding: spacing.md,
    color: colors.text.secondary,
  },
  policiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.lightGray,
    marginTop: spacing.lg,
  },
  policyItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
  },
  policyTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  policyText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  newsletterContainer: {
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  newsletterTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  newsletterText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 4,
  },
  subscribeButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
});

export default HomeScreen;
