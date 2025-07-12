// import { useRouter } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Tabs1 } from "~/components/ui/Tabs1";
import { Text } from "~/components/ui/text";
import SignUp from "../../components/auth/signup";
import SignIn from "../../components/auth/signin";

export default function Login() {
  //   const router = useRouter();
  const platform = Platform.OS;
  const [selected, setSelected] = React.useState("Sign In");
  return (
    <SafeAreaView className="flex-1 pt-5 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={platform === "ios" ? "height" : "padding"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          className="flex-1"
        >
          <View
            className={`w-full items-center ${platform === "web" && "pt-5"}`}
          >
            <Card
              className={`w-full shadow-lg bg-background items-center p-2.5 max-w-sm`}
            >
              <CardHeader className="gap-2.5 items-center">
                <View className="items-center">
                  <View className="bg-muted p-4 mx-auto rounded-full">
                    <MessageCircle className="w-5 h-5 text-foreground" />
                  </View>
                </View>
                <Text className="text-xl font-semibold">Amoga Apps</Text>
                <CardDescription>Sign in to your account</CardDescription>
              </CardHeader>
              <View className="w-full  flex-shrink">
                <Tabs1
                  tabs={["Sign In", "Sign Up"]}
                  active={selected}
                  setActive={setSelected}
                />
              </View>
              <CardContent className="w-full mt-2">
                {selected === "Sign In" && <SignIn />}
                {selected === "Sign Up" && <SignUp />}
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
