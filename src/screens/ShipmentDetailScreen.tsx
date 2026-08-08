import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { useShipments } from "../context/ShipmentsContext";
import { usePinnedShipments } from "../hooks/usePinnedShipments";
import { useTheme } from "../context/ThemeContext";
import { StatusTimeline } from "../components/StatusTimeline";
import { EmptyState } from "../components/EmptyState";
import { STATUS_LABELS } from "../types/shipment";
import { AppColors, FONT, RADIUS, SPACING } from "../constants/theme";
type Props = NativeStackScreenProps<RootStackParamList, "ShipmentDetail">;

export function ShipmentDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const { getShipmentById } = useShipments();
  const { isPinned, togglePin } = usePinnedShipments();
  const { colors, statusColors } = useTheme();

  const shipment = getShipmentById(id);

  const styles = createStyles(colors);

  if (!shipment) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Header
          title="Shipment Details"
          onBack={() => navigation.goBack()}
          colors={colors}
        />

        <EmptyState
          icon="alert-circle-outline"
          title="Shipment not found"
          subtitle="This shipment may no longer exist."
        />
      </SafeAreaView>
    );
  }

  const palette = statusColors[shipment.status];
  const pinned = isPinned(shipment.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Header
        title={shipment.tracking}
        eyebrow="SHIPMENT DETAILS"
        onBack={() => navigation.goBack()}
        colors={colors}
        right={
          <Pressable
            hitSlop={10}
            onPress={() => togglePin(shipment.id)}
            accessibilityRole="button"
            accessibilityLabel={pinned ? "Unpin shipment" : "Pin shipment"}
          >
            <Ionicons
              name={pinned ? "star" : "star-outline"}
              size={22}
              color={pinned ? colors.brand : colors.textMuted}
            />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Status */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: palette.bg,
            },
          ]}
        >
          <Text
            style={[
              styles.heroLabel,
              {
                color: palette.text,
              },
            ]}
          >
            CURRENT STATUS
          </Text>

          <Text
            style={[
              styles.heroStatus,
              {
                color: palette.text,
              },
            ]}
          >
            {STATUS_LABELS[shipment.status]}
          </Text>
        </View>

        {/* Shipment Info */}
        <SectionCard title="Shipment Info" styles={styles}>
          <InfoRow
            label="Sender"
            value={shipment.sender.name}
            styles={styles}
          />

          <InfoRow
            label="Recipient"
            value={shipment.recipient.name}
            styles={styles}
          />

          <InfoRow
            label="Weight"
            value={`${shipment.weightKg.toFixed(1)} kg`}
            styles={styles}
          />

          <InfoRow
            label="Service"
            value={shipment.service}
            last
            styles={styles}
          />
        </SectionCard>

        {/* Route */}
        <SectionCard title="Route" styles={styles}>
          <View style={styles.routeRow}>
            <View style={styles.routePoint}>
              <View style={[styles.dot, { backgroundColor: colors.brand }]} />

              <Text style={styles.cityText}>{shipment.sender.city}</Text>
            </View>

            <View style={styles.routeLine} />

            <Ionicons name="cube" size={16} color={colors.textMuted} />

            <View style={styles.routeLine} />

            <View style={styles.routePoint}>
              <View style={styles.dotOutline} />

              <Text style={styles.cityText}>{shipment.recipient.city}</Text>
            </View>
          </View>
        </SectionCard>

        {/* Timeline */}
        <SectionCard title="Tracking Timeline" styles={styles}>
          <StatusTimeline currentStatus={shipment.status} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({
  title,
  eyebrow,
  onBack,
  right,
  colors,
}: {
  title: string;
  eyebrow?: string;
  onBack: () => void;
  right?: React.ReactNode;
  colors: AppColors;
}) {
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.headerTextWrap}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}

        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.headerRight}>{right}</View>
    </View>
  );
}

function SectionCard({
  title,
  children,
  styles,
}: {
  title: string;
  children: React.ReactNode;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>

      {children}
    </View>
  );
}

function InfoRow({
  label,
  value,
  last,
  styles,
}: {
  label: string;
  value: string;
  last?: boolean;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowDivider]}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function createStyles(
  colors: AppColors,
) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
    },

    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },

    headerTextWrap: {
      flex: 1,
      marginLeft: SPACING.md,
    },

    eyebrow: {
      fontSize: FONT.tiny,
      fontWeight: "700",
      color: colors.brand,
      letterSpacing: 0.5,
    },

    headerTitle: {
      fontSize: FONT.h2,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    headerRight: {
      minWidth: 22,
      alignItems: "flex-end",
    },

    content: {
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.xxl * 2,
    },

    heroCard: {
      borderRadius: RADIUS.lg,
      padding: SPACING.xl,
      marginBottom: SPACING.lg,
    },

    heroLabel: {
      fontSize: FONT.tiny,
      fontWeight: "700",
      letterSpacing: 0.5,
      marginBottom: SPACING.xs,
    },

    heroStatus: {
      fontSize: FONT.h1,
      fontWeight: "700",
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: RADIUS.md,
      padding: SPACING.lg,
      marginBottom: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },

    cardTitle: {
      fontSize: FONT.small,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 0.5,
      marginBottom: SPACING.md,
      textTransform: "uppercase",
    },

    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: SPACING.sm,
    },

    infoRowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    infoLabel: {
      fontSize: FONT.body,
      color: colors.textSecondary,
    },

    infoValue: {
      fontSize: FONT.body,
      color: colors.textPrimary,
      fontWeight: "600",
    },

    routeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    routePoint: {
      alignItems: "center",
      flexShrink: 1,
    },

    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginBottom: SPACING.xs,
    },

    dotOutline: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.success,
      marginBottom: SPACING.xs,
    },

    cityText: {
      fontSize: FONT.small,
      color: colors.textSecondary,
      fontWeight: "600",
    },

    routeLine: {
      flex: 1,
      height: 1,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: SPACING.sm,
    },
  });
}
