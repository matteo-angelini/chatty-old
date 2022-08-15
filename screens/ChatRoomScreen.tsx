import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom, Message as MessageModel } from "../src/models";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { Auth, SortDirection } from "aws-amplify";
import { UserContext } from "../navigation";
import { User } from "../src/models";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageReplyTo, setMessageReplyTo] = useState<MessageModel | null>(
    null
  );
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const authUser = useContext(UserContext);

  const route = useRoute();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        setMessages((existingMessage) => [msg.element, ...existingMessage]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }

    console.log("param " + route.params?.id);
    const chatRoom: ChatRoom = await DataStore.query(
      ChatRoom,
      route.params?.id
    );

    if (!chatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else if (chatRoom.id === undefined) {
      console.log(chatRoom.name);
      console.log(chatRoom.createdAt);
      return;
    } else {
      console.log(chatRoom);
      setChatRoom(chatRoom);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }

    const dbUserData: User[] = await DataStore.query(User, (u) =>
      u.sub("eq", authUser.attributes.sub)
    );
    const dbUser: User = dbUserData[0];

    if (!dbUser) return;

    const myId = dbUser.id;

    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id).forUserId("eq", myId),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );

    setMessages(fetchedMessages);
  };

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            setAsMessageReply={() => setMessageReplyTo(item)}
          />
        )}
        inverted
      />
      <MessageInput
        chatRoom={chatRoom}
        messageReplyTo={messageReplyTo}
        removeMessageReplyTo={() => setMessageReplyTo(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
