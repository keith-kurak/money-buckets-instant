import colors from "@/constants/colors";
import { db } from "@/db";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Money Buckets</Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 32 }}>
        Money Buckets helps you manage your finances easily and instantly. Version 1.0.0.
      </Text>
      <View>
        <Text className="text-lg font-bold mb-2">Set a profile name</Text>
        <Text className="text-gray-600 mb-4">
          A profile name can be used to identify different devices entering transactions
        </Text>
        <View className="flex-row gap-x-2">
          <Pressable
            onPress={() => {

            }}
          >
            <Text>Save</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text
          style={{
            backgroundColor: colors.tint,
            color: "#fff",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
          onPress={() => {
            db.auth.signOut();
          }}
        >
          Logout
        </Text>
      </View>
    </View>
  );
}