import React, { useContext, useEffect, useState } from "react";

import { Text, Image, View, StyleSheet, FlatList } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";
import ChatRoomItem from "../components/ChatRoomItem";
import { UserContext } from "../navigation";

export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const authUser = useContext(UserContext);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser?.user?.sub === authUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
});
