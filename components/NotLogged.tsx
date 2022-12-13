import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { googleLoginOrRegister } from '../functions/backendFetch';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { EXPO_CLIENT_ID, WEB_CLIENT_ID } from '../functions/variables';
import { useDispatch } from 'react-redux';
import { storeData } from '../functions/localstorage';
import { setUserData } from '../redux/actions';

WebBrowser.maybeCompleteAuthSession();

export default function NotLogged({ loading }: { loading: (arg0: boolean) => any }) {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [request, _response, googlePromptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: "",
        androidClientId: "",
        webClientId: WEB_CLIENT_ID
    });

    async function googleRegister() {
        const response = await googlePromptAsync();
        if (response.type !== "success") {
            setError("Error Using Google Login");
            return
        }

        const { access_token } = response.params;
        loading(true);
        const res2 = await googleLoginOrRegister(access_token);
        if (res2.error || !res2.data) {
            setError(res2.error);
            return
        }
        dispatch({ type: "SET_USER_TOKEN", payload: res2.data.token });
        dispatch({ type: "SET_USER_DATA", payload: res2.data.userData });
        storeData(res2.data.token);
        loading(false);
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