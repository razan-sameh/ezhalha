/**
 * Generates a locally-unique id and a fake-but-plausible tracking number
 * for shipments created on the New Shipment screen. Since there's no
 * backend, this is all we need to keep entries distinct in-memory.
 */
export function generateShipmentId(): string {
  return `local-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function generateTrackingNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `EZH1002${random}`;
}
