import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShipmentStatus, STATUS_LABELS } from '../types/shipment';
import { useTheme } from '../context/ThemeContext';
import { FONT, RADIUS, SPACING } from '../constants/theme';

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const { statusColors } = useTheme();
  const palette = statusColors[status];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        badge: {
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.xs,
          borderRadius: RADIUS.pill,
          alignSelf: 'flex-start',
        },
        badgeSmall: {
          paddingHorizontal: SPACING.sm,
          paddingVertical: 3,
        },
        text: {
          fontSize: FONT.small,
          fontWeight: '600',
        },
        textSmall: {
          fontSize: FONT.tiny,
        },
      }),
    []
  );

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: palette.bg },
        size === 'small' && styles.badgeSmall,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${STATUS_LABELS[status]}`}
    >
      <Text
        style={[styles.text, { color: palette.text }, size === 'small' && styles.textSmall]}
        numberOfLines={1}
      >
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}
