import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { useShipments } from "../context/ShipmentsContext";
import { useTheme } from "../context/ThemeContext";
import { ServiceType } from "../types/shipment";
import { generateShipmentId, generateTrackingNumber } from "../utils/id";
import { AppColors, FONT, RADIUS, SPACING } from "../constants/theme";

type Props = NativeStackScreenProps<RootStackParamList, "NewShipment">;

interface FormState {
  senderCity: string;
  recipientCity: string;
  weight: string;
  service: ServiceType;
}

interface FormErrors {
  senderCity?: string;
  recipientCity?: string;
  weight?: string;
}

const INITIAL_FORM: FormState = {
  senderCity: "",
  recipientCity: "",
  weight: "",
  service: "Express",
};

export function NewShipmentScreen({ navigation }: Props) {
  const { addShipment } = useShipments();
  const { colors } = useTheme();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const styles = createStyles(colors);

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!form.senderCity.trim()) {
      nextErrors.senderCity = "Sender city is required";
    }

    if (!form.recipientCity.trim()) {
      nextErrors.recipientCity = "Recipient city is required";
    }

    const weightNumber = Number(form.weight);

    if (!form.weight.trim()) {
      nextErrors.weight = "Weight is required";
    } else if (Number.isNaN(weightNumber) || weightNumber <= 0) {
      nextErrors.weight = "Weight must be a positive number";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    addShipment({
      id: generateShipmentId(),
      tracking: generateTrackingNumber(),
      status: "created",
      sender: {
        name: "You",
        city: form.senderCity.trim(),
      },
      recipient: {
        name: "Recipient",
        city: form.recipientCity.trim(),
      },
      weightKg: Number(form.weight),
      service: form.service,
    });

    navigation.goBack();
  }

  function updateField<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.textPrimary}
            />
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text style={styles.eyebrow}>NEW SHIPMENT</Text>
            <Text style={styles.headerTitle}>Create Shipment</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>SHIPMENT DETAILS</Text>

            <Field
              label="Sender City"
              placeholder="e.g. Dubai, UAE"
              value={form.senderCity}
              onChangeText={(text) =>
                updateField("senderCity", text)
              }
              error={errors.senderCity}
              styles={styles}
            />

            <Field
              label="Recipient City"
              placeholder="e.g. Riyadh, KSA"
              value={form.recipientCity}
              onChangeText={(text) =>
                updateField("recipientCity", text)
              }
              error={errors.recipientCity}
              styles={styles}
            />

            <Field
              label="Weight (kg)"
              placeholder="e.g. 2.5"
              value={form.weight}
              onChangeText={(text) =>
                updateField("weight", text)
              }
              error={errors.weight}
              keyboardType="decimal-pad"
              helperText={
                !errors.weight
                  ? "Enter weight in kilograms"
                  : undefined
              }
              styles={styles}
            />

            <Text style={styles.label}>Service Type</Text>

            <View style={styles.serviceRow}>
              <ServiceOption
                label="Express"
                description="1-3 days"
                icon="flash"
                selected={form.service === "Express"}
                onPress={() =>
                  updateField("service", "Express")
                }
                styles={styles}
                colors={colors}
              />

              <ServiceOption
                label="Standard"
                description="4-7 days"
                icon="cube"
                selected={form.service === "Standard"}
                onPress={() =>
                  updateField("service", "Standard")
                }
                styles={styles}
                colors={colors}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Create shipment"
          >
            <Ionicons
              name="add"
              size={20}
              color={colors.white}
            />

            <Text style={styles.submitText}>
              Create Shipment
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  keyboardType?: "default" | "decimal-pad";
  styles: ReturnType<typeof createStyles>;
}

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  keyboardType,
  styles,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={styles.inputPlaceholder.color}
        style={[
          styles.input,
          error ? styles.inputError : undefined,
        ]}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize="words"
        autoCorrect={false}
        accessibilityLabel={label}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

function ServiceOption({
  label,
  description,
  icon,
  selected,
  onPress,
  styles,
  colors,
}: {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
  colors: AppColors;
}) {
  return (
    <Pressable
      style={[
        styles.serviceOption,
        selected && styles.serviceOptionSelected,
      ]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}, ${description}`}
    >
      <Ionicons
        name={icon}
        size={22}
        color={
          selected
            ? colors.brand
            : colors.textMuted
        }
      />

      <Text
        style={[
          styles.serviceLabel,
          selected && styles.serviceLabelSelected,
        ]}
      >
        {label}
      </Text>

      <Text style={styles.serviceDescription}>
        {description}
      </Text>
    </Pressable>
  );
}

function createStyles(colors: AppColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    flex: {
      flex: 1,
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

    content: {
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.xxl * 2,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: RADIUS.md,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: SPACING.lg,
    },

    cardTitle: {
      fontSize: FONT.small,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 0.5,
      marginBottom: SPACING.lg,
    },

    field: {
      marginBottom: SPACING.lg,
    },

    label: {
      fontSize: FONT.small,
      fontWeight: "600",
      color: colors.textPrimary,
      marginBottom: SPACING.xs,
    },

    input: {
      backgroundColor: colors.grayLight,
      borderRadius: RADIUS.sm,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      fontSize: FONT.body,
      color: colors.textPrimary,
    },

    inputPlaceholder: {
      color: colors.textMuted,
    },

    inputError: {
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: colors.dangerLight,
    },

    errorText: {
      fontSize: FONT.tiny,
      color: colors.danger,
      marginTop: SPACING.xs,
    },

    helperText: {
      fontSize: FONT.tiny,
      color: colors.textMuted,
      marginTop: SPACING.xs,
    },

    serviceRow: {
      flexDirection: "row",
      marginBottom: SPACING.lg,
      marginTop: SPACING.xs,
    },

    serviceOption: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: RADIUS.md,
      borderWidth: 1.5,
      borderColor: colors.border,
      padding: SPACING.lg,
      marginRight: SPACING.md,
      alignItems: "flex-start",
    },

    serviceOptionSelected: {
      borderColor: colors.brand,
      backgroundColor: colors.brandLight,
    },

    serviceLabel: {
      fontSize: FONT.body,
      fontWeight: "700",
      color: colors.textPrimary,
      marginTop: SPACING.sm,
    },

    serviceLabelSelected: {
      color: colors.brand,
    },

    serviceDescription: {
      fontSize: FONT.small,
      color: colors.textSecondary,
      marginTop: 2,
    },

    submitButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.brand,
      borderRadius: RADIUS.md,
      paddingVertical: SPACING.md,
    },

    submitButtonPressed: {
      opacity: 0.85,
    },

    submitText: {
      color: colors.white,
      fontSize: FONT.body,
      fontWeight: "700",
      marginLeft: SPACING.sm,
    },
  });
}