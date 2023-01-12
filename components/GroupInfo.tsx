import { useEffect, useState } from "react";
import { acceptParticapant, declineParticapant, deleteGroup, groupInfo, GroupInfoData, GroupInfoResponse, leaveGroup, Particapant, removeParticapant } from "../functions/backendFetch";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { dayToLetter, monthToLetter } from "../functions/dateConversion";
import { Store } from "../redux/types";
import { setError, setUserGroups } from "../redux/actions";
import { useQuery } from "react-query";

export default function GroupInfo({ groupId, othersCanAdd, close }: { groupId: string, othersCanAdd: boolean, close: () => any }) {
    const groups = useSelector((state: Store) => state.groups);
    const token = useSelector((state: Store) => state.token);
    const [data2, setData] = useState<null | GroupInfoData>(null);
    const [date, setDate] = useState<string | null>(null);
    const [error2, setError2] = useState<any>(null);
    const [delete2, setDelete] = useState(false);
    const [ownerLeave, setOwnerLeave] = useState(false);
    const [currentTransfer, setCurrentTransfer] = useState(0);
    const { status, error, data } = useQuery<GroupInfoResponse, Error>(["groupInfo"], async () => await groupInfo(groupId, token), {
        staleTime: 30000,
        refetchInterval: 30000,
        cacheTime: 0
      });
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(data, error, status);
        if (status === "success") {
            setData(data.data);
            try {
                const unformattedDate = new Date(data.data.created);
                setDate(`${dayToLetter[unformattedDate.getDay()]}, ${monthToLetter[unformattedDate.getMonth()]} ${unformattedDate.getDate()}, ${unformattedDate.getFullYear()}.`);
            } catch (_err) {
                setDate("N/A");
            }
        }
      }, [status, data]);

    async function particapantAccept(id: string, name: string) {
        const datares = await acceptParticapant(groupId, token, id);
        if (datares.error || !datares.message) {
            dispatch(setError({message: datares.error, type: "alert", show: true}));
            return;
        }
        let newParticapants = [];
        for (let i=0;i<data2.yourowner.pending_particapants.length;i++) {
            if (data2.yourowner.pending_particapants[i].id !== parseInt(id)) {
                newParticapants.push(data2.yourowner.pending_particapants[i]);
            }
        }
        setData({...data2, particapants: [...data2.particapants, {id: parseInt(id), name}], yourowner: {...data2.yourowner, pending_particapants: newParticapants}});
        dispatch(setError({message: "Success", type: "success", show: true}));
    }

    async function particapantDecline(id: string) {
        const datares = await declineParticapant(groupId, token, id);
        if (datares.error || !datares.message) {
            dispatch(setError({message: datares.error, type: "alert", show: true}));
            return;
        }
        let newParticapants = [];
        for (let i=0;i<data2.yourowner.pending_particapants.length;i++) {
            if (data2.yourowner.pending_particapants[i].id !== parseInt(id)) {
                newParticapants.push(data2.yourowner.pending_particapants[i]);
            }
        }
        setData({...data2, yourowner: {...data2.yourowner, pending_particapants: newParticapants}});
        dispatch(setError({message: "Success", type: "success", show: true}));
    }

    async function removeParticapantFunc(id: string) {
        const removeParticapantData = await removeParticapant(groupId, token, id);
        if (removeParticapantData.error || !removeParticapantData.message) {
            dispatch(setError({message: removeParticapantData.error, type: "alert", show: true}));
            return;
        }
        if (!data2) return
        let newParticapants = [];
        for (let i=0;i<data2.particapants.length;i++) {
            if (data2.particapants[i].id !== parseInt(id)) {
                newParticapants.push(data2.particapants[i]);
            }
        }
        setData({...data2, particapants: newParticapants});
        dispatch(setError({message: "Success", type: "success", show: true}));
    }

    async function leaveGroupPrompt() {
        const response = await leaveGroup(data2.group_id, token, 0);
        if (response.error || !response.message) {
            dispatch(setError({message: response.error, type: "alert", show: true}));
            return;
        }
        let newGroups = [];
        for (let i=0;i<groups.length;i++){
            if (groups[i].groupId !== groupId) {
                newGroups.push(groups[i]);
            }
        }
        dispatch(setUserGroups(newGroups))
        dispatch(setError({message: response.message, type: "success", show: true}));
        close();
    }

    async function leaveGroupPrompt2() {
        console.log(currentTransfer);
        const response = await leaveGroup(data2.group_id, token, currentTransfer);
        if (response.error || !response.message) {
            dispatch(setError({message: response.error, type: "alert", show: true}));
            return;
        }
        let newGroups = [];
        for (let i=0;i<groups.length;i++){
            if (groups[i].groupId !== groupId) {
                newGroups.push(groups[i]);
            }
        }
        dispatch(setUserGroups(newGroups));
        dispatch(setError({message: response.message, type: "success", show: true}));
        close();
    }

    async function groupDelete() {
        const response = await deleteGroup(data2.group_id, token);
        if (response.error || !response.message) {
            dispatch(setError({message: response.error, type: "alert", show: true}));
            return;
        }
        let newGroups = [];
        for (let i=0;i<groups.length;i++){
            if (groups[i].groupId !== groupId) {
                newGroups.push(groups[i]);
            }
        }
        dispatch(setUserGroups(newGroups));
        dispatch(setError({message: response.message, type: "success", show: true}));
        close();
    }

    // useEffect(() => {
    //     groupInfo(groupId, token).then((data2) => {
    //         if (data2.error || !data2.data) {
    //             setError2(data2.error);
    //         } else {
    //             try {
    //                 const unformattedDate = new Date(data2.data.created);
    //                 setDate(`${dayToLetter[unformattedDate.getDay()]}, ${monthToLetter[unformattedDate.getMonth()]} ${unformattedDate.getDate()}, ${unformattedDate.getFullYear()}.`);
    //             } catch (_err) {
    //                 setDate("N/A");
    //             } 
    //             setData(data2.data);
    //         }
    //     });
    // }, []);
    
    if (error2) {
        return (
            <View style={styles.error}>
                <Text>Error: {error2}</Text>
            </View>);
    }

    if (!data2) {
        return <View style={styles.loading}><ActivityIndicator size="large" color="#3A9FE9" /></View>;
    }

    return(
        <ScrollView style={styles.groupInfo}>
            <Text style={styles.info}>Info</Text>
            <View style={styles.infoList}>
                <Text style={styles.li}>• Owner: <Text style={styles.span}>{data2.owner}{data2.yourowner ? " (you)" : null}</Text></Text>
                <Text style={styles.li}>• Owner Email: <Text style={styles.span}>{data2.owner_email}</Text></Text>
                <Text style={styles.li}>• Particapants: </Text>
                <View style={styles.users}>
                    {data2.particapants ? data2.particapants.map((particapant: Particapant) => <View key={particapant.id}>
                        <View style={styles.particapantListItem} >
                            <Text style={styles.span}>• {particapant.name}{particapant.id === data2.yourowner?.ownerId? " (you)":null}</Text>
                            {data2?.yourowner && data2.yourowner.ownerId !== particapant.id ? <TouchableOpacity style={styles.declineButton} onPress={() => removeParticapantFunc(particapant.id.toString())}><Text style={styles.acceptButtonText}>Remove</Text></TouchableOpacity>:null}
                        </View>
                    </View>) : null}
                </View>
                {data2.yourowner && data2.yourowner.pending_particapants && data2.yourowner.pending_particapants.length != 0 ? <View style={styles.li}>
                    <Text style={styles.li}>Pending Particapants: </Text>
                    <View style={styles.users}>
                        {data2.yourowner.pending_particapants.map((particapant: Particapant) => <View key={particapant.id}>
                            <View style={styles.particapantListItem} >
                                <Text style={styles.span}>• {particapant.name}</Text>
                                {data2.yourowner ? <View style={styles.acceptDecline}><TouchableOpacity style={styles.acceptButton} onPress={() => particapantAccept(particapant.id.toString(), particapant.name)}><Text style={styles.acceptButtonText}>Accept</Text></TouchableOpacity><TouchableOpacity style={styles.declineButton} onPress={() => particapantDecline(particapant.id.toString())}><Text style={styles.acceptButtonText}>Decline</Text></TouchableOpacity></View> :null}
                            </View>
                        </View>)}
                    </View>
                </View> : null}
                <Text style={styles.li2}>• Date Created: <Text style={styles.span}>{date}</Text></Text>
                <Text style={styles.li}>• Group Id: <Text style={styles.span}>{data2.group_id}</Text></Text>
                <Text style={styles.li}>• Particapants can add jobs: <Text style={styles.span}>{othersCanAdd ? "Yes": "No"}</Text></Text>
                <Text style={styles.li}>• About Group: <Text style={styles.span}>{data2.about_group}</Text></Text>
            </View>
            <View style={styles.buttons}>
                {data2.yourowner ? <TouchableOpacity style={styles.leaveGroup}><Text style={styles.leaveText} onPress={() => setDelete(true)}>Delete Group</Text></TouchableOpacity> : null}
                <TouchableOpacity style={styles.leaveGroup2} onPress={() => {if (data2.yourowner){setOwnerLeave(true)}else{leaveGroupPrompt()}}}><Text style={styles.leaveText}>Leave Group</Text></TouchableOpacity>
            </View>
            {delete2 ? <View style={styles.deleteSection}>
                <Text style={styles.li2}>Are You Sure?</Text>
                <View style={styles.deleteSectionButtons}>
                    <TouchableOpacity style={styles.declineButton2} onPress={groupDelete}><Text style={styles.acceptButtonText}>Yes</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton2} onPress={() => setDelete(false)}><Text style={styles.acceptButtonText}>No</Text></TouchableOpacity>
                </View>
            </View>: null}
            {ownerLeave ? <View style={styles.ownerLeaving}>
                <Text style={styles.ownerLeavingText}>Choose who will become the new owner</Text>
                <View style={styles.ownerLeavingOptions}>
                    {data2.particapants.length !=0 ? data2.particapants.map((particapant) => data2.yourowner.ownerId!==particapant.id?<TouchableOpacity key={`leaving_${particapant.id}`} onPress={() => setCurrentTransfer(particapant.id)} style={{...styles.leaveOption, backgroundColor: currentTransfer===particapant.id? "#bfbfbf" : "#dfdfdf"}}><Text style={styles.leaveOptionText}>{particapant.name}</Text></TouchableOpacity>:null) : null}
                    <TouchableOpacity onPress={leaveGroupPrompt2} style={{...styles.leaveOption, backgroundColor: "#EE3F3f", alignItems:"center"}}><Text style={{...styles.leaveOptionText, color: "#FFFFFF"}}>Transfer Ownership and leave</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setOwnerLeave(false)} style={{...styles.leaveOption, backgroundColor: "#3A9FE9", alignItems:"center"}}><Text style={{...styles.leaveOptionText, color: "#FFFFFF"}}>Cancel</Text></TouchableOpacity>
                </View>
            </View> : null}
    </ScrollView>);
}

