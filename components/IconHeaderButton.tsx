import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable } from "react-native";

const iconMapping: Record<
  | "plus"
  | "settings",
  { Component: typeof Entypo; name: ComponentProps<typeof Entypo>["name"] }
  | { Component: typeof FontAwesome6; name: ComponentProps<typeof FontAwesome6>["name"] }
> = {
  plus: { Component: Entypo, name: "plus" },
  settings: { Component: FontAwesome6, name: "gear" },
};

export function IconHeaderButton(props: { icon: "plus" | "settings"; onPress: () => void; color?: string }) {
  const { Component, name } = iconMapping[props.icon];
  return (
    <Pressable onPress={props.onPress} className="p-2">
      <Component name={name} size={24} color={props.color || "white"} />
    </Pressable>
  );
}