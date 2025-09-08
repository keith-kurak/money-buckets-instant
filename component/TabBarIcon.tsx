import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name:
    | React.ComponentProps<typeof FontAwesome>["name"]
    | React.ComponentProps<typeof MaterialIcons>["name"]
    | React.ComponentProps<typeof FontAwesome6>["name"];
  type?: "FontAwesome" | "MaterialIcons" | "FontAwesome6";
  color?: string;
}) {
  const IconComponent =
    props.type === "MaterialIcons"
      ? MaterialIcons
      : props.type === "FontAwesome6"
      ? FontAwesome6
      : FontAwesome;
  const myColor = props.color || "black";
  // @ts-ignore
  return (
    <IconComponent
      size={24}
      {...props}
      color={myColor}
    />
  );
}