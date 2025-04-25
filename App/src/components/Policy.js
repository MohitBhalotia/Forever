import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { assets } from '../assets/assets';
import { colors, spacing, typography } from '../utils/styles';

const Policy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.policyItem}>
        <Image 
          source={{ uri: assets.quality_icon }}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Premium Quality</Text>
          <Text style={styles.description}>
            We use only the best materials for our products to ensure durability and comfort.
          </Text>
        </View>
      </View>

      <View style={styles.policyItem}>
        <Image 
          source={{ uri: assets.exchange_icon }}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Free Shipping</Text>
          <Text style={styles.description}>
            We offer free shipping on all orders above $100 within the country.
          </Text>
        </View>
      </View>

      <View style={styles.policyItem}>
        <Image 
          source={{ uri: assets.support_img }}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>24/7 Support</Text>
          <Text style={styles.description}>
            Our customer support team is available 24/7 to assist you with any queries.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    backgroundColor: colors.lightGray,
    padding: spacing.md,
    borderRadius: 8,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default Policy;
