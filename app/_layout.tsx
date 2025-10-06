import { db } from "@/db";
import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const { isLoading, user, error } = db.useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(logged-in)" />
        </Stack.Protected>
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
}
