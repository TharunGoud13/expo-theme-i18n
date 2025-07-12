import { router } from "expo-router";
import { Shield } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";

export default function SignIn() {
  return (
    <View className="flex-1 gap-3.5 w-full items-center justify-center">
      <View className=" w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          keyboardType="email-address"
          placeholder="Enter email"
        />
      </View>
      <View className=" w-full">
        <Label htmlFor="email">Password</Label>
        <Input secureTextEntry id="email" placeholder="Enter email" />
      </View>
      <View className="w-full">
        <Button onPress={() => router.push("/(authenticated)")}>
          <Text>Sign In</Text>
        </Button>
      </View>

      <View className="flex-row w-full  items-center gap-4">
        <Separator className="my-4 w-[120px]" />
        <Text>OR</Text>
        <Separator className="my-4 w-[120px]" />
      </View>
      <View className="gap-3.5 w-full">
        <View className=" w-full">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter email" />
        </View>

        <View className="bg-muted p-2.5 rounded-md w-full">
          <View className="flex-row items-center gap-2.5">
            <Shield size={18} color={"#3b82f6"} className=" text-blue-500" />
            <Text className="font-semibold">OTP Verification</Text>
          </View>
          <Text
            selectable
            selectionColor={"red"}
            className="text-blue-500 text-sm"
          >
            We&#39;ll send verification code to your email.
          </Text>
        </View>
        <View className="w-full">
          <Button>
            <Text>Sign In with OTP</Text>
          </Button>
        </View>
      </View>
      <View className="bg-muted p-2.5  w-full">
        <Text>Secure . Multiple Auth Options . Privacy Protected</Text>
      </View>
    </View>
  );
}
