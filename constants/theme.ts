import { ShipmentStatus } from '@/types/shipment';
import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export type AppColors = {
  brand: string;
  brandDark: string;
  brandLight: string;
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  success: string;
  successLight: string;
  info: string;
  infoLight: string;
  purple: string;
  purpleLight: string;
  gray: string;
  grayLight: string;
  white: string;
  danger: string;
  dangerLight: string;
  overlay: string;
};

export const LIGHT_COLORS: AppColors = {
  brand: '#fe5200',
  brandDark: '#e34700',
  brandLight: '#fff1ea',
  background: '#f5f5f7',
  card: '#ffffff',
  textPrimary: '#111111',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#eceef1',
  success: '#16a34a',
  successLight: '#e6f7ec',
  info: '#2563eb',
  infoLight: '#e9f0ff',
  purple: '#7c3aed',
  purpleLight: '#f2ecff',
  gray: '#6b7280',
  grayLight: '#f0f0f2',
  white: '#ffffff',
  danger: '#dc2626',
  dangerLight: '#fdeaea',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

export const DARK_COLORS: AppColors = {
  brand: '#fe5200',
  brandDark: '#e34700',
  brandLight: '#3d2210',
  background: '#1c1c1e',
  card: '#2c2c2e',
  textPrimary: '#f5f5f7',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  border: '#3a3a3c',
  success: '#22c55e',
  successLight: '#1a3324',
  info: '#60a5fa',
  infoLight: '#1e293b',
  purple: '#a78bfa',
  purpleLight: '#2e1f4d',
  gray: '#71717a',
  grayLight: '#3a3a3c',
  white: '#ffffff',
  danger: '#f87171',
  dangerLight: '#3f1d1d',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

/** @deprecated Use useTheme().colors instead */
export const COLORS = LIGHT_COLORS;

export type StatusColorPalette = Record<
  ShipmentStatus,
  { bg: string; text: string; dot: string }
>;

export function getStatusColors(isDark: boolean): StatusColorPalette {
  const c = isDark ? DARK_COLORS : LIGHT_COLORS;
  return {
    created: { bg: c.grayLight, text: c.textSecondary, dot: c.gray },
    picked_up: { bg: c.infoLight, text: c.info, dot: c.info },
    in_transit: { bg: c.brandLight, text: c.brand, dot: c.brand },
    out_for_delivery: { bg: c.purpleLight, text: c.purple, dot: c.purple },
    delivered: { bg: c.successLight, text: c.success, dot: c.success },
  };
}

/** @deprecated Use useTheme().statusColors instead */
export const STATUS_COLORS: StatusColorPalette = getStatusColors(false);

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const FONT = {
  h1: 24,
  h2: 18,
  body: 15,
  small: 13,
  tiny: 11,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
