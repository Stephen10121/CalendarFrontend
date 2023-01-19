import { useEffect, useState } from "react";
import GroupInfo from "./GroupInfo";
import PendingGroupInfo from "./PendingGroupInfo";
import SlideUp, { SlideUpData } from "./SlideUp";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import GroupIcon from "./GroupIcon";
import JoinGroup from "./JoinGroup";
import CreateGroup from "./CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../redux/types";
import { setClickGroup } from "../redux/actions";

export default function GroupSection() {
    const [showSlideUp, setShowSlideUp] = useState<SlideUpData>({show: false, header: "N/A", children: null, border:"black"});
    const groups = useSelector((state: Store) => state.groups);
    const clickGroup = useSelector((state: Store) => state.clickGroup);
    const pendingGroups = useSelector((state: Store) => state.pendingGroups);
    const [closeInternal, setCloseInternal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (clickGroup) {
            for (let i=0;i<groups.length;i++) {
                if (groups[i].groupId === clickGroup) {
                    setShowSlideUp({ show: true, header: groups[i].groupName, children: <GroupInfo close={() => setCloseInternal(true)} groupId={groups[i].groupId} othersCanAdd={groups[i].othersCanAdd}/>, border: "black" });
                }
            }
            dispatch(setClickGroup(null));
        }
    }, [clickGroup]);

    function groupClicked(groupId: string, name: string, othersCanAdd: boolean) {
        setShowSlideUp({ show: true, header: name, children: <GroupInfo close={() => setCloseInternal(true)} groupId={groupId} othersCanAdd={othersCanAdd}/>, border: "black" });
    }

    function pendingGroupClicked(groupId: string, name: string, _othersCanAdd: boolean) {
        setShowSlideUp({ show: true, header: name, children: <PendingGroupInfo close={() => setCloseInternal(true)} name={name} groupId={groupId} />, border: "black" });
    }

    function joinGroupClicked() {
        setShowSlideUp({ show: true, header: "Join Group", children: <JoinGroup close={() => setCloseInternal(true)} />, border: "blue" });
    }

    function createGroupClicked() {
        setShowSlideUp({ show: true, header: "Create Group", children: <CreateGroup close={() => setCloseInternal(true)} />, border: "red" });
    }

    return (
        <View style={styles.home}>
            <ScrollView style={styles.home2}>
                <View style={styles.greeting}>
                    <Text style={styles.welcome}>Groups</Text>
                </View>
                <View style={styles.comingUp}>
                    <Text style={styles.title}>Joined/Created</Text>
                    { groups.length === 0 ? <View style={styles.nogroup}><Text style={styles.nogroupText}>No Groups</Text></View> : null }
                    <View style={styles.comingUpList}>
                        {groups ? groups.map((group) => <GroupIcon notification={group.notification ? true: false} key={group.groupId} id={group.groupId} name={group.groupName} owner={group.groupOwner} othersCanAdd={group.othersCanAdd} click={groupClicked}/>) : <div style={styles.nogroup}><p>No Groups</p></div>}
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
            </ScrollView>
            {showSlideUp.show ? <SlideUp closeInternal={closeInternal} border={showSlideUp.border} close={() => {setShowSlideUp({...showSlideUp, show: false}),setCloseInternal(false)}} header={showSlideUp.header}>{showSlideUp.children}</SlideUp> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        position: "relative"
    },
    home2: {
        width: "100%",
        overflow: "scroll",
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
        marginBottom: 20,
        backgroundColor: "#EE3F3f"
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    }
});