import colors from "@/constants/colors";
import { db } from "@/db";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { isLoading, user, error } = db.useAuth();

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
    />
  );
}
