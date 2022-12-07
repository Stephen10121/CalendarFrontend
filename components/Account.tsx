import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Selected } from './navigation/Navigation';
import Loader from './Loader';

export default function Account({ selected, logout }: { selected: (arg0: Selected) => any, logout: () => void }) {
    return (
        <View style={styles.account}>
            <TouchableOpacity onPress={() => selected("home")}><Text>Back</Text></TouchableOpacity>
            <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
            <Text>Account</Text>
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