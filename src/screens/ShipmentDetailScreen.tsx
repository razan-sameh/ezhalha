import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useShipments } from '../context/ShipmentsContext';
import { usePinnedShipments } from '../hooks/usePinnedShipments';
import { StatusTimeline } from '../components/StatusTimeline';
import { EmptyState } from '../components/EmptyState';
import { STATUS_LABELS } from '../types/shipment';
import { COLORS, FONT, RADIUS, SPACING, STATUS_COLORS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ShipmentDetail'>;

export function ShipmentDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { getShipmentById } = useShipments();
  const { isPinned, togglePin } = usePinnedShipments();
  const shipment = getShipmentById(id);

  if (!shipment) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header title="Shipment Details" onBack={() => navigation.goBack()} />
        <EmptyState
          icon="alert-circle-outline"
          title="Shipment not found"
          subtitle="This shipment may have been removed."
        />
      </SafeAreaView>
    );
  }

  const palette = STATUS_COLORS[shipment.status];
  const pinned = isPinned(shipment.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header
        title={shipment.tracking}
        eyebrow="SHIPMENT DETAILS"
        onBack={() => navigation.goBack()}
        right={
          <Pressable
            hitSlop={10}
            onPress={() => togglePin(shipment.id)}
            accessibilityRole="button"
            accessibilityLabel={pinned ? 'Unpin shipment' : 'Pin shipment'}
          >
            <Ionicons
              name={pinned ? 'star' : 'star-outline'}
              size={22}
              color={pinned ? COLORS.brand : COLORS.textMuted}
            />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroCard, { backgroundColor: palette.text }]}>
          <Text style={styles.heroLabel}>CURRENT STATUS</Text>
          <Text style={styles.heroStatus}>{STATUS_LABELS[shipment.status]}</Text>
        </View>

        <SectionCard title="Shipment Info">
          <InfoRow label="Sender" value={shipment.sender.name} />
          <InfoRow label="Recipient" value={shipment.recipient.name} />
          <InfoRow label="Weight" value={`${shipment.weightKg.toFixed(1)} kg`} />
          <InfoRow label="Service" value={shipment.service} last />
        </SectionCard>

        <SectionCard title="Route">
          <View style={styles.routeRow}>
            <View style={styles.routePoint}>
              <View style={[styles.dot, { backgroundColor: COLORS.brand }]} />
              <Text style={styles.cityText}>{shipment.sender.city}</Text>
            </View>
            <View style={styles.routeLine} />
            <Ionicons name="cube" size={16} color={COLORS.textMuted} />
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={[styles.dot, styles.dotOutline]} />
              <Text style={styles.cityText}>{shipment.recipient.city}</Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard title="Tracking Timeline">
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
}: {
  title: string;
  eyebrow?: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowDivider]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTextWrap: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  eyebrow: {
    fontSize: FONT.tiny,
    fontWeight: '700',
    color: COLORS.brand,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: FONT.h2,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerRight: {
    minWidth: 22,
    alignItems: 'flex-end',
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
    color: 'rgba(255,255,255,0.85)',
    fontSize: FONT.tiny,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  heroStatus: {
    color: COLORS.white,
    fontSize: FONT.h1,
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: FONT.small,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  infoRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: FONT.body,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routePoint: {
    alignItems: 'center',
    flexShrink: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: SPACING.xs,
  },
  dotOutline: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  cityText: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  routeLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
});
