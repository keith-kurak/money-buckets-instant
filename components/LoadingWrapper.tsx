import { ActivityIndicator, Text, View } from "react-native";
import { db } from "../db";

export function LoadingWrapper(props: {
  isLoading?: boolean | boolean[];
  error?: { message: string } | { message: string }[] | undefined;
  children: React.ReactNode;
}) {
  const status = db.useConnectionStatus();
  // show loading if any are loading
  if (
    Array.isArray(props.isLoading)
      ? props.isLoading.find((i) => i)
      : props.isLoading
  ) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  // show error if any are errors
  if (Array.isArray(props.error) ? props.error.find((e) => e) : props.error) {
    return (
      <View className="flex-1 items-center justify-center gap-y-2 p-4">
        <Text className="text-red-500">
          {Array.isArray(props.error)
            ? props.error.find((e) => e)?.message
            : props.error?.message || props.error?.message}
        </Text>
        {status !== "authenticated" && (
          <Text className="text-gray-500">
            You are currently offline. Please check your internet connection. Current connection status: {status}
          </Text>
        )}
      </View>
    );
  }
  return <View className="flex-1">{props.children}</View>;
}
