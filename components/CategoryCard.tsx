import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface Props {
  name: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryCard({ name, isActive, onPress }: Props) {
  return (
    <Pressable style={[styles.badge, isActive && styles.badgeActive]} onPress={onPress}>
      <Text style={[styles.text, isActive && styles.textActive]}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: 20, marginRight: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  badgeActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { color: COLORS.textLight, fontWeight: '600', fontSize: 14 },
  textActive: { color: COLORS.white },
});