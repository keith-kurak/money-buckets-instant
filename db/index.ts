import { init, id } from '@instantdb/react-native';

const db = init({ appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID });

export { db }