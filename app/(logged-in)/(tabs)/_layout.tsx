import { TabBarIcon } from "@/components/TabBarIcon";
import { Tabs, useSegments } from "expo-router";
import { findIndex } from "lodash";
import colors from "../../../constants/colors";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function Layout() {

  const segments = useSegments();

  const tabRouteIndex = findIndex(
    segments,
    // @ts-ignore
    (s) => s === "buckets" || s === "settings"
  );

  const hideTabs =
    tabRouteIndex !== -1 && // the route exists
    tabRouteIndex !== segments.length - 1 // the route isn't at the end

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarStyle: { display: hideTabs ? "none" : "flex" },
      }}
    >
      <Tabs.Screen
        name="(buckets)"
        options={{
          title: "Buckets",
          tabBarLabel: "Buckets",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="FontAwesome6" name="bucket" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(transactions)"
        options={{
          href: '/transactions', // not sure why it tries to go to buckets
          title: "Transactions",
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="FontAwesome6" name="money-bill-transfer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="MaterialIcons" name="settings" color={color} />
          ),
        }}
      />
      </Tabs>
  );
}