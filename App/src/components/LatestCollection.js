import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';

const { width } = Dimensions.get('window');
const cardWidth = (width - (spacing.md * 2) - spacing.md) / 2; // 2 cards per row with some padding

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const navigation = useNavigation();
  
  // Get the latest 6 products based on date
  const latestProducts = [...products]
    .sort((a, b) => b.date - a.date)
    .slice(0, 6);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Product', { productId: item._id })}
    >
      <Image 
        source={{ uri: item.image[0] }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{currency}{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LATEST COLLECTION</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={latestProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  viewAll: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    marginBottom: spacing.lg,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 4,
  },
  productInfo: {
    marginTop: spacing.sm,
  },
  productName: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  productPrice: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
});

export default LatestCollection;
