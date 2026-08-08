
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SPACING, FONT } from "../constants/theme";
import { useTheme } from '../context/ThemeContext';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({
  title,
  subtitle,
  icon = "cube-outline",
}: EmptyStateProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: SPACING.xxl * 2,
          paddingHorizontal: SPACING.xl,
        },
        iconCircle: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.grayLight,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: SPACING.md,
        },
        title: {
          fontSize: FONT.h2,
          fontWeight: "600",
          color: colors.textPrimary,
          marginBottom: SPACING.xs,
          textAlign: "center",
        },
        subtitle: {
          fontSize: FONT.small,
          color: colors.textSecondary,
          textAlign: "center",
        },
      }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={28} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
