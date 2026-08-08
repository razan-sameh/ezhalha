import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useShipments } from '../context/ShipmentsContext';
import { usePinnedShipments } from '../hooks/usePinnedShipments';
import { useTheme } from '../context/ThemeContext';
import { ShipmentCard } from '../components/ShipmentCard';
import { EmptyState } from '../components/EmptyState';
import { StatusFilter, StatusFilterSheet } from '../components/StatusFilterSheet';
import { Shipment } from '../types/shipment';
import { FONT, RADIUS, SPACING } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ShipmentList'>;

export function ShipmentListScreen({ navigation }: Props) {
  const { shipments } = useShipments();
  const { isPinned, togglePin, isLoaded } = usePinnedShipments();
  const { colors, isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [filterVisible, setFilterVisible] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SPACING.lg,
          paddingTop: SPACING.sm,
          paddingBottom: SPACING.md,
        },
        brand: {
          fontSize: FONT.tiny,
          fontWeight: '700',
          color: colors.brand,
          letterSpacing: 1,
          marginBottom: 2,
        },
        title: {
          fontSize: FONT.h1,
          fontWeight: '700',
          color: colors.textPrimary,
        },
        headerActions: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING.sm,
        },
        iconButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: SPACING.lg,
          marginBottom: SPACING.md,
          gap: SPACING.sm,
        },
        searchRow: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          paddingHorizontal: SPACING.md,
          borderRadius: RADIUS.md,
          borderWidth: 1,
          borderColor: colors.border,
          height: 46,
        },
        searchIcon: {
          marginRight: SPACING.sm,
        },
        searchInput: {
          flex: 1,
          fontSize: FONT.body,
          color: colors.textPrimary,
          height: '100%',
        },
        filterButton: {
          width: 46,
          height: 46,
          borderRadius: RADIUS.md,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        filterButtonActive: {
          borderColor: colors.brand,
          backgroundColor: colors.brandLight,
        },
        listContent: {
          flexGrow: 1,
          paddingHorizontal: SPACING.lg,
          paddingBottom: SPACING.xxl * 2,
        },
        fab: {
          position: 'absolute',
          right: SPACING.lg,
          bottom: SPACING.xl,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        },
      }),
    [colors]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    let list = statusFilter === 'all'
      ? shipments
      : shipments.filter((s) => s.status === statusFilter);

    if (normalized) {
      list = list.filter(
        (s) =>
          s.tracking.toLowerCase().includes(normalized) ||
          s.status.replace('_', ' ').includes(normalized)
      );
    }

    return [...list].sort((a: Shipment, b: Shipment) => {
      const aPinned = isPinned(a.id);
      const bPinned = isPinned(b.id);
      if (aPinned === bPinned) return 0;
      return aPinned ? -1 : 1;
    });
  }, [shipments, query, statusFilter, isPinned]);

  const isFilterActive = statusFilter !== 'all';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>EZHALHA</Text>
          <Text style={styles.title}>Shipment Tracker</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={styles.iconButton}
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <Ionicons
            name="search"
            size={18}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search tracking number..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Search shipments"
          />
        </View>
        <Pressable
          style={[styles.filterButton, isFilterActive && styles.filterButtonActive]}
          onPress={() => setFilterVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Filter by status"
          accessibilityState={{ selected: isFilterActive }}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={isFilterActive ? colors.brand : colors.textSecondary}
          />
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ShipmentCard
            shipment={item}
            isPinned={isLoaded && isPinned(item.id)}
            onPress={() => navigation.navigate('ShipmentDetail', { id: item.id })}
            onTogglePin={() => togglePin(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            title="No shipments found"
            subtitle={
              query || isFilterActive
                ? 'Nothing matches your search or filter. Try adjusting them.'
                : 'There are no shipments yet.'
            }
          />
        }
      />

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('NewShipment')}
        accessibilityRole="button"
        accessibilityLabel="Create new shipment"
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </Pressable>

      <StatusFilterSheet
        visible={filterVisible}
        selected={statusFilter}
        onSelect={setStatusFilter}
        onClose={() => setFilterVisible(false)}
      />
    </SafeAreaView>
  );
}
