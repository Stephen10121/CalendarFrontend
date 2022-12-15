import { Linking, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";

export const useNotifications = () => {
    const registerForPushNotificationAsync = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            return token
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C"
            });
        }
    }

    const handleNotification = (notification: Notifications.Notification) => {
    }

    return { registerForPushNotificationAsync, handleNotification }
}