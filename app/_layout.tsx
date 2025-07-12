// _layout.tsx
import "~/global.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { ThemeProvider, useAppTheme } from "~/components/themes/useTheme";
import Language from "~/components/Language";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useAppTheme();

  return (
    <View className={`flex-1 bg-background text-foreground ${theme}`}>
      <StatusBar />
      {/* <KeyboardProvider statusBarTranslucent navigationBarTranslucent> */}
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerTitle: "Login",
            headerRight: () => <ThemeToggle />,
          }}
        />
        <Stack.Screen
          name="(authenticated)"
          options={{
            headerTitle: "Home",
            headerRight: () => (
              <View className="flex-row items-center gap-2.5">
                <ThemeToggle />
                <Language />
              </View>
            ),
          }}
        />
      </Stack>
      {/* </KeyboardProvider> */}
      <PortalHost />
    </View>
  );
}
