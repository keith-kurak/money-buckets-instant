import colors from "@/constants/colors";
import { db, id } from "@/db";
import { useUserProfile } from "@/db/local";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Settings() {
  const { profile, saveProfile } = useUserProfile();
  const [profileName, setProfileName] = useState(profile?.name || "");

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
          <TextInput
            className="border border-gray-300 rounded p-2 flex-1"
            placeholder="Enter profile name"
            value={profileName}
            onChangeText={(text) => {
              setProfileName(text);
            }}
          />
          <Pressable
            onPress={() => {
              const newId = id();
              db.tx.profiles[newId].create({ name: profileName }).link({ owner: db.useUser().id });
              saveProfile({ name: profileName, id: newId });
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