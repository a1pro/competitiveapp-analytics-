# react-native-check-apps

A lightweight React Native utility to detect if specific or similar apps are installed on a user's device.

## ✨ Features

- Check installed apps on Android and iOS
- Dynamically fetch app list from your API
- Collect and send device info along with installed apps
- Easy to integrate with any backend
- Supports both ESModules and CommonJS

## 📦 Installation

```bash
 

 import CheckApps from 'react-native-check-apps';

// Get installed apps (based on your API or hardcoded list)
CheckApps.checkInstalledApps().then(apps => {
  console.log('Installed Apps:', apps);
});

// Or check and send to your admin server
CheckApps. ();