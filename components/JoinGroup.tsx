import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { useState } from 'react'
import { joinGroup, PendingGroupsType } from '../functions/backendFetch'
import Input from './Input'

export default function JoinGroup({ addPendingGroup, token, close }: { addPendingGroup: (group: PendingGroupsType) => any, token: string, close: () => any }) {
  const [groupId, setGroupId] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function joinGroupButton() {
    const data = await joinGroup(groupId, groupPassword, token);
    if (data.error) {
      setError(data.error);
      setSuccess("");
      return
    }
    console.log(data);
    if (!data.groupName || !data.message) {
      setError("Failed to join group.");
      setSuccess("");
      return
    }
    setError("");
    addPendingGroup({ groupId, groupName: data.groupName });
    setSuccess(data.message);
    close();
  }
  if (Platform.OS === "web") {
    return(
      <View style={styles.joinGroup}>
        <View style={styles.nonScroll}>
          <Input change={setGroupId} placeHolder="Group ID"/>
          <Input change={setGroupPassword} placeHolder="Group Password" marginTop={25}/>
          <TouchableOpacity style={styles.acceptButton} onPress={joinGroupButton}><Text style={styles.acceptButtonText}>Join Group</Text></TouchableOpacity>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.success}>{success}</Text>
        </View>
    </View>)
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.joinGroup}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.nonScroll}>
          <Input change={setGroupId} placeHolder="Group ID"/>
          <Input change={setGroupPassword} placeHolder="Group Password" marginTop={25}/>
          <TouchableOpacity style={styles.acceptButton} onPress={joinGroupButton}><Text style={styles.acceptButtonText}>Join Group</Text></TouchableOpacity>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.success}>{success}</Text>
        </View>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  joinGroup: {
    marginTop: 15,
    paddingHorizontal: 30,
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f3f3",
    overflow: "scroll"
  },
  nonScroll: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  acceptButton: {
    borderRadius: 2,
    backgroundColor: "#3A9FE9",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Poppins-SemiBold",
    padding: 5,
    letterSpacing: 1,
    marginRight: 5,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
},
acceptButtonText: {
  fontSize: 16,
  fontWeight: "700",
  fontFamily: "Poppins-SemiBold",
  color: "#FFFFFF"
},
error: {
  fontSize: 15,
  fontWeight: "700",
  fontFamily: "Poppins-SemiBold",
  color: "red",
  marginTop: 20
},
success: {
  fontSize: 15,
  fontWeight: "700",
  fontFamily: "Poppins-SemiBold",
}
});