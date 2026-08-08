import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shipment } from '../types/shipment';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { FONT, RADIUS, SPACING } from '../constants/theme';

interface ShipmentCardProps {
  shipment: Shipment;
  isPinned: boolean;
  onPress: () => void;
  onTogglePin: () => void;
}

export function ShipmentCard({ shipment, isPinned, onPress, onTogglePin }: ShipmentCardProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.card,
          borderRadius: RADIUS.md,
          padding: SPACING.lg,
          marginBottom: SPACING.md,
          borderWidth: 1,
          borderColor: colors.border,
        },
        cardPressed: {
          opacity: 0.7,
        },
        topRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: SPACING.md,
        },
        trackingRow: {
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 1,
          marginRight: SPACING.sm,
        },
        tracking: {
          fontSize: FONT.body,
          fontWeight: '700',
          color: colors.textPrimary,
          flexShrink: 1,
        },
        pinButton: {
          marginLeft: SPACING.sm,
        },
        routeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SPACING.md,
        },
        routePoint: {
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 1,
        },
        dot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginRight: SPACING.xs,
        },
        dotOutline: {
          backgroundColor: colors.card,
          borderWidth: 2,
          borderColor: colors.success,
        },
        routeLine: {
          flex: 1,
          height: 1,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: colors.border,
          marginHorizontal: SPACING.sm,
        },
        cityText: {
          fontSize: FONT.small,
          color: colors.textSecondary,
          flexShrink: 1,
        },
        bottomRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        metaText: {
          fontSize: FONT.small,
          color: colors.textSecondary,
          marginRight: SPACING.md,
        },
        serviceTag: {
          backgroundColor: colors.grayLight,
          borderRadius: RADIUS.sm,
          paddingHorizontal: SPACING.sm,
          paddingVertical: 3,
        },
        serviceText: {
          fontSize: FONT.tiny,
          color: colors.textSecondary,
          fontWeight: '600',
        },
        chevronSpacer: {
          flex: 1,
        },
      }),
    [colors]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Shipment ${shipment.tracking}, ${shipment.status.replace('_', ' ')}`}
    >
      <View style={styles.topRow}>
        <View style={styles.trackingRow}>
          <Text style={styles.tracking} numberOfLines={1}>
            {shipment.tracking}
          </Text>
          <Pressable
            hitSlop={10}
            onPress={onTogglePin}
            accessibilityRole="button"
            accessibilityLabel={isPinned ? 'Unpin shipment' : 'Pin shipment'}
            style={styles.pinButton}
          >
            <Ionicons
              name={isPinned ? 'star' : 'star-outline'}
              size={18}
              color={isPinned ? colors.brand : colors.textMuted}
            />
          </Pressable>
        </View>
        <StatusBadge status={shipment.status} />
      </View>

      <View style={styles.routeRow}>
        <View style={styles.routePoint}>
          <View style={[styles.dot, { backgroundColor: colors.brand }]} />
          <Text style={styles.cityText} numberOfLines={1}>
            {shipment.sender.city}
          </Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.dot, styles.dotOutline]} />
          <Text style={styles.cityText} numberOfLines={1}>
            {shipment.recipient.city}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.metaText}>{shipment.weightKg.toFixed(1)} kg</Text>
        <View style={styles.serviceTag}>
          <Text style={styles.serviceText}>{shipment.service}</Text>
        </View>
        <View style={styles.chevronSpacer} />
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}
