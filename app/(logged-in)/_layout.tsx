import colors from "@/constants/colors";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const loggedIn = false; // Replace with your actual authentication logic

  if (!loggedIn) {
    return <Redirect href="/login" />;
  }

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
