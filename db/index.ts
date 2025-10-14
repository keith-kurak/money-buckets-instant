import schema from '@/instant.schema';
import { id, init } from '@instantdb/react-native';

const db = init({ appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID || "", schema, queryCacheLimit:20 });

export { db, id };
