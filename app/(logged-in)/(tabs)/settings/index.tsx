import { EnterTextModal } from "@/components/EnterTextModal";
import { db } from "@/db";
import { useCurrentGroupQuery, useCurrentProfileQuery } from "@/db/queries";
import { useLocalContext } from "@/db/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, SectionList, Text, View } from "react-native";

export default function Settings() {
  const { isLoading, group, error } = useCurrentGroupQuery();

  const router = useRouter();

  const { profile } = useCurrentProfileQuery();

  const { clearContext } = useLocalContext();

  const [isEditGroupNameDialogVisible, setIsEditGroupNameDialogVisible] =
    useState(false);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const sections = [
    {
      title: "Budget Settings",
      data: [
        <LabelValueCell
          key="groupName"
          label="Budget Name"
          value={group?.title || "No Group"}
          onPress={() => {
            router.push("/(logged-in)/(tabs)/settings/edit-group");
          }}
        />,
      ],
    },
    {
      title: "Profiles",
      data: [
        <LabelValueCell
          key="profile"
          label="Current Profile"
          value={profile?.name || "No profile selected"}
          onPress={() => {
            router.push("/(logged-in)/(tabs)/settings/set-profile");
          }}
        />,
        <PressableOptionCell
          key="editProfiles"
          title="Edit Profiles"
          subheading=""
          onPress={() => {
            router.push("/(logged-in)/(tabs)/settings/profiles");
          }}
          icon="chevron"
        />,
      ],
    },
    {
      title: "",
      data: [
        <PressableCentered
          key="logout"
          title="Log Out"
          onPress={() => {
            db.auth.signOut();
            clearContext();
          }}
          color="red"
        />,
      ],
    },
  ];
  return (
    <View className="flex-1 bg-gray-200">
      <SectionList
        sections={sections}
        SectionSeparatorComponent={() => <View className="h-1 bg-transparent" />}
        ItemSeparatorComponent={() => <View className="h-0.5 bg-gray-200" />}
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-4 py-2">
            <Text className="text-gray-500">{title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
      <EnterTextModal
        visible={isEditGroupNameDialogVisible}
        title="Edit Group Name"
        placeholder="Group Name"
        initialValue={group?.title || ""}
        onCancel={() => setIsEditGroupNameDialogVisible(false)}
        onSubmit={(value) => {
          // Update group name in the database
          db.tx.groups.update(group.id, { title: value });
          setIsEditGroupNameDialogVisible(false);
        }}
      />
    </View>
  );
}

function PressableOptionCell(props: {
  title: string;
  subheading: string;
  onPress: () => void;
  icon: "edit" | "chevron";
}) {
  return (
    <Pressable onPress={props.onPress} className="p-4 bg-white">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg">{props.title}</Text>
          <Text className="text-sm text-gray-500">{props.subheading}</Text>
        </View>
        <View>
          {props.icon === "edit" && <Text className="text-lg">✏️</Text>}
          {props.icon === "chevron" && <Ionicons name="chevron-forward" size={20} color="gray" />}
        </View>
      </View>
    </Pressable>
  );
}

function PressableCentered(props: {
  title: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <Pressable onPress={props.onPress} className="p-4 bg-white">
      <View className="flex-row justify-center items-center">
        <View>
          <Text style={{ color: props.color }} className="text-lg">{props.title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function LabelValueCell(props: {
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      className="p-4 flex-row justify-between items-center bg-white"
    >
      <Text className="text-lg color-gray-500">{props.label}</Text>
      <Text className="text-lg">{props.value}</Text>
    </Pressable>
  );
}
