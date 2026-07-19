// app/cart.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const grandTotal = getCartTotal();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top toolbar navigation row block */}
      <View style={styles.headerNav}>
        <Pressable style={styles.iconCircleButton} onPress={() => router.back()}>
          <Text style={styles.navIconText}>⬅️</Text>
        </Pressable>
        <Text style={styles.headerNavTitle}>Shopping Basket</Text>
        <View style={{ width: 40 }} />
      </View>

      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {cartItems.map((item) => (
              <View key={item.product.id} style={styles.itemCardRow}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                
                <View style={styles.itemDetailsCol}>
                  <View style={styles.itemHeaderTitleLine}>
                    <Text style={styles.itemNameText} numberOfLines={1}>{item.product.name}</Text>
                    <Pressable onPress={() => removeFromCart(item.product.id)} style={styles.trashPadding}>
                      <Text style={styles.trashIconText}>🗑️</Text>
                    </Pressable>
                  </View>
                  
                  <Text style={styles.itemFarmerTag}>By {item.product.farmer}</Text>
                  
                  <View style={styles.itemQuantityControlLine}>
                    <Text style={styles.itemPriceCalculation}>
                      GH₵{item.product.price} × {item.quantity}
                    </Text>
                    
                    {/* Inline Counter Increment Adjusters row */}
                    <View style={styles.counterInlineRow}>
                      <Pressable 
                        style={styles.counterMiniBtn} 
                        onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Text style={styles.counterMiniSign}>-</Text>
                      </Pressable>
                      <Text style={styles.counterMiniVal}>{item.quantity}</Text>
                      <Pressable 
                        style={styles.counterMiniBtn} 
                        onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Text style={styles.counterMiniSign}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pricing Aggregations Summary layout pane */}
          <View style={styles.summaryStickyBox}>
            <View style={styles.summaryLabelRow}>
              <Text style={styles.summaryLabelText}>Basket Subtotal</Text>
              <Text style={styles.summaryValText}>GH₵{grandTotal}</Text>
            </View>
            <View style={styles.summaryLabelRow}>
              <Text style={styles.summaryLabelText}>Delivery Logistics</Text>
              <Text style={styles.summaryValGreenText}>FREE</Text>
            </View>
            
            <View style={styles.summaryDividerLine} />
            
            <View style={styles.summaryLabelRow}>
              <Text style={styles.grandTotalLabelText}>Grand Total</Text>
              <Text style={styles.grandTotalValText}>GH₵{grandTotal}</Text>
            </View>

            <Pressable 
              style={styles.checkoutActionBtn}
              onPress={() => alert('Order generated! Thank you for supporting local Ghanaian farmers.')}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Secure Checkout</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainerState}>
          <Text style={styles.emptyBasketGraphicText}>🛒</Text>
          <Text style={styles.emptyHeadingMessage}>Your basket is empty</Text>
          <Text style={styles.emptySubMessage}>Explore our organic catalog to select fresh items directly from local family farmlands.</Text>
          <Pressable style={styles.shopRedirectBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.shopRedirectBtnText}>Start Shopping</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
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
  listContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  itemCardRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  itemDetailsCol: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  itemHeaderTitleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
  },
  trashPadding: {
    paddingLeft: SPACING.sm,
    paddingVertical: 2,
  },
  trashIconText: {
    fontSize: 16,
  },
  itemFarmerTag: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  itemQuantityControlLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  itemPriceCalculation: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  counterInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 2,
  },
  counterMiniBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  counterMiniSign: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  counterMiniVal: {
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  summaryStickyBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabelText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  summaryValText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  summaryValGreenText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  summaryDividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  grandTotalLabelText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  grandTotalValText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  checkoutActionBtn: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: SPACING.md,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  emptyContainerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyBasketGraphicText: {
    fontSize: 64,
    marginBottom: SPACING.sm,
  },
  emptyHeadingMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  emptySubMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  shopRedirectBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopRedirectBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});