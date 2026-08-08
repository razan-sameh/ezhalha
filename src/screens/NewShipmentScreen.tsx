import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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
import { ServiceType } from '../types/shipment';
import { generateShipmentId, generateTrackingNumber } from '../utils/id';
import { COLORS, FONT, RADIUS, SPACING } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'NewShipment'>;

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
  senderCity: '',
  recipientCity: '',
  weight: '',
  service: 'Express',
};

export function NewShipmentScreen({ navigation }: Props) {
  const { addShipment } = useShipments();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!form.senderCity.trim()) {
      nextErrors.senderCity = 'Sender city is required';
    }
    if (!form.recipientCity.trim()) {
      nextErrors.recipientCity = 'Recipient city is required';
    }

    const weightNumber = Number(form.weight);
    if (!form.weight.trim()) {
      nextErrors.weight = 'Weight is required';
    } else if (Number.isNaN(weightNumber) || weightNumber <= 0) {
      nextErrors.weight = 'Weight must be a positive number';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    addShipment({
      id: generateShipmentId(),
      tracking: generateTrackingNumber(),
      status: 'created',
      sender: { name: 'You', city: form.senderCity.trim() },
      recipient: { name: 'Recipient', city: form.recipientCity.trim() },
      weightKg: Number(form.weight),
      service: form.service,
    });

    navigation.goBack();
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
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
              onChangeText={(text) => updateField('senderCity', text)}
              error={errors.senderCity}
            />

            <Field
              label="Recipient City"
              placeholder="e.g. Riyadh, KSA"
              value={form.recipientCity}
              onChangeText={(text) => updateField('recipientCity', text)}
              error={errors.recipientCity}
            />

            <Field
              label="Weight (kg)"
              placeholder="e.g. 2.5"
              value={form.weight}
              onChangeText={(text) => updateField('weight', text)}
              error={errors.weight}
              keyboardType="decimal-pad"
              helperText={!errors.weight ? 'Enter weight in kilograms' : undefined}
            />

            <Text style={styles.label}>Service Type</Text>
          </View>

          <View style={styles.serviceRow}>
            <ServiceOption
              label="Express"
              description="1-3 days"
              icon="flash"
              selected={form.service === 'Express'}
              onPress={() => updateField('service', 'Express')}
            />
            <ServiceOption
              label="Standard"
              description="4-7 days"
              icon="cube"
              selected={form.service === 'Standard'}
              onPress={() => updateField('service', 'Standard')}
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Create shipment"
          >
            <Ionicons name="add" size={20} color={COLORS.white} />
            <Text style={styles.submitText}>Create Shipment</Text>
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
  keyboardType?: 'default' | 'decimal-pad';
}

function Field({ label, placeholder, value, onChangeText, error, helperText, keyboardType }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        style={[styles.input, error ? styles.inputError : undefined]}
        keyboardType={keyboardType ?? 'default'}
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
}: {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.serviceOption, selected && styles.serviceOptionSelected]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}, ${description}`}
    >
      <Ionicons name={icon} size={22} color={selected ? COLORS.brand : COLORS.textMuted} />
      <Text style={[styles.serviceLabel, selected && styles.serviceLabelSelected]}>{label}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
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
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: FONT.small,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: SPACING.lg,
  },
  field: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT.body,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  errorText: {
    fontSize: FONT.tiny,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
  helperText: {
    fontSize: FONT.tiny,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  serviceRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  serviceOption: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginRight: SPACING.md,
    alignItems: 'flex-start',
  },
  serviceOptionSelected: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.brandLight,
  },
  serviceLabel: {
    fontSize: FONT.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  serviceLabelSelected: {
    color: COLORS.brand,
  },
  serviceDescription: {
    fontSize: FONT.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.brand,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitText: {
    color: COLORS.white,
    fontSize: FONT.body,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
});
