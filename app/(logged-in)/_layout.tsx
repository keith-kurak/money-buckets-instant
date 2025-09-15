import colors from "@/constants/colors";
import { db } from "@/db";
import { useLocalContext } from "@/db/store";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { isLoading, user, error } = db.useAuth();

  const { currentGroupId } = useLocalContext();

  if (isLoading) {
    return null;
  }

  if (!user) {
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
    >
      <Stack.Protected guard={!!currentGroupId}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="[bucketId]" />
        <Stack.Screen name="[bucketId]/add" />
        <Stack.Screen name="add-bucket" />
      </Stack.Protected>
      <Stack.Protected guard={!currentGroupId}>
        <Stack.Screen name="onboarding/choose-group" />
      </Stack.Protected>

    </Stack>
  );
}