const styles = StyleSheet.create({
    error: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
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
    users: {
        paddingHorizontal: 10
    },
    li: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: "700",
        color: "#646464",
        fontFamily: "Poppins-SemiBold"
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
    particapantListItem: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10
    },
    buttons: {
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    leaveGroup: {
        borderRadius: 2,
        backgroundColor: "#EE3F3f",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 10,
        letterSpacing: 1
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
    acceptDecline: {
        flexDirection: "row"
    },
    acceptButton: {
        borderRadius: 2,
        backgroundColor: "#3A9FE9",
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 5,
        letterSpacing: 1,
        marginRight: 5
    },
    declineButton: {
        borderRadius: 2,
        backgroundColor: "#EE3F3F",
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 5,
        letterSpacing: 1,
        marginRight: 5
    },
    acceptButtonText: {
        fontSize: 13,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF"
    },
    leaveText: {
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#FFFFFF"
    },
    loading: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    ownerLeaving: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    ownerLeavingText: {
        fontSize: 17,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#000000"
    },
    ownerLeavingOptions: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    dropdown: {
        width: 200,
        height: 100,
        borderColor: "#000000",
        borderWidth: 5,
        borderStyle: "solid"
    },
    deleteSection: {
        width: "100%",
        alignItems: "center",
        justifyContent:"center"
    },
    deleteSectionButtons: {
        alignItems: "center",
        justifyContent:"center",
        marginTop: 10,
        width: "100%",
        paddingHorizontal: 20
    },
    acceptButton2: {
        borderRadius: 2,
        backgroundColor: "#3A9FE9",
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 5,
        letterSpacing: 1,
        marginRight: 5,
        marginTop: 10,
        width: "100%"
    },
    declineButton2: {
        borderRadius: 2,
        backgroundColor: "#EE3F3F",
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        padding: 5,
        letterSpacing: 1,
        marginRight: 5,
        width: "100%",
    },
    leaveOption: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100,
        backgroundColor: "#dfdfdf",
        width: "100%",
        marginTop: 10,
    },
    leaveOptionText: {
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Poppins-SemiBold",
        color: "#000000"
    }
});