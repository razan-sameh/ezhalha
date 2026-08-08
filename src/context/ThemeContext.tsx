
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AppColors, StatusColorPalette, DARK_COLORS, LIGHT_COLORS, getStatusColors } from "../constants/theme";

const THEME_STORAGE_KEY = "@ezhalha/color-scheme";

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colors: AppColors;
  statusColors: StatusColorPalette;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((value) => {
      if (value === "dark") setIsDark(true);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      toggleTheme,
      colors: isDark ? DARK_COLORS : LIGHT_COLORS,
      statusColors: getStatusColors(isDark),
    }),
    [isDark, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
