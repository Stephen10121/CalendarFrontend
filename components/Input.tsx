import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ height, defaultValue, change, placeHolder, marginTop, multiLine }: { height?: number, defaultValue?: string, change: (value: string) => any, placeHolder?: string, marginTop?: number | string, multiLine?: boolean }) {
  const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: height ? height : multiLine ? 120 : 40,
        borderWidth: 2,
        borderColor: "#000000",
        borderStyle: "solid",
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 13,
        fontWeight: "500",
        fontFamily: "Poppins-SemiBold",
        color: "#000000",
        marginTop,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    }
  });
  return (
      <TextInput
        multiline={multiLine}
        numberOfLines={multiLine ? 3 : 1}
        style={styles.input}
        onChangeText={change}
        value={defaultValue}
        placeholder={placeHolder}
      />
  )
}