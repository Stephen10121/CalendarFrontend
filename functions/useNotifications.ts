import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const useNotifications = () => {
    const registerForPushNotificationAsync = async () => {
        let token = "";
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus === "granted") {
                token = (await Notifications.getExpoPushTokenAsync()).data;
            }
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C"
            });
        }
        return token.length !== 0 ? token : null;
    }

    const handleNotification = (notification: Notifications.Notification) => {
        console.log(notification);
    }

    return { registerForPushNotificationAsync, handleNotification }
}