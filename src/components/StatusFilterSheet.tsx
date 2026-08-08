
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RADIUS, SPACING, FONT } from "../constants/theme";
import { ShipmentStatus } from "../data/shipments";
import { STATUS_ORDER, STATUS_LABELS } from "../types/shipment";
import { useTheme } from '../context/ThemeContext';

export type StatusFilter = ShipmentStatus | "all";

interface StatusFilterSheetProps {
  visible: boolean;
  selected: StatusFilter;
  onSelect: (filter: StatusFilter) => void;
  onClose: () => void;
}

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...STATUS_ORDER.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  })),
];

export function StatusFilterSheet({
  visible,
  selected,
  onSelect,
  onClose,
}: StatusFilterSheetProps) {
  const { colors, statusColors } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: "flex-end",
        },
        sheet: {
          backgroundColor: colors.card,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          paddingHorizontal: SPACING.lg,
          paddingTop: SPACING.lg,
          paddingBottom: Math.max(insets.bottom, SPACING.lg),
        },
        sheetHeader: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: SPACING.lg,
        },
        sheetTitle: {
          fontSize: FONT.h2,
          fontWeight: "700",
          color: colors.textPrimary,
        },
        closeButton: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.grayLight,
          alignItems: "center",
          justifyContent: "center",
        },
        option: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.md,
          borderRadius: RADIUS.md,
          borderWidth: 1.5,
          borderColor: colors.border,
          marginBottom: SPACING.sm,
        },
        optionSelected: {
          borderColor: colors.brand,
          backgroundColor: colors.brandLight,
        },
        dot: {
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: SPACING.md,
        },
        optionLabel: {
          flex: 1,
          fontSize: FONT.body,
          fontWeight: "600",
          color: colors.textPrimary,
        },
      }),
    [colors, insets.bottom],
  );

  function getDotColor(value: StatusFilter) {
    if (value === "all") return colors.gray;
    return statusColors[value].dot;
  }

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filter Shipments</Text>
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close filter"
            >
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </Pressable>
          </View>

          {FILTER_OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            return (
              <Pressable
                key={option.value}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`Filter by ${option.label}`}
              >
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: getDotColor(option.value) },
                  ]}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
                {isSelected ? (
                  <Ionicons name="checkmark" size={20} color={colors.brand} />
                ) : null}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
