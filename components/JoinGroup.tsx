import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { useState } from 'react'
import { joinGroup } from '../functions/backendFetch'
import Input from './Input'
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../redux/reducers';

export default function JoinGroup({ close }: { close: () => any }) {
  const pendingGroups = useSelector<ReduxState, ReduxState["pendingGroups"]>((state: ReduxState) => state.pendingGroups);
  const token = useSelector<ReduxState, string>((state: ReduxState) => state.token);
  const dispatch = useDispatch();
  const [groupId, setGroupId] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [error, setError] = useState("");

  async function joinGroupButton() {
    const data = await joinGroup(groupId, groupPassword, token);
    if (data.error) {
      setError(data.error);
      return
    }
    if (!data.groupName || !data.message) {
      setError("Failed to join group.");
      return
    }
    setError("");
    dispatch({ type: "SET_USER_PENDING_GROUPS", payload: [...pendingGroups, { groupId, groupName: data.groupName }] });
    dispatch({ type: "SET_ERROR", payload: { show: true, type: "success", message: data.message} });
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