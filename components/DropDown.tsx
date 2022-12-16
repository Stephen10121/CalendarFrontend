import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

export default function DropDown({ values, change, placeHolder, marginLeft, width }: { values: {label: string, value: any}[], change: (value: any) => any, placeHolder?: string, marginLeft?: number | string, width?: number }) {
    const [selected, setSelected] = useState();
    const styles = StyleSheet.create({
        cover: {
            width: width ? width : "100%",
            height: 54,
            marginLeft: marginLeft ? marginLeft : 0,
            borderWidth: 2,
            borderColor: "#000000",
            borderStyle: "solid",
            borderRadius: 10,
            paddingHorizontal: 5,
        },
        text: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
            marginLeft: marginLeft ? marginLeft : 0,
        },
        dropdown: {
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
        },
        title: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
            marginLeft: marginLeft ? marginLeft : 0,
        }
    });

    return (
        <View>
            <Text style={styles.title}>{placeHolder}</Text>
            <View style={styles.cover}>
                <Picker style={styles.dropdown} selectedValue={selected} onValueChange={(itemValue, _itemIndex) => {setSelected(itemValue);change(itemValue)}}>
                    {values.map((value) => <Picker.Item style={styles.text} key={`${placeHolder}${value.value}`} label={value.label} value={value.value}/>)}
                </Picker>
            </View>
        </View>
    );
}