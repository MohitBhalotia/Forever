import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';

const { width } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = width * 1.2;

const ProductScreen = () => {
  const route = useRoute();
  const { productId } = route.params;
  const navigation = useNavigation();
  const { 
    allProducts, 
    addToCart, 
    currency,
    loading
  } = useContext(ShopContext);
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const foundProduct = allProducts.find(p => p._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default selected size
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        
        // Find related products (same category, excluding current product)
        const related = allProducts
          .filter(p => 
            p._id !== productId && 
            p.category === foundProduct.category
          )
          .slice(0, 4); // Limit to 4 related products
        
        setRelatedProducts(related);
      } else {
        Alert.alert('Error', 'Product not found');
        navigation.goBack();
      }
    }
  }, [allProducts, productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Error', 'Please select a size');
      return;
    }
    
    addToCart(productId, selectedSize, 1);
    Alert.alert('Success', 'Product added to cart');
  };

  if (loading || !product) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading product...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        {/* Image gallery */}
        <View style={styles.imageContainer}>
          <FlatList
            data={product.image}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `image-${index}`}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.floor(
                event.nativeEvent.contentOffset.x / imageWidth
              );
              setCurrentImageIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
          />
          
          {/* Image pagination dots */}
          {product.image.length > 1 && (
            <View style={styles.paginationContainer}>
              {product.image.map((_, index) => (
                <View
                  key={`dot-${index}`}
                  style={[
                    styles.paginationDot,
                    index === currentImageIndex && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          )}
        </View>
        
        {/* Product details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              {currency}{product.price}
            </Text>
            
            {product.oldPrice && (
              <Text style={styles.oldPrice}>
                {currency}{product.oldPrice}
              </Text>
            )}
          </View>
          
          {/* Size selection */}
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {product.sizes && product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text 
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          {/* Add to cart button */}
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedContainer}>
              <Text style={styles.sectionTitle}>You May Also Like</Text>
              
              <FlatList
                data={relatedProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.relatedProductCard}
                    onPress={() => {
                      navigation.push('Product', { productId: item._id });
                    }}
                  >
                    <Image
                      source={{ uri: item.image[0] }}
                      style={styles.relatedProductImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.relatedProductName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.relatedProductPrice}>
                      {currency}{item.price}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    zIndex: 10,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacing.xs,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: spacing.md,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    padding: spacing.lg,
  },
  productName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  productPrice: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  oldPrice: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedSizeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  sizeText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
  },
  selectedSizeText: {
    color: colors.text.light,
  },
  description: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  addToCartButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  relatedContainer: {
    marginTop: spacing.md,
  },
  relatedProductCard: {
    width: 150,
    marginRight: spacing.md,
  },
  relatedProductImage: {
    width: 150,
    height: 200,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  relatedProductName: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  relatedProductPrice: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
  },
});

export default ProductScreen;
