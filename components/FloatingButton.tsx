import colors from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import React from "react";

import {
  GestureResponderEvent,
  Platform,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type IconComponentProps = {
  name: string;
  size: number;
  color?: string;
};

type Props = {
  /**
   * Name of the icon to render. If you pass IconComponent, this is forwarded to it.
   * If no IconComponent is provided, iconName will be rendered as text (emoji or glyph).
   */
  iconName?: string;
  /**
   * Optional icon component to render (e.g. from react-native-vector-icons).
   * Signature: (props: { name, size, color }) => ReactElement
   */
  IconComponent?: React.ComponentType<IconComponentProps>;
  /**
   * Called when the button is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Background color of the floating button.
   */
  color?: string;
  /**
   * Diameter of the button in pixels.
   */
  size?: number;
  /**
   * Accessibility label.
   */
  accessibilityLabel?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  iconStyle?: TextStyle;
};

export default function FloatingButton({
  iconName,
  // @ts-ignore
  IconComponent = Entypo,
  onPress,
  color = colors.tint,
  size = 56,
  accessibilityLabel = "Floating action button",
  children,
  style,
  iconStyle,
}: Props) {
  const containerStyle: ViewStyle = {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
  };

  // Basic shadow / elevation
  const shadowStyle: ViewStyle =
    Platform.OS === "android"
      ? { elevation: 6 }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 18,
        };

  const defaultIconStyle: TextStyle = {
    color: "#fff",
    fontSize: Math.round(size * 0.5),
    lineHeight: Math.round(size * 0.5),
    textAlign: "center",
  };

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={[containerStyle, shadowStyle, style]}
    >
      {children ? (
        children
      ) : IconComponent && iconName ? (
        <IconComponent name={iconName} size={Math.round(size * 0.5)} color="#fff" />
      ) : iconName ? (
        // fallback: render the iconName as text (useful for emoji or single glyph)
        <Text style={[defaultIconStyle, iconStyle]} numberOfLines={1}>
          {iconName}
        </Text>
      ) : null}
    </Pressable>
  );
}