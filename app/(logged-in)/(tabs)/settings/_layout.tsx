import colors from "@/constants/colors";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Settings",
        //headerShown: false,
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: colors.tint },
      }}
    />
  );
}
