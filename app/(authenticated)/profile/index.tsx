// app/(authenticated)/profile/index.tsx
import { View } from "react-native";
import MobileView from "~/components/profile/MobileView"; // ⬅️ use `@` or `~` alias as configured

export default function Profile() {
  return (
    <View className="flex-1 bg-background">
      <MobileView />
    </View>
  );
}
