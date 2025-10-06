import colors from "@/constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSegments } from "expo-router";
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { findIndex } from "lodash";
import { Platform } from "react-native";

export default function Layout() {
  const segments = useSegments();

  const tabRouteIndex = findIndex(
    segments,
    // @ts-ignore
    (s) => s === "buckets"
  );

  const hideTabs =
    tabRouteIndex !== -1 && // the route exists
    tabRouteIndex !== segments.length - 1 && // the route isn't at the end
    Platform.OS !== "web"; // we're on mobile

  if (hideTabs) {
   //return <Tabs screenOptions={{ headerShown: false}} />
  }

  return (
    <NativeTabs labelVisibilityMode="unlabeled" tintColor={colors.tint}>
      <NativeTabs.Trigger name="(buckets)">
        <Label>Buckets</Label>
        <Icon src={<VectorIcon family={FontAwesome6} name="bucket" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(transactions)">
        <Label>Transactions</Label>
        <Icon src={<VectorIcon family={FontAwesome6} name="money-bill-transfer" />} /> 
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon src={<VectorIcon family={FontAwesome6} name="gear" />} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}