import * as React from "react";
import { Button, KeyboardAvoidingView, TextInput, View } from "react-native";
// import { onTranslateTask } from "expo-translate-text";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

import { useTranslation } from "react-i18next";

import { Separator } from "~/components/ui/separator";
import i18n from "../../i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Screen() {
  const { t } = useTranslation();
  const [text, setText] = React.useState("Hello World, Welcome to Amoga Apps");
  const current = i18n.language;

  // const translateText = async () => {
  //   try {
  //     const result = await onTranslateTask({
  //       input: "Hello, world!",
  //       sourceLangCode: "en",
  //       targetLangCode: "es",
  //     });
  //     console.log(result.translatedTexts); // "¡Hola, mundo!"
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // React.useEffect(() => {
  //   translateText();
  // }, []);

  const handleTranslate = (text: string) => {
    const translate = async () => {
      try {
        const response = await fetch(
          `https://ftapi.pythonanywhere.com/translate?sl=en&dl=${current}&text=${text}`
        );

        const result = await response.json();

        // ✅ Make sure this key matches the actual API response
        const translated = result["destination-text"];
        setText(translated);
      } catch (error) {
        throw error;
      }
    };

    translate();
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <View className="flex-1 justify-center bg-background text-foreground items-center gap-5 p-6 bg-colors">
          <Card className="w-full max-w-sm p-6 rounded-2xl">
            <Text>{t("home_screen.welcome")}</Text>
            <Text>{t("home_screen.title")}</Text>
            <Text>{t("home_screen.description")}</Text>
          </Card>
          <Card className="w-full gap-2.5 p-6 max-w-sm">
            <Text>Auto Translates</Text>
            <Separator />
            <TextInput
              className="border rounded-md"
              placeholder="Enter text"
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Text>{text}</Text>
            <Button title="Translate" onPress={() => handleTranslate(text)} />
          </Card>
        </View>
        <Button
          title="Profile"
          onPress={() => router.push("/(authenticated)/profile")}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
