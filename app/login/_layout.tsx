import { useLocalContext } from "@/db/store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  const { clearContext } = useLocalContext();

  // make sure stored values are cleared if we return to login
  useEffect(() => {
    clearContext()
  }, [clearContext]);

  return <Stack screenOptions={{ headerShown: false }} />;
}