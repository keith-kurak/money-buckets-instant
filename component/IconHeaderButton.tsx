import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";

export function IconHeaderButton(props: { icon: "plus"; onPress: () => void; color?: string }) {
  return (
    <Pressable onPress={props.onPress} className="p-2">
      <Entypo name={props.icon} size={24} color={props.color || "white"} />
    </Pressable>
  );
}