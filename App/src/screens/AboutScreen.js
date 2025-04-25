import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../utils/styles';
import { assets } from '../assets/assets';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>ABOUT US</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={assets.aboutImage || { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>OUR STORY</Text>
          <Text style={styles.paragraph}>
            Forever was founded in 2020 with a simple mission: to provide high-quality, 
            sustainable fashion that stands the test of time. What began as a small 
            passion project has grown into a beloved brand known for its commitment 
            to quality, sustainability, and timeless style.
          </Text>
          <Text style={styles.paragraph}>
            Our journey started when our founder, Sarah Johnson, noticed a gap in the 
            market for clothing that was both stylish and durable. Tired of the 
            fast-fashion cycle that led to poorly made garments ending up in landfills 
            after just a few wears, Sarah envisioned a brand that would create pieces 
            designed to last - both in terms of quality and style.
          </Text>
          
          <Text style={styles.sectionTitle}>OUR VISION</Text>
          <Text style={styles.paragraph}>
            At Forever, we believe that fashion should be sustainable, ethical, and 
            accessible. We're committed to creating timeless pieces that transcend 
            seasonal trends, allowing our customers to build a wardrobe of high-quality 
            essentials that will serve them for years to come.
          </Text>
          <Text style={styles.paragraph}>
            We envision a world where conscious consumption is the norm, not the exception. 
            Where people invest in fewer, better things and develop a deeper connection 
            with the items they choose to bring into their lives.
          </Text>
          
          <View style={styles.valuesContainer}>
            <Text style={styles.sectionTitle}>OUR VALUES</Text>
            
            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Ionicons name="leaf-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Sustainability</Text>
                <Text style={styles.valueText}>
                  We use eco-friendly materials and ethical manufacturing processes 
                  to minimize our environmental footprint.
                </Text>
              </View>
            </View>
            
            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Ionicons name="people-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Ethical Production</Text>
                <Text style={styles.valueText}>
                  We ensure fair wages and safe working conditions for everyone 
                  involved in making our products.
                </Text>
              </View>
            </View>
            
            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Ionicons name="ribbon-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Quality</Text>
                <Text style={styles.valueText}>
                  We never compromise on quality, using premium materials and 
                  expert craftsmanship for products that last.
                </Text>
              </View>
            </View>
            
            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Ionicons name="heart-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Community</Text>
                <Text style={styles.valueText}>
                  We believe in building a community of like-minded individuals 
                  who share our values and vision.
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>OUR COMMITMENT</Text>
          <Text style={styles.paragraph}>
            We're committed to continuous improvement. Every year, we set new goals 
            to reduce our environmental impact, improve our supply chain transparency, 
            and give back to the communities that support us.
          </Text>
          <Text style={styles.paragraph}>
            Thank you for being part of our journey. Together, we can create a more 
            sustainable and ethical fashion industry.
          </Text>
          
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamButtonText}>MEET OUR TEAM</Text>
          </TouchableOpacity>
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
  imageContainer: {
    marginBottom: spacing.lg,
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: typography.fontSizes.md,
    lineHeight: 24,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  valuesContainer: {
    marginTop: spacing.md,
  },
  valueItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  valueIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  valueText: {
    fontSize: typography.fontSizes.sm,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  teamButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: spacing.lg,
  },
  teamButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
});

export default AboutScreen;
