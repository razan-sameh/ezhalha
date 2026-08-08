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
