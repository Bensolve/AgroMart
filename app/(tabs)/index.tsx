// app/index.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '@/constants/theme';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/data/products';

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
  // Use 'All' as the base default state layout configuration
  const [activeCategory, setActiveCategory] = useState('All');

  // Simple clean filtering logic computed inline during layout cycles
  const filteredProducts = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER SECTION */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerSubtext}>📍 Accra, Ghana</Text>
          <Text style={styles.headerTitle}>Fresh food from farmers</Text>
        </View>

        {/* SEARCH BAR SECTION */}
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search vegetables, fruits..."
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* HORIZONTAL CATEGORIES SCROLL SECTION */}
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
          <Text style={styles.sectionTitle}>
            {activeCategory} Selection ({filteredProducts.length})
          </Text>
          
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No farm products are available in this section today.</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});