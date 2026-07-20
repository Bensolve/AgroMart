// app/cart.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS, SPACING } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

// Target phone number for the business (Ghana country code +233 as example)
const WHATSAPP_NUMBER = '+233500000000'; 
const DELIVERY_FEE = 20; // Fixed flat delivery rate for mock purposes

export default function CartScreen() {
  const router = useRouter();
  // Removed unused getCartCount to satisfy ESLint rule
  const { cartItems, clearCart } = useCart(); 

  // 1. Calculate Financial Summaries using item.product.price
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const grandTotal = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  // 2. WhatsApp Message Generator & Link Dispatcher
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Basket', 'Please add items to your basket before checking out.');
      return;
    }

    // Format individual product rows using item.product properties
    const itemsSummary = cartItems
      .map((item) => `• ${item.product.name} (${item.quantity}x) - GH₵${item.product.price * item.quantity}`)
      .join('\n');

    // Compose string template exactly matching business specifications
    const textMessage = 
`Hello AgroMart,
I would like to order:
${itemsSummary}

Subtotal: GH₵${subtotal}
Delivery Fee: GH₵${DELIVERY_FEE}
Grand Total: GH₵${grandTotal}

Delivery Address: 

Thank you.`;

    // Construct deep-link API URI strings
    const whatsappUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(textMessage)}`;
    const webFallbackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textMessage)}`;

    try {
      // Validate device support for native application schema protocols
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        clearCart(); // Safely empty cart workspace locally once handoff completes
      } else {
        // Fallback to web browser implementation if application client is missing
        await Linking.openURL(webFallbackUrl);
      }
    } catch (error) {
      // Log error to satisfy ESLint no-unused-vars rule
      console.error('Failed to open link:', error);
      Alert.alert(
        'Connection Error',
        'Could not open WhatsApp. Please check if the app is installed on your device.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header bar */}
      <View style={styles.headerNav}>
        <Pressable style={styles.iconCircleButton} onPress={() => router.back()}>
          <Text style={styles.navIconText}>⬅️</Text>
        </Pressable>
        <Text style={styles.headerNavTitle}>My Basket</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Cart Items Scroll Workspace */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {cartItems.length > 0 ? (
          <View style={styles.itemsWrapper}>
            {cartItems.map((item) => (
              <View key={item.product.id} style={styles.cartItemCard}>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemNameText}>{item.product.name}</Text>
                  <Text style={styles.itemQuantifier}>
                    {item.quantity} x GH₵{item.product.price}
                  </Text>
                </View>
                <Text style={styles.itemTotalLine}>GH₵{item.product.price * item.quantity}</Text>
              </View>
            ))}

            {/* Price Calculations Breakdown Box */}
            <View style={styles.summaryCardBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>GH₵{subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>GH₵{DELIVERY_FEE}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>GH₵{grandTotal}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🧺</Text>
            <Text style={styles.emptyText}>Your basket is looking empty today.</Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Actions Trigger Section */}
      {cartItems.length > 0 && (
        <View style={styles.stickyFooterContainer}>
          <Pressable style={styles.primaryOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.primaryButtonText}>Place Order via WhatsApp</Text>
            <Text style={styles.whatsappIconCarrier}>💬</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    paddingBottom: 120,
  },
  itemsWrapper: {
    padding: SPACING.md,
  },
  cartItemCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemMeta: {
    flex: 1,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  itemQuantifier: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  itemTotalLine: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  summaryCardBox: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 14,
    marginTop: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  stickyFooterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  primaryOrderButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  whatsappIconCarrier: {
    fontSize: 18,
  },
});