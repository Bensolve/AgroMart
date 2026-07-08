import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search vegetables, fruits..."
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: SPACING.md, marginVertical: SPACING.sm },
  input: { backgroundColor: COLORS.white, paddingVertical: 12, paddingHorizontal: SPACING.md, borderRadius: 12, fontSize: 16, color: COLORS.textDark, borderWidth: 1, borderColor: COLORS.border },
});