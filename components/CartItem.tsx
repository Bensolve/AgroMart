import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { CartItemType, useApp } from '../context/AppContext';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{item.product.image}</Text>
      <View style={styles.details}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>GH₵{item.product.price * item.quantity}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.btn} onPress={() => updateQuantity(item.product.id, item.quantity - 1)}>
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Pressable style={styles.btn} onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: 12, marginBottom: SPACING.sm, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  emoji: { fontSize: 28, marginRight: SPACING.md },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  price: { fontSize: 14, fontWeight: '600', color: COLORS.primary, marginTop: 2 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  btn: { backgroundColor: COLORS.border, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnText: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  qty: { marginHorizontal: SPACING.sm, fontSize: 15, fontWeight: '600' },
});