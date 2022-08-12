import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import UserItem from "../components/UserItem";
import NewGroupButton from "../components/NewGroupButton";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../src/models";
import { UserContext } from "../navigation";

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const authUser = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  const addUserToChatRoom = async (user, chatroom) => {
    console.log("USER:\n" + user.id);
    console.log("CHATROOM:\n" + chatroom.id);

    const test: ChatRoomUser = await DataStore.save(
      new ChatRoomUser({ user, chatroom })
    );
    console.log("TEST\n");
    console.log("TEST id:\n" + test.id);
    console.log("TEST user:\n" + test.user.id);
    console.log("TEST chatroom:\n" + test.chatRoom.id);
  };

  const createChatRoom = async (users) => {
    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.

    // connect authenticated user with the chat room
    const dbUser: User = await DataStore.query(User, (u) =>
      u.sub("eq", authUser.attributes.sub)
    );
    if (!dbUser) {
      Alert.alert("There was an error creating the group");
      return;
    } else if (dbUser.id === undefined) return;
    // Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      Admin: dbUser,
    };
    if (users.length > 1) {
      newChatRoomData.name = "New group 2";
      newChatRoomData.imageUri =
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      console.log("sub " + authUser.attributes.sub);
      console.log("dbUser " + dbUser.id);
      console.log("dbUser " + dbUser.name);
      console.log("dbUser " + dbUser.sub);
      console.log("dbUser " + dbUser.updatedAt);
      console.log("users " + users[0]);
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    // connect users user with the chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );
    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        // remove it from selected
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };

  const saveGroup = async () => {
    await createChatRoom(selectedUsers);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={() => onUserPress(item)}
            isSelected={isNewGroup ? isUserSelected(item) : undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
        )}
      />

      {isNewGroup && (
        <Pressable style={styles.button} onPress={saveGroup}>
          <Text style={styles.buttonText}>
            Save group ({selectedUsers.length})
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
