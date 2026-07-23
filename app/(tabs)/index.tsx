// app/index.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS, SPACING } from '@/constants/theme';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🧺' },
  { id: '1', name: 'Vegetables', icon: '🥬' },
  { id: '2', name: 'Fruits', icon: '🍎' },
  { id: '3', name: 'Grains', icon: '🌾' },
  { id: '4', name: 'Tubers', icon: '🥔' },
  { id: '5', name: 'Meat', icon: '🥩' },
  { id: '6', name: 'Fish', icon: '🐟' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { getCartCount } = useCart();

  // State hooks
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // 👈 Added missing state

  const cartItemsCount = getCartCount();

  // Derive filtered products combining activeCategory and searchQuery
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    // Check category match using activeCategory
    const matchesCategory =
      !activeCategory ||
      activeCategory === 'All' ||
      product.category.toLowerCase() === activeCategory.toLowerCase();

    // Check search text match (case-insensitive)
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER SECTION */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerSubtext}>📍 Accra, Ghana</Text>
            <Text style={styles.headerTitle}>Fresh food from farmers</Text>
          </View>
          
          <Pressable 
            style={styles.cartHeaderButton} 
            onPress={() => router.push('/cart' as any)}
          >
            <Text style={styles.cartHeaderIcon}>🛍️</Text>
            {cartItemsCount > 0 && (
              <View style={styles.badgeIndicatorBubble}>
                <Text style={styles.badgeCounterText}>{cartItemsCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* SEARCH BAR SECTION */}
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search vegetables, fruits..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery} // 👈 Bound value to state
            onChangeText={setSearchQuery} // 👈 Connected state updater
          />
        </View>

        {/* HORIZONTAL CATEGORIES SECTION */}
        <View style={styles.categoriesSection}>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
          >
            {CATEGORIES.map((category) => (
              <CategoryCard 
                key={category.id}
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.name}
                onPress={() => setActiveCategory(category.name)} 
              />
            ))}
          </ScrollView>
        </View>

        {/* VERTICAL PRODUCT LISTING SECTION */}
        <View style={styles.productsSection}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <View style={styles.emptySearchContainer}>
              <Text style={styles.emptySearchIcon}>🔍</Text>
              <Text style={styles.emptySearchTitle}>No products found</Text>
              <Text style={styles.emptySearchSubtitle}>
                Try checking for spelling errors or searching a different category.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  headerContainer: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 4,
  },
  cartHeaderButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartHeaderIcon: {
    fontSize: 20,
  },
  badgeIndicatorBubble: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeCounterText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  searchWrapper: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoriesSection: {
    marginVertical: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md, 
  },
  productsSection: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  emptySearchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  emptySearchIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptySearchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  emptySearchSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
});