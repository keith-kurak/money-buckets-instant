import colors from "@/constants/colors";
import { Pressable, Text } from "react-native";

export function FormSubmitButton(props: {
  title: string;
  isLoading: boolean;
  onPress?: () => void;
  color?: string;
}) {
  return (
    <Pressable
      className=" p-2 rounded-md justify-center items-center"
      style={{ backgroundColor: props.color || colors.tint }}
      onPress={props.onPress}
    >
      <Text className="text-white">{props.title}</Text>
    </Pressable>
  );
}
