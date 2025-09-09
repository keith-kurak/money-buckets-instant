import colors from "@/constants/colors";
import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Money Buckets</Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 32 }}>
        Money Buckets helps you manage your finances easily and instantly. Version 1.0.0.
      </Text>
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
            // TODO: Implement logout logic here
          }}
        >
          Logout
        </Text>
      </View>
    </View>
  );
}