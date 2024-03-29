import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelected } from '../redux/actions';

export type Selected = "home" | "calendar" | "groups" | "addJob" | "account";

export default function Navigation({ selected, profilePic }: { selected: Selected, profilePic: string}) {
  const dispatch = useDispatch();
    const styles = StyleSheet.create({
        navigation: {
            backgroundColor: "#AAAAAA",
            width: "100%",
            height: 70,
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row"
        },
        button: {
            height: 50,
            paddingTop: 5,
            position: "relative"
        },
        imageCal: {
            tintColor: selected==="calendar" ? "#767676" : "#000000",
            height: 44,
            width: 48
        },
        imageHome: {
            tintColor: selected==="home" ? "#767676" : "#000000",
            height: 44,
            width: 31
        },
        imageGroup: {
            tintColor: selected==="groups" ? "#767676" : "#000000",
            height: 44,
            width: 37
        },
        imageJob: {
            tintColor: selected==="addJob" ? "#767676" : "#000000",
            height: 44,
            width: 42
        },
        avatar: {
            height: 50,
            width: 50,
            borderRadius: 100
        },
        notification: {
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: "#EE3F3f",
          position: "absolute",
          top: 0,
          right: -6
      }
    });

    function clicked(location: Selected) {
      dispatch(setSelected(location));
    }

  return (
    <View style={styles.navigation}>
      <TouchableOpacity style={styles.button} onPress={() => clicked("home")}>
        <Image style={styles.imageHome}
            source={require('../assets/navigation/home.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => clicked("calendar")}>
        <Image style={styles.imageCal}
            source={require('../assets/navigation/calendar.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => clicked("groups")}>
        <Image style={styles.imageGroup}
            source={require('../assets/navigation/groups.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => clicked("addJob")}>
        <Image style={styles.imageJob}
            source={require('../assets/navigation/addjob.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clicked("account")}>
        {Platform.OS === "web" ? <img src={profilePic} referrerPolicy="no-referrer" style={styles.avatar} alt="Profile Picture"/> : <Image style={styles.avatar} source={{uri:profilePic}} />}
      </TouchableOpacity>
    </View>
  )
}