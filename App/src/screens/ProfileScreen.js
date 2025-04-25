import React, { useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';
import { Ionicons } from '@expo/vector-icons';
import API_CONFIG from '../config/apiConfig';

const ProfileScreen = () => {
  const { token, logout, userData, backendUrl } = useContext(ShopContext);
  const navigation = useNavigation();

  // Debug log to check token and userData
  useEffect(() => {
    console.log('Profile Screen - Token exists:', !!token);
    console.log('Profile Screen - User data:', userData);
  }, [token, userData]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  // If there's no token, show login screen
  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>Please login to view your profile</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.headerLogoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.headerLogoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userData?.name ? userData.name.charAt(0).toUpperCase() : '?'}</Text>
          </View>
          <Text style={styles.userName}>{userData?.name || 'User'}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Account Details</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="bag-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>My Orders</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Shipping Addresses</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.danger} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  headerLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  headerLogoutText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSizes.sm,
    color: colors.danger,
    fontWeight: 'bold',
  },
  profileContainer: {
    flex: 1,
    padding: spacing.md,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  userName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  sectionContainer: {
    backgroundColor: colors.card,
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.danger,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.danger,
    marginTop: spacing.lg,
  },
  logoutButtonText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text.light,
    fontWeight: 'bold',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  notLoggedInText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
