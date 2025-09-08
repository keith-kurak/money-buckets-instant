import { TabBarIcon } from "@/component/TabBarIcon";
import { Tabs } from "expo-router";
import colors from "../../constants/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.tint },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white + "88",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Buckets",
          tabBarLabel: "Buckets",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="FontAwesome6" name="bucket" color={color} />
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