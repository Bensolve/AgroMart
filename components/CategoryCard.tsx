// components/CategoryCard.tsx
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';

// 1. Add 'icon: string;' right here so TypeScript approves it!
interface Props {
  name: string;
  icon: string; 
  isActive: boolean;
  onPress: () => void;
}

// 2. Destructure 'icon' here along with the other props
export default function CategoryCard({ name, icon, isActive, onPress }: Props) {
  return (
    <Pressable 
      onPress={onPress}
      style={[
        styles.card,
        isActive && styles.cardActive
      ]}
    >
      {/* 3. Render the emoji icon next to the text */}
      <Text style={styles.icon}>{icon}</Text>
      <Text 
        style={[
          styles.name,
          isActive && styles.nameActive
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  icon: {
    fontSize: 16,
    marginRight: 6, // Gives a little breathing room between emoji and text
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  nameActive: {
    color: COLORS.white,
  },
});