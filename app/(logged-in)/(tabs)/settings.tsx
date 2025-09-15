import { EnterTextModal } from "@/component/EnterTextModal";
import { db } from "@/db";
import { useCurrentGroupQuery, useCurrentProfileQuery } from "@/db/queries";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";

export default function Settings() {
  const { isLoading, group, error } = useCurrentGroupQuery();

  const { profile } = useCurrentProfileQuery();

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

  const options = [
    <PressableOptionCell
      key="groupName"
      title={group?.title || "No Group"}
      subheading="Budget name"
      onPress={() => {}}
      icon="edit"
    />,
    <PressableOptionCell
      key="profile"
      title={profile?.name || "No profile selected"}
      subheading="Current profile"
      onPress={() => {}}
      icon="edit"
    />,
    <PressableOptionCell
      key="editProfiles"
      title="Edit Profiles"
      subheading="Add or change profiles"
      onPress={() => {}}
      icon="chevron"
    />,
    <PressableOptionCell
      key="logout"
      title="Log Out"
      subheading=""
      onPress={() => {
        db.auth.signOut();
      }}
      icon="chevron"
    />
  ];
  return (
    <View className="flex-1">
      <FlatList data={options} renderItem={({ item }) => item} />
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

function OptionsCell(props: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={props.onPress || (() => void 0)} className="p-4">
      {props.children}
    </Pressable>
  );
}

function PressableOptionCell(props: {
  title: string;
  subheading: string;
  onPress: () => void;
  icon: "edit" | "chevron";
}) {
  return (
    <Pressable onPress={props.onPress} className="p-4">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold">{props.title}</Text>
          <Text className="text-sm text-gray-500">{props.subheading}</Text>
        </View>
        <View>
          {props.icon === "edit" && <Text className="text-lg">✏️</Text>}
          {props.icon === "chevron" && <Text className="text-lg">➡️</Text>}
        </View>
      </View>
    </Pressable>
  );
}
