import { useEffect, useState } from "react";
import { acceptParticapant, declineParticapant, groupInfo, GroupInfoData, leaveGroup, Particapant, removeParticapant } from "../functions/backendFetch";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import PopDown, { MessageType } from "./PopDown";
import { RemoveGroup } from "./loggedIn/LoggedIn";

export default function GroupInfo({ groupId, token, othersCanAdd, removeGroup }: { groupId: string, token: string, othersCanAdd: boolean, removeGroup: RemoveGroup }) {
    const [data, setData] = useState<null | GroupInfoData>(null);
    const [date, setDate] = useState<string | null>(null);
    const [error, setError] = useState<any>(null);
    const [showPopdown, setShowPopdown] = useState<{ show: boolean, message: string, type?: MessageType }>({ show: false, message: "" })

    async function particapantAccept(id: string, name: string) {
        const datares = await acceptParticapant(groupId, token, id);
        if (datares.error || !datares.message) {
            console.log(datares.error);
            setShowPopdown({message: datares.error, type: "alert", show: true});
            return;
        }
        let newParticapants = [];
        for (let i=0;i<data.yourowner.pending_particapants.length;i++) {
            if (data.yourowner.pending_particapants[i].id !== parseInt(id)) {
                newParticapants.push(data.yourowner.pending_particapants[i]);
            }
        }
        setData({...data, particapants: [...data.particapants, {id: parseInt(id), name}], yourowner: {...data.yourowner, pending_particapants: newParticapants}});
        setShowPopdown({ show: true, message: "Success", type: "success" });
    }

    async function particapantDecline(id: string) {
        const datares = await declineParticapant(groupId, token, id);
        if (datares.error || !datares.message) {
            console.log(datares.error);
            setShowPopdown({message: datares.error, type: "alert", show: true});
            return;
        }
        let newParticapants = [];
        for (let i=0;i<data.yourowner.pending_particapants.length;i++) {
            if (data.yourowner.pending_particapants[i].id !== parseInt(id)) {
                newParticapants.push(data.yourowner.pending_particapants[i]);
            }
        }
        setData({...data, yourowner: {...data.yourowner, pending_particapants: newParticapants}});
        setShowPopdown({ show: true, message: "Success", type: "success" });
    }

    async function removeParticapantFunc(id: string) {
        const removeParticapantData = await removeParticapant(groupId, token, id);
        if (removeParticapantData.error || !removeParticapantData.message) {
            console.log(removeParticapantData.error);
            setShowPopdown({message: removeParticapantData.error, type: "alert", show: true});
            return;
        }
        if (!data) return
        let newParticapants = [];
        for (let i=0;i<data.particapants.length;i++) {
            if (data.particapants[i].id !== parseInt(id)) {
                newParticapants.push(data.particapants[i]);
            }
        }
        setData({...data, particapants: newParticapants});
        setShowPopdown({ show: true, message: "Success", type: "success" });
    }

    async function leaveGroupPrompt() {
        const response = await leaveGroup(data.group_id, token);
        if (response.error || !response.message) {
            setShowPopdown({message: response.error, type: "alert", show: true});
            return;
        }
        removeGroup(data.group_id);
        setShowPopdown({message: response.message, type: "success", show: true});
    }

    useEffect(() => {
        groupInfo(groupId, token).then((data) => {
            if (data.error || !data.data) {
                setError(data.error);
            } else {
                try {
                    const unformattedDate = new Date(data.data.created);
                    setDate(`${["N/A", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][unformattedDate.getDay()]}, ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][unformattedDate.getMonth()]} ${unformattedDate.getDate()}, ${unformattedDate.getFullYear()}.`);
                } catch (_err) {
                    setDate("N/A");
                } 
                setData(data.data);
            }
        });
    }, []);
    
    if (error) {
        return (
            <View style={styles.error}>
                <Text>Error: {error}</Text>
            </View>);
    }

    if (!data) {
        return <View style={styles.loading}><ActivityIndicator size="large" color="#3A9FE9" /></View>;
    }

    return(
        <ScrollView style={styles.groupInfo}>
            {showPopdown.show ? <PopDown message={showPopdown.message} type={showPopdown.type} close={() => setShowPopdown({...showPopdown, show: false})}/> : null}
            <Text style={styles.info}>Info</Text>
            <View style={styles.infoList}>
                <Text style={styles.li}>• Owner: <Text style={styles.span}>{data.owner}{data.yourowner ? " (you)" : null}</Text></Text>
                <Text style={styles.li}>• Particapants: </Text>
                <View style={styles.users}>
                    {data.particapants.map((particapant: Particapant) => <View key={particapant.id}>
                        <View style={styles.particapantListItem} >
                            <Text style={styles.span}>• {particapant.name}{particapant.id === data.yourowner?.ownerId? " (you)":null}</Text>
                            {data?.yourowner && data.yourowner.ownerId !== particapant.id ? <TouchableOpacity style={styles.declineButton} onPress={() => removeParticapantFunc(particapant.id.toString())}><Text style={styles.acceptButtonText}>Remove</Text></TouchableOpacity>:null}
                        </View>
                    </View>)}
                </View>
                {data.yourowner && data.yourowner.pending_particapants && data.yourowner.pending_particapants.length != 0 ? <View style={styles.li}>
                    <Text style={styles.li}>Pending Particapants: </Text>
                    <View style={styles.users}>
                        {data.yourowner.pending_particapants.map((particapant: Particapant) => <View key={particapant.id}>
                            <View style={styles.particapantListItem} >
                                <Text style={styles.span}>• {particapant.name}</Text>
                                {data.yourowner ? <View style={styles.acceptDecline}><TouchableOpacity style={styles.acceptButton} onPress={() => particapantAccept(particapant.id.toString(), particapant.name)}><Text style={styles.acceptButtonText}>Accept</Text></TouchableOpacity><TouchableOpacity style={styles.declineButton} onPress={() => particapantDecline(particapant.id.toString())}><Text style={styles.acceptButtonText}>Decline</Text></TouchableOpacity></View> :null}
                            </View>
                        </View>)}
                    </View>
                </View> : null}
                <Text style={styles.li2}>• Date Created: <Text style={styles.span}>{date}</Text></Text>
                <Text style={styles.li}>• Group Id: <Text style={styles.span}>{data.group_id}</Text></Text>
                <Text style={styles.li}>• Particapants can add jobs: <Text style={styles.span}>{othersCanAdd ? "Yes": "No"}</Text></Text>
                <Text style={styles.li}>• About Group: <Text style={styles.span}>{data.about_group}</Text></Text>
            </View>
            <View style={styles.buttons}>
                {data.yourowner ? <TouchableOpacity style={styles.leaveGroup}><Text style={styles.leaveText}>Delete Group</Text></TouchableOpacity> : null}
                <TouchableOpacity style={styles.leaveGroup2} onPress={leaveGroupPrompt}><Text style={styles.leaveText}>Leave Group</Text></TouchableOpacity>
            </View>
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
      }
});