import React, { useState, useEffect } from "react";

import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import UserItem from "../components/UserItem";
import { User } from "../src/models";
import { Auth } from "aws-amplify";

export default function ContactsScreen({ navigation }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

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
