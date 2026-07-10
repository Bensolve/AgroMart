// components/ProductCard.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  
  const handleAddPress = () => {
    console.log(`[AgroMart MVP] Console Log: Pressed Add for "${product.name}"`);
  };

  return (
    <View style={styles.card}>
      {/* Remote Image Component with standard fallback color background */}
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      {/* Core details layout container */}
      <View style={styles.detailsContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
        </View>
        
        <Text style={styles.farmer}>By {product.farmer}</Text>
        
        <View style={styles.footerRow}>
          <Text style={styles.price}>GH₵{product.price}</Text>
          
          <Pressable 
            onPress={handleAddPress}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed
            ]}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
    marginRight: SPACING.xs,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  farmer: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
    marginBottom: SPACING.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});