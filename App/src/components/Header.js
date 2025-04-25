import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ShopContext } from '../context/ShopContext';
import { colors, spacing, typography } from '../utils/styles';

const Header = ({ title, showBack = false, showSearch = false, showProfile = true }) => {
  const navigation = useNavigation();
  const { token } = useContext(ShopContext);

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {showSearch && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => {/* Toggle search */}}
          >
            <Ionicons name="search" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        
        {showProfile && (
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => {
              if (token) {
                navigation.navigate('Profile');
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            {token ? (
              <View style={styles.profileIconLoggedIn}>
                <Ionicons name="person" size={18} color={colors.text.light} />
              </View>
            ) : (
              <Ionicons name="person-outline" size={24} color={colors.text.primary} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  iconButton: {
    marginLeft: spacing.md,
  },
  profileButton: {
    marginLeft: spacing.md,
  },
  profileIconLoggedIn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
