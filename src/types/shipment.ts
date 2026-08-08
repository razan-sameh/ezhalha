export type ShipmentStatus =
  | 'created'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export type ServiceType = 'Express' | 'Standard';

export interface ShipmentParty {
  name: string;
  city: string;
}

export interface Shipment {
  id: string;
  tracking: string;
  status: ShipmentStatus;
  sender: ShipmentParty;
  recipient: ShipmentParty;
  weightKg: number;
  service: ServiceType;
}

// Order matters — used to render the tracking timeline and to
// determine which steps are "completed" relative to the current status.
export const STATUS_ORDER: ShipmentStatus[] = [
  'created',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  created: 'Created',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export const STATUS_DESCRIPTIONS: Record<ShipmentStatus, string> = {
  created: 'Shipment created and ready for pickup',
  picked_up: 'Package collected from sender',
  in_transit: 'Departed origin facility',
  out_for_delivery: 'With local delivery courier',
  delivered: 'Delivered to recipient',
};
