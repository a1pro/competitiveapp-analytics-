import { Linking, Platform, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const appDatabase = {
  facebook: { packageName: 'com.facebook.katana', urlScheme: 'fb://' },
  whatsapp: { packageName: 'com.whatsapp', urlScheme: 'whatsapp://' },
  instagram: { packageName: 'com.instagram.android', urlScheme: 'instagram://' },
  twitter: { packageName: 'com.twitter.android', urlScheme: 'twitter://' },
  youtube: { packageName: 'com.google.android.youtube', urlScheme: 'vnd.youtube://' },
};

const checkInstalledApps = async () => {
  let installedApps = [];

  for (const appName in appDatabase) {
    if (Object.prototype.hasOwnProperty.call(appDatabase, appName)) {
      const appInfo = appDatabase[appName];
      try {
        const canOpen = await Linking.canOpenURL(appInfo.urlScheme);
        if (canOpen) {
          installedApps.push(appName);
        }
      } catch (error) {
        console.error(`Error checking ${appName}:`, error);
      }
    }
  }

  if (installedApps.length > 0) {
    await sendUserDetails(installedApps);
  }

  return installedApps;
};

const sendUserDetails = async (similarApps) => {
  console.log("Detected similar apps:", similarApps);
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceModel = DeviceInfo.getModel();
    const deviceName = await DeviceInfo.getDeviceName();
    const deviceOs = await DeviceInfo.getSystemName();

    const payload = {
      deviceId: deviceId,
      deviceModel: deviceModel,
      deviceName: deviceName,
      deviceOs: deviceOs,
      operatorId: '0001',
      app_name: similarApps
    };

    console.log('Sending payload:', payload);

    const res = await axios.post('https://churncenturion.com/api/v1/appdetect/without/token', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.code === 200) {
      Alert.alert('Success', res.data.message);
      console.log('Success:', res.data.message);
    } else {
      console.log('Server responded:', res.data);
    }

  } catch (error) {
    console.error('❌ Error sending user details:', error.response?.data || error.message);
  }
};

export { checkInstalledApps };
export default { checkInstalledApps };
