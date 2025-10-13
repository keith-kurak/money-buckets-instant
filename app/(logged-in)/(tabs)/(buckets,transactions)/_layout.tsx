import colors from "@/constants/colors";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.tint },
        headerTintColor: colors.white,
        headerBackButtonDisplayMode: "minimal",
        //headerShown: false,
      }}
    />
  );
}
