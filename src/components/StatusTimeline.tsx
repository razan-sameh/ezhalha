import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ShipmentStatus, STATUS_DESCRIPTIONS, STATUS_LABELS, STATUS_ORDER } from '../types/shipment';
import { COLORS, FONT, SPACING } from '../constants/theme';

interface StatusTimelineProps {
  currentStatus: ShipmentStatus;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <View>
      {STATUS_ORDER.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === STATUS_ORDER.length - 1;
        const isDone = isCompleted || isCurrent;

        return (
          <View key={status} style={styles.row}>
            <View style={styles.markerColumn}>
              <View
                style={[
                  styles.dot,
                  isDone && { backgroundColor: COLORS.brand },
                  isCurrent && styles.dotCurrent,
                ]}
              >
                {isCompleted && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
              </View>
              {!isLast && (
                <View style={[styles.connector, isCompleted && { backgroundColor: COLORS.brand }]} />
              )}
            </View>
            <View style={[styles.textColumn, !isLast && styles.textColumnSpacing]}>
              <Text style={[styles.label, isDone ? styles.labelActive : styles.labelInactive]}>
                {STATUS_LABELS[status]}
              </Text>
              <Text style={styles.description}>{STATUS_DESCRIPTIONS[status]}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  markerColumn: {
    alignItems: 'center',
    width: 24,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCurrent: {
    borderWidth: 3,
    borderColor: COLORS.brandLight,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: COLORS.border,
  },
  textColumn: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  textColumnSpacing: {
    paddingBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  labelActive: {
    color: COLORS.textPrimary,
  },
  labelInactive: {
    color: COLORS.textMuted,
  },
  description: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
  },
});
