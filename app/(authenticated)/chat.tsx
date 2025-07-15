import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../lib/colors";
import icons from "../../lib/icons";
// import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useAppTheme } from "~/components/themes/useTheme";
import { Button } from "react-native";
import supabaseClient from "~/lib/supabaseClient";
import {
  Forward,
  Reply,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react-native";
import db from "~/database";
import { Q } from "@nozbe/watermelondb";
import * as Network from "expo-network";
import { adapter } from "~/database";

// Inbox Chat
const Chat = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [status, setStatus] = useState("");
  const { theme } = useAppTheme();

  const handleInputText = (text: any) => {
    setInputMessage(text);
  };

  useEffect(() => {
    const onlineStatus = async () => {
      const status = await Network.getNetworkStateAsync();
      if (status.isConnected) {
        setStatus("Online");
        Alert.alert("Connected to Internet");
      } else {
        setStatus("Offline");
        Alert.alert("No Internet Connection");
      }
    };
    onlineStatus();
  }, []);

  console.log(status);

  // get messages from watermelon db in realtime
  useEffect(() => {
    const messageCollection = db.get("message");
    const observable = messageCollection
      .query(Q.where("room_id", 100))
      .observe();
    const subscribe = observable.subscribe((record) => {
      const localMessages = record.map((m: any) => ({
        id: m.id,
        content: m.content,
        createdAt: m.createdAt,
      }));
      console.log("local-----", localMessages);
      setMessages(localMessages);
    });
    return () => subscribe.unsubscribe();
  }, []);

  //submit fn, save the message to watermelon and supabase db
  const handleSubmit = async () => {
    if (!inputMessage) return;

    console.log("Saving to watermelon......");

    try {
      // first save to watermelon
      await db.write(async () => {
        const messagesCollection = db.get("message");
        await messagesCollection.create((msg: any) => {
          msg.content = inputMessage;
          msg.userId = 100;
          msg.roomId = 100;
          msg.createdAt = Date.now();
          msg.isSynced = false;
        });
      });
      setInputMessage("");

      console.log("Checking network status......");

      const net = await Network.getNetworkStateAsync();
      // if user is online only then save to supabase
      if (net.isConnected) {
        await syncPendingMessagesToSupabase();
      }
    } catch (error) {
      console.log("❌Error------", error);
    }
  };

  // Sync all unsynced messages to Supabase
  const syncPendingMessagesToSupabase = async () => {
    const messagesCollection = db.get("message");
    const pendingMessages = await messagesCollection
      .query(Q.where("is_synced", false))
      .fetch();

    for (const msg of pendingMessages) {
      const { content, userId, room_id, createdAt } = msg;
      const { error } = await supabaseClient.from("message").insert({
        content,
        user_id: userId,
        soc_room_id: room_id,
        createdAt: new Date(createdAt),
      });

      if (!error) {
        await db.write(async () => {
          await msg.update((m: any) => {
            m.isSynced = true;
          });
        });
      }
    }
  };

  // Realtime socket sync from Supabase to WatermelonDB
  useEffect(() => {
    const channel = supabaseClient
      .channel("room:100")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: "soc_room_id=eq.100",
        },
        async (payload) => {
          const { content, user_id, soc_room_id, createdAt } = payload.new;
          await db.write(async () => {
            const messagesCollection = db.get("message");
            const exists = await messagesCollection
              .query(
                Q.where("content", content),
                Q.where("created_at", new Date(createdAt).getTime())
              )
              .fetch();

            if (exists.length === 0) {
              await messagesCollection.create((msg: any) => {
                msg.content = content;
                msg.userId = user_id;
                msg.roomId = soc_room_id;
                msg.createdAt = new Date(createdAt).getTime();
                msg.isSynced = true;
              });
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await adapter.unsafeResetDatabase(() => {});
  //     console.log("✅ DB reset successfully.");
  //   })();
  // }, []);

  useEffect(() => {
    console.log("🔄 Messages updated:", messages);
  }, [messages]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          <StatusBar hidden={true} />

          <View className="flex-1" style={[{ backgroundColor: theme }]}>
            <View className="flex-1 gap-2.5 h-full">
              {messages &&
                messages?.length > 0 &&
                messages.map((item, index) => (
                  <View
                    key={item.id}
                    className="bg-gray-200  p-2.5 rounded-md mx-2"
                  >
                    <Text>{new Date(item.createdAt).toLocaleString()}</Text>
                    <Text>{item.content}</Text>
                    <View className="flex-row gap-2.5 items-center">
                      <Star size={18} />
                      <ThumbsUp size={18} />
                      <ThumbsDown size={18} />
                      <ThumbsUp size={18} />
                      <Reply size={18} />
                      <Forward size={18} />
                    </View>
                  </View>
                ))}
            </View>
            <Button title="Sync" onPress={syncPendingMessagesToSupabase} />

            <View
              className="flex-row gap-2.5 items-center"
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme,
                },
              ]}
            >
              <View
                className="flex-row items-center gap-2.5"
                style={[
                  styles.inputMessageContainer,
                  {
                    backgroundColor: theme,
                  },
                ]}
              >
                <TextInput
                  className="border w-[85%] rounded-full"
                  value={inputMessage}
                  onChangeText={handleInputText}
                  placeholderTextColor={COLORS.gray}
                  placeholder="Enter your message..."
                />
                <Button title="Send" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginLeft: 22,
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 12,
  },
  chatContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputMessageContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    backgroundColor: COLORS.grayscale100,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  attachmentIconContainer: {
    marginRight: 12,
  },
  input: {
    color: COLORS.gray,
    flex: 1,
    paddingHorizontal: 10,
  },
  microContainer: {
    height: 48,
    width: 48,
    borderRadius: 49,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});

export default Chat;
