import colors from "@/constants/colors";
import { useLocalContext } from "@/db/store";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { currentGroupId } = useLocalContext();

  console.log("Current group ID:", currentGroupId);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.tint },
        headerTintColor: colors.white,
        headerBackButtonDisplayMode: "minimal",
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!!currentGroupId}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!currentGroupId}>
        <Stack.Screen name="onboarding/choose-group" />
      </Stack.Protected>
    </Stack>
  );
}
