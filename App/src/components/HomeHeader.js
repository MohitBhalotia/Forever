import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { assets } from '../assets/assets';
import { colors, spacing, typography } from '../utils/styles';

const { width } = Dimensions.get('window');

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      {/* Hero Left */}
      <View style={styles.leftContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.line} />
          <Text style={styles.subtitle}>OUR BESTSELLERS</Text>
        </View>
        <Text style={styles.title}>Latest Arrivals</Text>
        <View style={styles.shopContainer}>
          <Text style={styles.shopText}>SHOP NOW</Text>
          <View style={styles.line} />
        </View>
      </View>

      {/* Hero Right */}
      <Image 
        source={{ uri: assets.hero_img }} 
        style={styles.heroImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.md,
    backgroundColor: colors.background,
  },
  leftContainer: {
    width: '100%',
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  line: {
    width: 32,
    height: 2,
    backgroundColor: colors.secondary,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.secondary,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    marginVertical: spacing.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.secondary,
  },
  shopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  shopText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.secondary,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
});

export default HomeHeader;
