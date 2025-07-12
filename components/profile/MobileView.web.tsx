import * as React from "react";
import { Button, KeyboardAvoidingView, TextInput, View } from "react-native";
// import { onTranslateTask } from "expo-translate-text";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

import { SafeAreaView } from "react-native-safe-area-context";

export default function MobileView() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <View className="flex-1 justify-center bg-background text-foreground items-center gap-5 p-6 bg-colors">
          <Card className="w-full max-w-sm p-6 rounded-2xl">
            <Text>Profile Page</Text>
            <Text>Demo User</Text>
            <Text>@Demo User</Text>
            <Text>Logout</Text>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
