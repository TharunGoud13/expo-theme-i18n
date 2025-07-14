import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
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

  return (
    <SafeAreaView
      className="bg-red-500 flex-1"
      style={
        [
          // styles.container,
          // {
          //   backgroundColor: theme,
          // },
        ]
      }
    >
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <StatusBar hidden={true} />
        <View style={[, { backgroundColor: "red" }]}>
          <View
          // style={[
          //   //   styles.header,
          //   {
          //     backgroundColor: theme,
          //   },
          // ]}
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
          <View style={styles.chatContainer}>
            {/* <GiftedChat
                        messages={messages}
                        renderInputToolbar={renderInputToolbar}
                        user={{ _id: 1 }}
                        minInputToolbarHeight={0}
                        renderMessage={renderMessage}
                    /> */}
          </View>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme,
              },
            ]}
          >
            <View
              style={[
                styles.inputMessageContainer,
                {
                  backgroundColor: theme,
                },
              ]}
            >
              <TextInput
                //   style={[
                //     styles.input,
                //     {
                //       color: theme,
                //     },
                //   ]}
                className="border rounded-full border-red-500"
                value={inputMessage}
                onChangeText={handleInputText}
                placeholderTextColor={COLORS.gray}
                placeholder="Enter your message..."
              />
              <View style={styles.attachmentIconContainer}>
                <TouchableOpacity>
                  <Feather name="image" size={24} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.microContainer,
                {
                  backgroundColor: theme,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="microphone"
                size={24}
                color={COLORS.blue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.red,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.red,
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
    backgroundColor: COLORS.red,
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
    // backgroundColor: COLORS.primary,
  },
});

export default Chat;
