import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ShipmentListScreen } from '../screens/ShipmentListScreen';
import { ShipmentDetailScreen } from '../screens/ShipmentDetailScreen';
import { NewShipmentScreen } from '../screens/NewShipmentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShipmentList" component={ShipmentListScreen} />
      <Stack.Screen
        name="ShipmentDetail"
        component={ShipmentDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="NewShipment"
        component={NewShipmentScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
