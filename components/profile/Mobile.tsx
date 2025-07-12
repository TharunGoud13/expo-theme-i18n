// // import { Icon } from "@roninoss/icons";
// import { router, Stack } from "expo-router";
// import { Linking, Platform, View } from "react-native";

// import { Avatar, AvatarFallback } from "~/components/nativewindui/Avatar";
// import { Button } from "~/components/nativewindui/Button";
// import {
//   ESTIMATED_ITEM_HEIGHT,
//   List,
//   ListItem,
//   ListRenderItemInfo,
//   ListSectionHeader,
// } from "~/components/nativewindui/List";
// import { Text } from "~/components/nativewindui/Text";
// import { cn } from "~/lib/cn";
// import { useColorScheme } from "~/lib/useColorScheme";

// const SCREEN_OPTIONS = {
//   title: "Profile",
//   headerTransparent: Platform.OS === "ios",
//   headerBlurEffect: "systemMaterial",
// } as const;

// const ESTIMATED_ITEM_SIZE =
//   ESTIMATED_ITEM_HEIGHT[Platform.OS === "ios" ? "titleOnly" : "withSubTitle"];

// export default function MobileView() {
//   if (Platform.OS === "web") {
//     return (
//       <View>
//         <Text>This is Profile Page</Text>
//       </View>
//     );
//   }
//   return (
//     <View className="bg-background flex-1">
//       <Stack.Screen options={SCREEN_OPTIONS} />
//       <List
//         variant="insets"
//         data={DATA}
//         sectionHeaderAsGap={Platform.OS === "ios"}
//         estimatedItemSize={ESTIMATED_ITEM_SIZE}
//         renderItem={renderItem}
//         ListHeaderComponent={<ListHeaderComponent />}
//         ListFooterComponent={<ListFooterComponent />}
//       />
//     </View>
//   );
// }

// function renderItem(info: ListRenderItemInfo<DataItem>) {
//   return <Item info={info} />;
// }

// function Item({ info }: { info: ListRenderItemInfo<DataItem> }) {
//   //   const { colors } = useColorScheme();

//   if (typeof info.item === "string") {
//     return <ListSectionHeader {...info} />;
//   }
//   return (
//     <ListItem
//       titleClassName="text-lg"
//       rightView={
//         <View className="flex-1 flex-row items-center gap-0.5 px-2">
//           {!!info.item.value && (
//             <Text className="text-muted-foreground">{info.item.value}</Text>
//           )}
//           {/* <Icon name="chevron-right" size={22} /> */}
//         </View>
//       }
//       onPress={info.item.onPress}
//       {...info}
//     />
//   );
// }

// function ListHeaderComponent() {
//   return (
//     <View className="ios:pb-8 items-center pb-4  pt-8">
//       <Avatar alt="Demo User" className="h-24 w-24">
//         <AvatarFallback>
//           <Text
//             variant="largeTitle"
//             className={cn(
//               " font-medium text-foreground",
//               Platform.OS === "ios" && "dark:text-foreground"
//             )}
//           >
//             DU
//           </Text>
//         </AvatarFallback>
//       </Avatar>
//       <View className="p-1" />
//       <Text variant="title1">Demo User</Text>
//       <Text className="text-muted-foreground">@demo.user@gmail.com</Text>
//     </View>
//   );
// }

// function ListFooterComponent() {
//   return (
//     <View className="ios:px-0 px-4 pt-8">
//       <Button
//         size="lg"
//         variant={Platform.select({ ios: "primary", default: "secondary" })}
//         className="border-border bg-card"
//       >
//         <Text className="text-destructive">Log Out</Text>
//       </Button>
//     </View>
//   );
// }

// type DataItem =
//   | string
//   | {
//       id: string;
//       title: string;
//       value?: string;
//       subTitle?: string;
//       onPress: () => void;
//     };

// const DATA: DataItem[] = [
//   ...(Platform.OS !== "ios" ? ["Basic info"] : []),
//   {
//     id: "name",
//     title: "Name",
//     ...(Platform.OS === "ios"
//       ? { value: "Demo User" }
//       : { subTitle: "Demo User" }),
//     onPress: () => router.push("/profile/name"),
//   },
//   {
//     id: "username",
//     title: "Username",
//     ...(Platform.OS === "ios"
//       ? { value: "@Demo User" }
//       : { subTitle: "@Demo User" }),
//     onPress: () => router.push("/profile/username"),
//   },
//   ...(Platform.OS !== "ios" ? ["Stay up to date"] : [""]),
//   {
//     id: "4",
//     title: "Notifications",
//     ...(Platform.OS === "ios" ? { value: "Push" } : { subTitle: "Push" }),
//     onPress: () => router.push("/(authenticated)/profile/notification"),
//   },
//   "Help",
//   {
//     id: "6",
//     title: "Support",
//     ...(Platform.OS === "ios" ? { value: "Discord" } : { subTitle: "Discord" }),
//     onPress: () => Linking.openURL("https://nativewindui.com/discord"),
//   },
//   {
//     id: "7",
//     title: "About",
//     ...(Platform.OS === "ios"
//       ? { value: "NativewindUI" }
//       : { subTitle: "NativewindUI" }),
//     onPress: () => Linking.openURL("https://nativewindui.com/"),
//   },
// ];
