import { TabBarIcon } from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import colors from "../../../constants/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
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