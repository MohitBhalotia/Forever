import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../utils/styles';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Message Sent',
        'Thank you for your message. We will get back to you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
              });
            }
          }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>CONTACT US</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoTitle}>Our Address</Text>
                <Text style={styles.infoText}>123 Fashion Street, Design District</Text>
                <Text style={styles.infoText}>New York, NY 10001</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoTitle}>Phone Number</Text>
                <Text style={styles.infoText}>+1 (555) 123-4567</Text>
                <Text style={styles.infoText}>Mon-Fri, 9:00 AM - 6:00 PM</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoTitle}>Email Address</Text>
                <Text style={styles.infoText}>info@forever-fashion.com</Text>
                <Text style={styles.infoText}>support@forever-fashion.com</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>SEND US A MESSAGE</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Email</Text>
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
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter message subject"
                value={formData.subject}
                onChangeText={(text) => handleInputChange('subject', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter your message"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={formData.message}
                onChangeText={(text) => handleInputChange('message', text)}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.text.light} />
              ) : (
                <Text style={styles.submitButtonText}>SEND MESSAGE</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.socialContainer}>
            <Text style={styles.socialTitle}>FOLLOW US</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-twitter" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Ionicons name="logo-pinterest" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.mapContainer}>
            <Text style={styles.mapPlaceholder}>Map will be displayed here</Text>
          </View>
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
  },
  infoContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  formTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.md,
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
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    fontSize: typography.fontSizes.md,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  submitButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  socialContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  socialTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mapContainer: {
    height: 200,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  mapPlaceholder: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
});

export default ContactScreen;
