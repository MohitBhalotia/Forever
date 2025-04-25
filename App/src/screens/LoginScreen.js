import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl, setToken, token, setUserData } = useContext(ShopContext);
  const navigation = useNavigation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (token) {
      navigation.navigate('Main');
    }
  }, [token]);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!isLogin && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      if (isLogin) {
        // Login
        const response = await axios.post(`${backendUrl}${API_CONFIG.ENDPOINTS.USER.LOGIN}`, {
          email,
          password
        });
        
        if (response.status === 200) {
          const { token: authToken, user } = response.data;
          setToken(authToken);
          await AsyncStorage.setItem('token', authToken);
          
          // Store user data in AsyncStorage
          if (user) {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            // Update user data in context
            setUserData(user);
          }
          
          navigation.navigate('Main');
        }
      } else {
        // Register
        const response = await axios.post(`${backendUrl}${API_CONFIG.ENDPOINTS.USER.REGISTER}`, {
          name,
          email,
          password
        });
        
        if (response.status === 201) {
          Alert.alert(
            'Registration Successful',
            'Your account has been created. Please login with your credentials.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsLogin(true);
                  setName('');
                  setEmail('');
                  setPassword('');
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Authentication failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>FOREVER</Text>
          </View>
          
          <Text style={styles.title}>{isLogin ? 'LOGIN' : 'REGISTER'}</Text>
          
          <View style={styles.formContainer}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            {isLogin && (
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotButtonText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.text.light} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'LOGIN' : 'REGISTER'}
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.switchButton}
              onPress={() => {
                setIsLogin(!isLogin);
                setName('');
                setEmail('');
                setPassword('');
              }}
            >
              <Text style={styles.switchButtonText}>
                {isLogin 
                  ? "Don't have an account? Register" 
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
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
  backButton: {
    padding: spacing.md,
  },
  backButtonText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  logoText: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  formContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizes.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  submitButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  switchButton: {
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
  },
});

export default LoginScreen;
