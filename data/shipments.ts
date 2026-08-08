// data/shipments.ts
export type ShipmentStatus =
  "created" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered";
export const SHIPMENTS = [
  { id: "1", tracking: "EZH100234871", status: "in_transit",
    sender: { name: "Al Noor Trading", city: "Riyadh" },
    recipient: { name: "Sara Khan", city: "Jeddah" },
    weightKg: 3.5, service: "Express" },
  { id: "2", tracking: "EZH100234872", status: "delivered",
    sender: { name: "Ezhalha Store", city: "Dammam" },
    recipient: { name: "Omar Ali", city: "Mecca" },
    weightKg: 1.2, service: "Standard" },
  { id: "3", tracking: "EZH100234873", status: "created",
    sender: { name: "Gulf Parts Co", city: "Riyadh" },
    recipient: { name: "Layla Hassan", city: "Medina" },
    weightKg: 8.0, service: "Express" },
  { id: "4", tracking: "EZH100234874", status: "out_for_delivery",
    sender: { name: "Falcon Electronics", city: "Jeddah" },
    recipient: { name: "Yousef Nasser", city: "Riyadh" },
    weightKg: 2.7, service: "Standard" },
];