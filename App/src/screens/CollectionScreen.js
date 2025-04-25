import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'Men', name: 'Men' },
  { id: 'Women', name: 'Women' },
  { id: 'Kids', name: 'Kids' },
];

const CollectionScreen = () => {
  const { allProducts, loading, currency } = useContext(ShopContext);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (allProducts) {
      let filtered = [...allProducts];
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setFilteredProducts(filtered);
    }
  }, [allProducts, selectedCategory, searchQuery]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('Product', { productId: item._id })}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: Array.isArray(item.image) ? item.image[0] : item.image }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{currency}{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Collection" showSearch={true} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.content}>
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-outline" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            ) : null}
          </View>
          
          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContent}
            >
              {CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategoryButton
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.selectedCategoryText
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* No products found */}
          {filteredProducts.length === 0 ? (
            <View style={styles.noProductsContainer}>
              <Ionicons name="search-outline" size={50} color={colors.text.secondary} />
              <Text style={styles.noProductsText}>No products found</Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Products list */
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              numColumns={2}
              contentContainerStyle={styles.productList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
    height: 40,
  },
  categoriesContent: {
    paddingRight: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    width: 90,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noProductsText: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  resetButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  resetButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
  },
  productList: {
    paddingBottom: spacing.lg,
  },
  productCard: {
    width: (width - spacing.md * 3) / 2,
    marginBottom: spacing.lg,
    marginRight: spacing.md,
  },
  productImageContainer: {
    height: 180,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    marginTop: spacing.sm,
  },
  productName: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  productPrice: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
});

export default CollectionScreen;
