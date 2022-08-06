import React, { useState, useEffect } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import UserItem from "../components/UserItem";
import { User } from "../src/models";
import { Auth } from "aws-amplify";

export default function ContactsScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        DataStore.query(User, (u) => u.sub("ne", authUser.sub)).then(setUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
