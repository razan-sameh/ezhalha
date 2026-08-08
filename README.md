# Ezhalha – Shipment Tracker

A React Native mobile app built with Expo for tracking shipments, viewing shipment details, filtering and searching shipments, and creating new shipments.

## Getting Started

### Prerequisites

* Node.js
* Yarn
* Expo CLI / Expo Go
* iOS Simulator or Android Emulator

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/razan-sameh/ezhalha.git
cd ezhalha
yarn install
```

Run on iOS:

```bash
yarn ios
```

Run on Android:

```bash
yarn android
```

You can also scan the QR code using Expo Go to run the app on a physical device.

## Main Features

* Shipment list with search
* Filter shipments by status
* Pin/unpin shipments
* Shipment details and tracking timeline
* Create new shipments
* Light and dark mode
* Local persistence for theme and pinned shipments
* Form validation
* Responsive mobile UI

## Libraries & Why

### Expo

Used to simplify the React Native development workflow and make it easier to run the application on both iOS and Android.

### React Navigation

Used for stack-based navigation between the shipment list, shipment details, and create shipment screens.

### AsyncStorage

Used for lightweight local persistence, mainly for saving the selected theme and pinned shipments between app sessions.

### @expo/vector-icons

Used for consistent icons throughout the application without adding custom image assets.


## Architecture

The project is organized around reusable components, contexts, hooks, screens, and shared constants.

* `screens` – application screens
* `components` – reusable UI components
* `context` – global state such as shipments and theme
* `hooks` – reusable application logic
* `constants` – theme, spacing, typography, and colors
* `navigation` – navigation configuration and types
* `types` – shared TypeScript types
* `utils` – utility functions


## What I Would Add With More Time

* Backend/API integration for real shipment tracking
* Authentication and user accounts
* Push notifications for shipment status updates
* Unit and integration tests
* Loading, error, and network states
* React Query for server state management
* Redux Toolkit for more complex client-side state

## Tech Stack

* React Native
* Expo
* TypeScript
* React Navigation
* AsyncStorage
* Yarn

## Demo Video


https://github.com/user-attachments/assets/04318c43-9250-4ad1-b32d-cee1bf6880a6



## Screenshots
<img width="421" height="781" alt="Screenshot 2026-08-08 at 4 47 09 PM" src="https://github.com/user-attachments/assets/ad1920a1-9af5-43a0-ba7c-dc5d1facdc80" />
<img width="421" height="781" alt="Screenshot 2026-08-08 at 4 42 31 PM" src="https://github.com/user-attachments/assets/016665fe-c5d6-4c84-9492-1f1bf2fec503" />
<img width="421" height="781" alt="Screenshot 2026-08-08 at 4 42 23 PM" src="https://github.com/user-attachments/assets/ad37c91c-e19f-40b3-a918-94f43f730b76" />
<img width="421" height="781" alt="Screenshot 2026-08-08 at 4 42 15 PM" src="https://github.com/user-attachments/assets/cd82f7fc-7017-4bda-a01b-5702b8e5f2c2" />
<img width="421" height="781" alt="Screenshot 2026-08-08 at 4 42 08 PM" src="https://github.com/user-attachments/assets/b9ea0eeb-34a9-4efa-be60-0f5aefc888b4" />



