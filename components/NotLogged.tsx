import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { googleLoginOrRegister } from '../functions/backendFetch';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoggedIn({ loggedIn }: { loggedIn: (arg0: any, arg1: string) => any }) {
    const [error, setError] = useState("");
    const [request, _response, googlePromptAsync] = Google.useAuthRequest({
        expoClientId: "664653035536-rskmjba0jmich63i4g8omtk4u66lvbjq.apps.googleusercontent.com",
        iosClientId: "",
        androidClientId: "",
        webClientId: "664653035536-gtdi5ba5hjq11e3ljoknc5955lkab2rt.apps.googleusercontent.com"
    });

    async function googleRegister() {
        const response = await googlePromptAsync();
        if (response.type !== "success") {
            setError("Error Using Google Login");
            return
        }

        const { access_token } = response.params;
        
        const res2 = await googleLoginOrRegister(access_token);
        if (res2.error || !res2.data) {
            setError(res2.error);
            return
        }
        loggedIn(res2.data.userData, res2.data.token);
    }

  return (
    <View style={styles.main}>
      <Text style={styles.welcome}>Welcome</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity disabled={!request} style={styles.googleButton} onPress={googleRegister}>
      <Image style={styles.image}
            source={require('../assets/google.png')}
        />
        <Text style={styles.text}>Login With Google</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#DFDFDF",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    welcome: {
        fontSize: 36,
        fontWeight: "700",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    googleButton: {
        backgroundColor: "#FFFFFF",
        marginTop: 42,
        borderRadius: 10,
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10
    },
    image: {
        width: 35,
        height: 35
    },
    text: {
        marginLeft: 25,
        fontSize: 16,
        fontWeight: "700",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    error: {
        marginLeft: 25,
        fontSize: 14,
        fontWeight: "700",
        color: "red",
        fontFamily: "Poppins-SemiBold"
    }
});