import colors from "@/constants/colors";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Settings",
        headerShown: false,
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: colors.tint },
      }}
    />
  );
}
