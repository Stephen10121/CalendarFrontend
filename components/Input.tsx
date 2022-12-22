import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function Input({ height, defaultValue, change, placeHolder, marginTop, multiLine }: { height?: number, defaultValue?: string, change: (value: string) => any, placeHolder?: string, marginTop?: number | string, multiLine?: boolean }) {
  const styles = StyleSheet.create({
    view: {
      width: "100%",
        height: height ? height : multiLine ? 120 : 40,
        borderWidth: 2,
        borderColor: "#000000",
        borderStyle: "solid",
        borderRadius: 10,
        padding: 5,
        marginTop: marginTop ? marginTop : 0,
    },
    input: {
        width: "100%",
        height: "100%",
        fontSize: 13,
        fontWeight: "500",
        fontFamily: "Poppins-SemiBold",
        color: "#000000",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        outlineStyle: 'none'
    }
  });
  return (
    <View style={styles.view}>
      <TextInput
        multiline={multiLine}
        numberOfLines={multiLine ? 3 : 1}
        style={styles.input}
        onChangeText={change}
        value={defaultValue}
        placeholder={placeHolder}
      />
    </View>
  )
}