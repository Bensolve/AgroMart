import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/constants/theme';
import { useApp, MOCK_PRODUCTS } from '@/context/AppContext';

// Import Reusable Elements
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import CartItem from '@/components/CartItem';

export default function CoreEngine() {
  const { currentScreen, setScreen, selectedProduct, cart, addToCart } = useApp();
  
  // UI States for Filtering
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [detailQty, setDetailQty] = useState(1);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Tubers'];

  // Total Calculations
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Filtered Products Computed on the fly
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === 'All' || p.category === activeCat;
    return matchesSearch && matchesCat;
  });

  // ==========================================
  // VIEW RENDER 1: HOME SCREEN
  // ==========================================
  if (currentScreen === 'home') {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Header />
        <SearchBar value={search} onChangeText={setSearch} />
        
        {/* Horizontal Category Scroller */}
        <View style={styles.catWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: SPACING.md }}>
            {categories.map(cat => (
              <CategoryCard key={cat} name={cat} isActive={activeCat === cat} onPress={() => setActiveCat(cat)} />
            ))}
          </ScrollView>
        </View>

        {/* Product List Feed */}
        <ScrollView style={styles.scrollFeed} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.sectionTitle}>Available Fresh Produce</Text>
          {filteredProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VIEW RENDER 2: PRODUCT DETAILS
  // ==========================================
  if (currentScreen === 'details' && selectedProduct) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.navBar}>
          <Pressable onPress={() => { setScreen('home'); setDetailQty(1); }}>
            <Text style={styles.backLink}>← Back to Market</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.detailBody}>
          <View style={styles.hugePreview}>
            <Text style={styles.hugeEmoji}>{selectedProduct.image}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailName}>{selectedProduct.name}</Text>
            <Text style={styles.detailFarmer}>Harvested by: {selectedProduct.farmer}</Text>
            <Text style={styles.detailPrice}>GH₵{selectedProduct.price} / unit</Text>

            <Text style={styles.description}>
              Grown locally using pure organic techniques. Straight from farmland soil directly to your location context in Accra. Freshness guaranteed.
            </Text>

            {/* Quantity Counter Switch */}
            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Select Quantity:</Text>
              <View style={styles.counterBox}>
                <Pressable style={styles.countBtn} onPress={() => setDetailQty(Math.max(1, detailQty - 1))}>
                  <Text style={styles.countText}>-</Text>
                </Pressable>
                <Text style={styles.countNumber}>{detailQty}</Text>
                <Pressable style={styles.countBtn} onPress={() => setDetailQty(detailQty + 1)}>
                  <Text style={styles.countText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Interactive Trigger Area */}
        <View style={styles.actionFooter}>
          <Pressable style={styles.submitBtn} onPress={() => { addToCart(selectedProduct, detailQty); setScreen('home'); setDetailQty(1); }}>
            <Text style={styles.submitBtnText}>Add To Cart • GH₵{selectedProduct.price * detailQty}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VIEW RENDER 3: CART VIEW
  // ==========================================
  if (currentScreen === 'cart') {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.navBar}>
          <Pressable onPress={() => setScreen('home')}>
            <Text style={styles.backLink}>← Continue Shopping</Text>
          </Pressable>
          <Text style={styles.screenHeading}>Your Basket</Text>
        </View>

        <ScrollView style={styles.cartBody} contentContainerStyle={{ paddingBottom: 20 }}>
          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Basket is completely empty 🧺</Text>
            </View>
          ) : (
            cart.map(item => <CartItem key={item.product.id} item={item} />)
          )}
        </ScrollView>

        {/* Totals Summary block layout execution */}
        <View style={styles.checkoutFooter}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>GH₵{cartTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery (Accra Central)</Text>
            <Text style={styles.billValue}>{cartTotal > 0 ? 'GH₵15' : 'GH₵0'}</Text>
          </View>
          <View style={[styles.billRow, { borderTopWidth: 1, borderColor: COLORS.border, paddingTop: SPACING.sm }]}>
            <Text style={styles.totalLabel}>Total Due</Text>
            <Text style={styles.totalValue}>GH₵{cartTotal > 0 ? cartTotal + 15 : 0}</Text>
          </View>

          <Pressable 
            style={[styles.checkoutBtn, cart.length === 0 && { backgroundColor: COLORS.textLight }]} 
            disabled={cart.length === 0}
            onPress={() => alert('Demo Order Dispatched to Farmers! 🚜🌾')}
          >
            <Text style={styles.checkoutText}>Proceed to Delivery Checkout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: COLORS.background },
  catWrapper: { marginVertical: SPACING.sm },
  scrollFeed: { flex: 1, paddingHorizontal: SPACING.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: SPACING.sm },
  navBar: { padding: SPACING.md, backgroundColor: COLORS.white, borderBottomWidth: 1, borderColor: COLORS.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backLink: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  screenHeading: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  detailBody: { flex: 1 },
  hugePreview: { height: 200, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  hugeEmoji: { fontSize: 84 },
  detailCard: { padding: SPACING.md, backgroundColor: COLORS.white, margin: SPACING.md, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  detailName: { fontSize: 24, fontWeight: '700', color: COLORS.textDark },
  detailFarmer: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  detailPrice: { fontSize: 20, fontWeight: '700', color: COLORS.primary, marginVertical: SPACING.sm },
  description: { fontSize: 14, color: COLORS.textDark, lineHeight: 20, marginBottom: SPACING.md },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: COLORS.border, paddingTop: SPACING.md },
  qtyLabel: { fontSize: 15, fontWeight: '600', color: COLORS.textDark },
  counterBox: { flexDirection: 'row', alignItems: 'center' },
  countBtn: { width: 32, height: 32, backgroundColor: COLORS.border, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  countText: { fontSize: 18, fontWeight: '700' },
  countNumber: { marginHorizontal: SPACING.md, fontSize: 16, fontWeight: '700' },
  actionFooter: { padding: SPACING.md, backgroundColor: COLORS.white, borderTopWidth: 1, borderColor: COLORS.border },
  submitBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  submitBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  cartBody: { flex: 1, padding: SPACING.md },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: COLORS.textLight, fontSize: 16 },
  checkoutFooter: { padding: SPACING.md, backgroundColor: COLORS.white, borderTopWidth: 1, borderColor: COLORS.border },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  billLabel: { color: COLORS.textLight, fontSize: 14 },
  billValue: { color: COLORS.textDark, fontSize: 14, fontWeight: '600' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  totalValue: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  checkoutBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: SPACING.md },
  checkoutText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});