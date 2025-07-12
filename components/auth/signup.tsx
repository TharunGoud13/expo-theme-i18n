import { MessageCircle, Shield } from "lucide-react-native";
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

export default function SignUp() {
  return (
    <View className="flex-1 gap-3.5 items-center justify-center">
      <View className=" w-full">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter Full Name" />
      </View>
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
        <Button>
          <Text>Create Account & Send OTP</Text>
        </Button>
      </View>
      <View className="gap-3.5 w-full">
        <View className="bg-muted p-2.5 rounded-md w-full">
          <View className="flex-row items-center gap-2.5">
            <Shield size={18} color={"#22c55e"} className=" text-green-500" />
            <Text className="font-semibold">Create Account</Text>
          </View>
          <Text
            selectable
            selectionColor={"red"}
            className="text-green-500 text-sm"
          >
            We&#39;ll send an OTP to your email to verify your account.
          </Text>
        </View>
      </View>
      <View className="bg-muted p-2.5  w-full">
        <Text>Secure . Multiple Auth Options . Privacy Protected</Text>
      </View>
    </View>
  );
}
