import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Selected } from './navigation/Navigation';
import Loader from './Loader';
import { storeData } from '../functions/localstorage';
import { useDispatch } from 'react-redux';

export default function Account({ selected }: { selected: (arg0: Selected) => any }) {
    const dispatch = useDispatch();
    return (
        <View style={styles.account}>
            <TouchableOpacity onPress={() => selected("home")}><Text>Back</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                storeData(null);
                dispatch({ type: "SET_USER_TOKEN", payload: null });
                dispatch({ type: "SET_USER_DATA", payload: null });
            }}><Text>Logout</Text></TouchableOpacity>
            <Text>Account</Text>
            <Loader />
            <ActivityIndicator size="large" color="#3A9FE9" />
        </View>
    )
}

const styles = StyleSheet.create({
    account: {
        width: "100%",
        height: "100%",
        backgroundColor: "green"
    }
});