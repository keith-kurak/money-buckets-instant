import { Text, View } from "react-native";

export function EmptyListPlaceholder(props: { text: string }) {
  return (
    <View className="flex-1 items-center justify-center gap-y-2 px-6 py-12">
      <Text className="text-center text-base text-gray-500">{props.text}</Text>
    </View>
  );
}
