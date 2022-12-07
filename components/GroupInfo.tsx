import { useEffect, useState } from "react";
import { acceptParticapant, groupInfo, Particapant } from "../functions/backendFetch";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import PopDown from "./PopDown";

export default function GroupInfo({ groupId, token, othersCanAdd }: { groupId: string, token: string, othersCanAdd: boolean }) {
    const [data, setData] = useState<any>(<View style={styles.cloader}><View style={styles.loader}></View></View>);
    const daytostring = ["N/A", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const montostring = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    async function particapantAccept(id: string) {
        const data = await acceptParticapant(groupId, token, id);
        if (data.error || !data.message) {
            console.log(data.error);
            return;
        }
        console.log(data.message);
    }

    useEffect(() => {
        groupInfo(groupId, token).then((data) => {
            if (data.error || !data.data) {
                console.log(data.error);
                setData(<View style={styles.error}>
                    <Text>Error: {data.error}</Text>
                </View>)
            } else {
                const date = new Date(data.data.created);
                const newDate = `${daytostring[date.getDay()]}, ${montostring[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}.`;
                setData(
                <ScrollView style={styles.groupInfo}>
                    <Text style={styles.info}>Info</Text>
                    <View style={styles.infoList}>
                        <Text style={styles.li}>• Owner: <Text style={styles.span}>{data.data.owner}{data.data.yourowner ? " (you)" : null}</Text></Text>
                        <Text style={styles.li}>• Particapants: </Text>
                        <View style={styles.users}>
                            {data.data.particapants.map((particapant: Particapant) => <View key={particapant.id}>
                                <View style={styles.particapantListItem} >
                                    <Text style={styles.span}>• {particapant.name}{particapant.id === data.data?.yourowner?.ownerId? " (you)":null}</Text>
                                    {data.data?.yourowner && data.data.yourowner.ownerId !== particapant.id ? <TouchableOpacity><Text>Remove</Text></TouchableOpacity>:null}
                                </View>
                            </View>)}
                        </View>
                        {data.data.yourowner && data.data.yourowner.pending_particapants ? <View style={styles.li}>
                            <Text style={styles.li}>Pending Particapants: </Text>
                            <View style={styles.users}>
                                {data.data.yourowner.pending_particapants.map((particapant: Particapant) => <View key={particapant.id}>
                                    <View style={styles.particapantListItem} >
                                        <Text style={styles.span}>• {particapant.name}</Text>
                                        {data.data?.yourowner ? <View style={styles.acceptDecline}><TouchableOpacity style={styles.acceptButton} onPress={() => particapantAccept(particapant.id.toString())}><Text style={styles.acceptButtonText}>Accept</Text></TouchableOpacity><TouchableOpacity style={styles.declineButton}><Text style={styles.acceptButtonText}>Decline</Text></TouchableOpacity></View> :null}
                                    </View>
                                </View>)}
                            </View>
                        </View> : null}
                        <Text style={styles.li2}>• Date Created: <Text style={styles.span}>{newDate}</Text></Text>
                        <Text style={styles.li}>• Group Id: <Text style={styles.span}>{data.data.group_id}</Text></Text>
                        <Text style={styles.li}>• Particapants can add jobs: <Text style={styles.span}>{othersCanAdd ? "Yes": "No"}</Text></Text>
                        <Text style={styles.li}>• About Group: <Text style={styles.span}>{data.data.about_group}</Text></Text>
                    </View>
                    <View style={styles.buttons}>
                        {data.data.yourowner ? <TouchableOpacity style={styles.leaveGroup}><Text style={styles.leaveText}>Delete Group</Text></TouchableOpacity> : null}
                        <TouchableOpacity style={styles.leaveGroup2}><Text style={styles.leaveText}>Leave Group</Text></TouchableOpacity>
                    </View>
                </ScrollView>);
            }
        });
    }, []);

    return data;
}

const styles = StyleSheet.create({
    cloader: {

    },
    loader: {},
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
        height: "100%"
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
    }
});


// .cloader {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }