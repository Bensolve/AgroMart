import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { Product, useApp } from '../context/AppContext';

export default function ProductCard({ product }: { product: Product }) {
  const { setScreen, setSelectedProduct, addToCart } = useApp();

  const handleCardPress = () => {
    setSelectedProduct(product);
    setScreen('details');
  };

  return (
    <Pressable style={styles.card} onPress={handleCardPress}>
      <View style={styles.imageBox}>
        <Text style={styles.emoji}>{product.image}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.farmer}>By {product.farmer}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>GH₵{product.price}</Text>
          <Pressable style={styles.addBtn} onPress={(e) => { e.stopPropagation(); addToCart(product, 1); }}>
            <Text style={styles.addText}>+ Add</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.white, padding: SPACING.sm, borderRadius: 16, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  imageBox: { width: 70, height: 70, backgroundColor: '#E8F5E9', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 32 },
  info: { flex: 1, marginLeft: SPACING.md },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  farmer: { fontSize: 12, color: COLORS.textLight, marginVertical: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  addBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
});