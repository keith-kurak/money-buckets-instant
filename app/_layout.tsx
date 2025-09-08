import { Stack } from "expo-router";
import colors from "../constants/colors";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.tint },
        headerTintColor: colors.white,
        headerBackButtonDisplayMode: "minimal",
        headerShown: false,
      }}
    />
  );
}
