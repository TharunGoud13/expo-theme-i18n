import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text"; // or React Native's Text

export function Tabs1({
  tabs,
  active,
  setActive,
}: {
  tabs: string[];
  active: string;
  setActive: (value: string) => void;
}) {
  return (
    <View className="flex-row w-full items-center bg-muted p-1 rounded-md">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActive(tab)}
          className={`px-4 py-2 flex-1 items-center rounded-md ${
            tab === active ? "bg-muted shadow text-blue-500" : "bg-muted/10"
          }`}
        >
          <Text className={`text-sm font-semibold`}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
