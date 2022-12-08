import { useEffect, useState } from "react";
import GroupInfo from "./GroupInfo";
import { GroupsType, PendingGroupsType } from "../functions/backendFetch";
import PendingGroupInfo from "./PendingGroupInfo";
import SlideUp, { SlideUpData } from "./SlideUp";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import GroupIcon from "./GroupIcon";
import JoinGroup from "./JoinGroup";
import { RemoveGroup, RemovePendingGroup } from "./loggedIn/LoggedIn";
import CreateGroup from "./CreateGroup";

export default function GroupSection({ groups, pendingGroups, token, error, addGroup, addPendingGroup, removeGroup, removePendingGroup }: { groups: GroupsType[], pendingGroups: PendingGroupsType[], token: string, error: any, addGroup: (group: GroupsType) => any, addPendingGroup: (group: PendingGroupsType) => any, removeGroup: RemoveGroup, removePendingGroup: RemovePendingGroup }) {
    const [showSlideUp, setShowSlideUp] = useState<SlideUpData>({show: false, header: "N/A", children: null, border:"black"});

    useEffect(() => {
        console.log(token);
        console.log(groups)
    }, []);

    function groupClicked(groupId: string, name: string, othersCanAdd: boolean) {
        setShowSlideUp({ show: true, header: name, children: <GroupInfo removeGroup={removeGroup} token={token} groupId={groupId} othersCanAdd={othersCanAdd}/>, border: "black" });
    }

    function pendingGroupClicked(groupId: string, name: string, _othersCanAdd: boolean) {
        setShowSlideUp({ show: true, header: name, children: <PendingGroupInfo removePendingGroup={removePendingGroup} name={name} token={token} groupId={groupId} />, border: "black" });
    }

    function joinGroupClicked() {
        setShowSlideUp({ show: true, header: "Join Group", children: <JoinGroup token={token} addPendingGroup={addPendingGroup} />, border: "blue" });
    }

    function createGroupClicked() {
        setShowSlideUp({ show: true, header: "Create Group", children: <CreateGroup token={token} addGroup={addGroup} />, border: "red" });
    }

    return (
        <View style={styles.home}>
            {showSlideUp.show ? <SlideUp border={showSlideUp.border} close={() => setShowSlideUp({...showSlideUp, show: false})} header={showSlideUp.header}>{showSlideUp.children}</SlideUp> : null}
            <View style={styles.greeting}>
                <Text style={styles.welcome}>Groups</Text>
                {error.length !== 0 ? <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View> : null}
            </View>
            <View style={styles.comingUp}>
                <Text style={styles.title}>Joined/Created</Text>
                { groups.length === 0 ? <View style={styles.nogroup}><Text style={styles.nogroupText}>No Groups</Text></View> : null }
                <View style={styles.comingUpList}>
                    {groups ? groups.map((group) => <GroupIcon key={group.groupId} id={group.groupId} name={group.groupName} owner={group.groupOwner} othersCanAdd={group.othersCanAdd} click={groupClicked}/>) : <div style={styles.nogroup}><p>No Groups</p></div>}
                </View>
            </View>
            {pendingGroups.length !== 0 ? 
            <View style={styles.available}>
                <Text style={styles.title}>Pending</Text>
                <View style={styles.comingUpList}>
                {pendingGroups.map((group) => <GroupIcon key={group.groupId} id={group.groupId} name={group.groupName} othersCanAdd={false} owner="Anonymous" click={pendingGroupClicked}/>)}
                </View>
            </View> : null }
            <View style={styles.groupButtons}>
                <TouchableOpacity onPress={joinGroupClicked} style={styles.joinGroup}><Text style={styles.buttonText}>Join Group</Text></TouchableOpacity>
                <TouchableOpacity onPress={createGroupClicked} style={styles.createGroup}><Text style={styles.buttonText}>Create Group</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        paddingBottom: 10
    },
    greeting: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    welcome: {
        fontSize: 35,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    name: {
        fontSize: 30,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    comingUp: {
        width: "100%",
        paddingHorizontal: 23
    },
    title: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    comingUpList: {
        paddingTop: 10,
        flexDirection: "column"
    },
    nogroup: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    nogroupText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    available: {
        width: "100%",
        paddingHorizontal: 23,
        marginTop: 20
    },
    error: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        fontSize: 13,
        fontWeight: "700",
        color: "red",
        fontFamily: "Poppins-SemiBold"
    },
    groupButtons: {
        width: "100%",
        paddingHorizontal: 23,
        marginTop: 20
    },
    joinGroup: {
        borderRadius: 10,
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        backgroundColor: "#3A9FE9"
    },
    createGroup: {
        borderRadius: 10,
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        marginTop: 10,
        backgroundColor: "#EE3F3f"
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    }
});