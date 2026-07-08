import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { setScreen, cart } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.location}>📍 Accra, Ghana</Text>
        <Text style={styles.greeting}>Fresh food from farmers</Text>
      </View>
      <Pressable style={styles.cartButton} onPress={() => setScreen('cart')}>
        <Text style={styles.cartIcon}>🛒</Text>
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, backgroundColor: COLORS.white, borderBottomWidth: 1, borderColor: COLORS.border },
  location: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  greeting: { fontSize: 18, fontWeight: '700', color: COLORS.textDark, marginTop: 2 },
  cartButton: { padding: SPACING.sm, position: 'relative' },
  cartIcon: { fontSize: 24 },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: COLORS.accent, borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
});