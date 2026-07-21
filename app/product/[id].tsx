// app/product/[id].tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; // 👈 Added useSafeAreaInsets
import { COLORS, SPACING } from '@/constants/theme';
import { MOCK_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const insets = useSafeAreaInsets(); // 👈 Detects phone's bottom navigation bar height

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Product details could not be found.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Dynamic Header Component */}
      <View style={styles.headerNav}>
        <Pressable style={styles.iconCircleButton} onPress={() => router.back()}>
          <Text style={styles.navIconText}>⬅️</Text>
        </Pressable>
        <Text style={styles.headerNavTitle}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.heroImage} resizeMode="cover" />

        <View style={styles.detailsContentBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.categoryBadge}>{product.category}</Text>
            <Text style={styles.ratingBadge}>⭐ {product.rating}</Text>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.farmerName}>Grown locally by {product.farmer}</Text>
          <Text style={styles.priceLabel}>GH₵{product.price} <Text style={styles.unitText}>/ per unit</Text></Text>

          <View style={styles.divider} />

          <Text style={styles.descriptionHeader}>Product Overview</Text>
          <Text style={styles.descriptionBody}>
            Enjoy fresh, sustainably sourced organic {product.name.toLowerCase()} direct from local Ghanaian family farmlands. Hand-picked at peak maturation phases to guarantee rich nutritional payload capacities and unmatched baseline kitchen shelf freshness.
          </Text>

          <View style={styles.divider} />

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabelTitle}>Select Quantity</Text>
            <View style={styles.counterContainerRow}>
              <Pressable style={styles.counterControlAction} onPress={handleDecrement}>
                <Text style={styles.counterActionSymbol}>-</Text>
              </Pressable>
              <Text style={styles.counterQuantityDisplayText}>{quantity}</Text>
              <Pressable style={styles.counterControlAction} onPress={handleIncrement}>
                <Text style={styles.counterActionSymbol}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer with dynamic bottom padding */}
      <View style={[styles.stickyFooterContainer, { paddingBottom: Math.max(insets.bottom, SPACING.md) }]}>
        <Pressable style={styles.primaryCartSubmitButton} onPress={handleAddToCart}>
          <Text style={styles.primaryCartButtonText}>
            Add to Basket • GH₵{product.price * quantity}
          </Text>
          <Text style={styles.basketIconCarrier}>🛍️</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconText: {
    fontSize: 18,
  },
  headerNavTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  scrollContainer: {
    paddingBottom: SPACING.md,
  },
  heroImage: {
    width: '100%',
    height: 280,
    backgroundColor: COLORS.background,
  },
  detailsContentBox: {
    padding: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  ratingBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  productName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  farmerName: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  descriptionBody: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  quantityLabelTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  counterContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 4,
  },
  counterControlAction: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  counterActionSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  counterQuantityDisplayText: {
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  stickyFooterContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  primaryCartSubmitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  },
  primaryCartButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  basketIconCarrier: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});