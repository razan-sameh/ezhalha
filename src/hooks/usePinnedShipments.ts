import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ezhalha/pinned_shipment_ids';

interface UsePinnedShipments {
  pinnedIds: string[];
  isPinned: (id: string) => boolean;
  togglePin: (id: string) => void;
  isLoaded: boolean;
}

/**
 * Persists pinned shipment ids to AsyncStorage so pins survive app restarts.
 * Exposes a small, testable API rather than leaking storage details into UI code.
 */
export function usePinnedShipments(): UsePinnedShipments {
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (isMounted && raw) {
          setPinnedIds(JSON.parse(raw));
        }
      } catch (error) {
        console.warn('Failed to load pinned shipments', error);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    setPinnedIds(ids);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.warn('Failed to persist pinned shipments', error);
    }
  }, []);

  const togglePin = useCallback(
    (id: string) => {
      const next = pinnedIds.includes(id)
        ? pinnedIds.filter((pinnedId) => pinnedId !== id)
        : [...pinnedIds, id];
      persist(next);
    },
    [pinnedIds, persist]
  );

  const isPinned = useCallback((id: string) => pinnedIds.includes(id), [pinnedIds]);

  return { pinnedIds, isPinned, togglePin, isLoaded };
}
