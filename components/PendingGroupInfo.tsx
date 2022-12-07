import React from "react";
import { View, StyleSheet } from "react-native";
import PopDown from "./PopDown";

export default function PendingGroupInfo({ groupId }: { groupId: string }) {

    return(
        <View style={styles.groupInfo}>
                    <PopDown />
                    <p style={styles.info}>Info</p>
                    <View style={styles.infoList}>
                        <li><span>Group Id: </span>{groupId}</li>
                    </View>
                    <View style={styles.buttons}>
                        <button style={styles.leaveGroup}>Cancel Request</button>
                    </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cloader: {

    },
    error: {

    },
    groupInfo: {

    },
    info: {

    },
    infoList: {

    },
    users: {

    },
    particapantListItem: {

    },
    accept: {

    },
    buttons: {

    },
    leaveGroup: {

    }
});