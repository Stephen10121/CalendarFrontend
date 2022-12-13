import { useState } from "react";
import { cancelRequest } from "../functions/backendFetch";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import PopDown, { MessageType } from "./PopDown";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers";

export default function PendingGroupInfo({ groupId, name, close }: { groupId: string, name: string, close: () => any }) {
    const pendingGroups = useSelector<ReduxState, ReduxState["pendingGroups"]>((state: ReduxState) => state.pendingGroups);
    const token = useSelector<ReduxState, string>((state: ReduxState) => state.token);
    const dispatch = useDispatch();

    async function leavePendingGroupPrompt() {
        console.log(groupId, token)
        const response = await cancelRequest(groupId, token);
        if (response.error || !response.message) {
            dispatch({ type: "SET_ERROR", payload: {message: response.error, type: "alert", show: true} });
            return;
        }
        let newGroups = [];
        for (let i=0;i<pendingGroups.length;i++){
            if (pendingGroups[i].groupId !== groupId) {
                newGroups.push(pendingGroups[i]);
            }
        }
        dispatch({ type: "SET_USER_PENDING_GROUPS", payload: newGroups });
        dispatch({ type: "SET_ERROR", payload: {message: response.message, type: "success", show: true} });
        close();
    }

    return(
        <ScrollView style={styles.groupInfo}>
            <Text style={styles.info}>Info</Text>
            <View style={styles.infoList}>
                <Text style={styles.li2}>• Group Name: <Text style={styles.span}>{name}</Text></Text>
                <Text style={styles.li2}>• Group Owner: <Text style={styles.span}>Not Available</Text></Text>
                <Text style={styles.li2}>• Group Id: <Text style={styles.span}>{groupId}</Text></Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.leaveGroup2} onPress={leavePendingGroupPrompt}><Text style={styles.leaveText}>Cancel Request</Text></TouchableOpacity>
            </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
    groupInfo: {
        padding: 25,
        overflow: "scroll",
        width: "100%",
        height: "100%",
        position: "relative"
    },
    info: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    infoList: {
        paddingHorizontal: 10,
    },
    li2: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: "700",
        color: "#646464",
        fontFamily: "Poppins-SemiBold"
    },
    span: {
        color: "#000000",
        marginTop: 5,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold"
    },
    buttons: {
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    leaveGroup2: {
        marginLeft: 5,
        borderRadius: 2,
        backgroundColor: "#EE3F3f",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 10,
        letterSpacing: 1
    },
    leaveText: {
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF"
    }
});