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
import images from "../../lib/images";
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

// Inbox Chat
const Chat = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { theme } = useAppTheme();

  const handleInputText = (text: any) => {
    setInputMessage(text);
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: COLORS.primary,
                                marginRight: 12,
                                marginVertical: 12,
                            },
                        }}
                        textStyle={{
                            right: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    /> */}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={images.user1}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginLeft: 8,
            }}
          />
          {/* <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: COLORS.secondary,
                                marginLeft: 12,
                            },
                        }}
                        textStyle={{
                            left: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    /> */}
        </View>
      );
    }
  };

  /***
   * Implementing chat functionnality
   */
  const submitHandler = () => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    // setMessages((previousMessage: any) =>
    //     GiftedChat.append(previousMessage, [message])
    // );

    setInputMessage("");
  };

  const renderInputToolbar = () => {
    return null;
  };

  const handleSubmit = async () => {
    if (!inputMessage) return;

    const { error } = await supabaseClient.from("message").insert({
      content: inputMessage,
      user_id: 100,
      soc_room_id: 100,
      createdAt: new Date(),
    });

    if (error) {
      console.error("❌ Failed to send message", error);
      Alert.alert("Error", "Could not send message");
    } else {
      setInputMessage("");
      // No need to update `messages` manually — Realtime will do it
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabaseClient
        .from("message")
        .select("*")
        .eq("user_id", 100);

      if (!error) {
        setMessages(data);
      }
    };

    fetchMessages();

    const channel = supabaseClient
      .channel(`room:100`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: "soc_room_id=eq.100", // optional
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={[
        styles.container,
        {
          backgroundColor: theme,
        },
      ]}
    >
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          <StatusBar hidden={true} />
          <View style={[styles.contentContainer, { backgroundColor: theme }]}>
            <View
              style={[
                styles.header,
                {
                  backgroundColor: theme,
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={icons.arrowLeft}
                    resizeMode="contain"
                    style={[
                      styles.headerIcon,
                      {
                        tintColor: theme,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      color: theme,
                    },
                  ]}
                >
                  Jenny Wilona
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("videocall")}
                >
                  <Image
                    source={icons.videoCameraOutline}
                    resizeMode="contain"
                    style={[
                      styles.headerIcon,
                      {
                        tintColor: theme,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <Image
                    source={icons.moreCircle}
                    resizeMode="contain"
                    style={[
                      styles.headerIcon,
                      {
                        tintColor: theme,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-1 gap-2.5 h-full">
              {/* <GiftedChat
                        messages={messages}
                        renderInputToolbar={renderInputToolbar}
                        user={{ _id: 1 }}
                        minInputToolbarHeight={0}
                        renderMessage={renderMessage}
                    /> */}
              {messages &&
                messages?.length > 0 &&
                messages.map((item, index) => (
                  <View
                    key={item.agentMsgId}
                    className="bg-gray-200  p-2.5 rounded-md mx-2"
                  >
                    <Text>{item.createdAt}</Text>
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
                {/* <View style={styles.attachmentIconContainer}>
              <TouchableOpacity>
                <Feather name="image" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View> */}
              </View>
              {/* <TouchableOpacity
            style={[
              styles.microContainer,
              {
                backgroundColor: theme,
              },
            ]}
          >
            <MaterialCommunityIcons name="microphone" size={24} color={theme} />
          </TouchableOpacity> */}
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
