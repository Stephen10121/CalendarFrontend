import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import React, { useState } from 'react'
import { createGroup } from '../functions/backendFetch'
import Input from './Input'
import Checkbox from 'expo-checkbox';
import { ReduxState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateGroup({ close }: { close: () => any }) {
  const groups = useSelector<ReduxState, ReduxState["groups"]>((state: ReduxState) => state.groups);
  const token = useSelector<ReduxState, string>((state: ReduxState) => state.token);
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [repeatGroupPassword, setRepeatGroupPassword] = useState("");
  const [aboutGroup, setAboutGroup] = useState("");
  const [error, setError] = useState("");
  
  async function createGroupButton() {
    if (groupPassword !== repeatGroupPassword) {
        setError("The Passwords dont match.");
        return
    }
    const data = await createGroup(groupId, groupName, groupPassword, isChecked, aboutGroup, token);
    if (data.error || !data.data) {
      dispatch({ type: "SET_ERROR", payload: { show: true, type: "alrt", message: data.error} });
      return
    }
    console.log(data.data);
    dispatch({ type: "SET_ERROR", payload: { show: true, type: "success", message: "Success"} });
    dispatch({ type: "SET_USER_GROUPS", payload: [...groups, data.data] });
    close();
  }
  if (Platform.OS === "web") {
    return(
        <View style={styles.joinGroup}>
            <View style={styles.nonScroll}>
                <Input change={setGroupName} placeHolder="Group Name"/>
                <Input change={setGroupId} placeHolder="Set Group ID" marginTop={25}/>
                <Input change={setGroupPassword} placeHolder="Group Password" marginTop={25}/>
                <Input change={setRepeatGroupPassword} placeHolder="Repeat Group Password" marginTop={25}/>
                <Input change={setAboutGroup} placeHolder="About Group" marginTop={25} multiLine={true}/>
                <View style={styles.checkboxPart}>
                    <Text style={styles.checkboxText}>Allow others to add Jobs</Text>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                </View>
                <TouchableOpacity style={styles.acceptButton} onPress={createGroupButton}><Text style={styles.acceptButtonText}>Make Group</Text></TouchableOpacity>
                <Text style={styles.error}>{error}</Text>
            </View>
        </View>
    );
  }
  return (
        <KeyboardAvoidingView behavior="padding" style={styles.joinGroup}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.nonScroll}>
                    <Input change={setGroupName} placeHolder="Group Name"/>
                    <Input change={setGroupId} placeHolder="Set Group ID" marginTop={25}/>
                    <Input change={setGroupPassword} placeHolder="Group Password" marginTop={25}/>
                    <Input change={setRepeatGroupPassword} placeHolder="Repeat Group Password" marginTop={25}/>
                    <Input change={setAboutGroup} placeHolder="About Group" marginTop={25} multiLine={true}/>
                    <View style={styles.checkboxPart}>
                        <Text style={styles.checkboxText}>Allow others to add Jobs</Text>
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    </View>
                    <TouchableOpacity style={styles.acceptButton} onPress={createGroupButton}><Text style={styles.acceptButtonText}>Make Group</Text></TouchableOpacity>
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
    overflow: "scroll",
    flex: 1
  },
  nonScroll: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
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
    marginTop: 42
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
},
checkboxPart: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 25,
    width: "100%"
},
checkboxText: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
},
checkbox: {
    margin: 8,
}
});