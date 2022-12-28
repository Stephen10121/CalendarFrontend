import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addNotification, googleLoginOrRegister } from '../functions/backendFetch';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, WEB_CLIENT_ID } from '../functions/variables';
import { useDispatch } from 'react-redux';
import { storeData } from '../functions/localstorage';
import { useNotifications } from '../functions/useNotifications';
import { setToken, setUserData } from '../redux/actions';

WebBrowser.maybeCompleteAuthSession();

export default function NotLogged({ loading }: { loading: (arg0: boolean) => any }) {
    const [error, setError2] = useState("");
    const { registerForPushNotificationAsync } = useNotifications();
    const dispatch = useDispatch();
    const [request, response, googlePromptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: "",
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID
    });

    async function googleRegisterResponse() {
        if (!response) {
            return false;
        }

        if (response.type !== "success") {
            setError2("Error Using Google Login");
            return false;
        }

        const { access_token } = response.params;
        loading(true);

        const res2 = await googleLoginOrRegister(access_token);

        if (res2.error) {
            setError2(res2.error);
            loading(false);
            return false;
        }

        if (!res2.data) {
            setError2("Error using Google Login");
            loading(false);
            return false;
        }

        if (Platform.OS === "web") {
            dispatch(setToken(res2.data.token));
            dispatch(setUserData(res2.data.userData));
            storeData(res2.data.token);
            loading(false);
            return true;
        }

        const token2 = await registerForPushNotificationAsync();

        if (!token2) {
            loading(false);
            return false;
        }

        const newData = await addNotification(res2.data.token, token2);
        
        if (!newData.error) {
            console.log("Notifications Enabled.");
        }

        dispatch(setToken(res2.data.token));
        dispatch(setUserData(res2.data.userData));
        storeData(res2.data.token);
        loading(false);
        return true;
    }

    useEffect(() => {
        googleRegisterResponse().then((data) => console.log(data ? "Login Success." : "Login Failure."));
    }, [response]);

  return (
    <View style={styles.main}>
      <Text style={styles.welcome}>Welcome</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity disabled={!request} style={styles.googleButton} onPress={async () => await googlePromptAsync()}>
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