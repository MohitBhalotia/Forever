import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, typography } from '../utils/styles';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your backend
    Alert.alert('Success', 'Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JOIN OUR NEWSLETTER</Text>
      <Text style={styles.description}>
        Subscribe to our newsletter to receive updates on new arrivals, special offers and other discount information.
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
          <Text style={styles.buttonText}>SUBSCRIBE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  buttonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semiBold,
  },
});

export default NewsLetter;
