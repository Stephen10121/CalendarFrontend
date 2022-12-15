import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

export default function DropDown({ defaultValue, change, placeHolder, marginLeft, multiLine, width }: { defaultValue?: string, change: (value: any) => any, placeHolder?: string, marginLeft?: number | string, multiLine?: boolean, width?: number }) {
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [gender, setGender] = useState([
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer Not to Say", value: "neutral" },
    ]);
    const styles = StyleSheet.create({
        input: {
            width: width ? width : "100%",
            height: multiLine ? 120 : 40,
            borderWidth: 2,
            borderColor: "#000000",
            borderStyle: "solid",
            borderRadius: 10,
            paddingHorizontal: 5,
            marginLeft,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Poppins-SemiBold",
            color: "#000000",
        },
        dropdownGender: {

        },
        dropdown: {

        },
        placeholderStyles: {
            
        }
    });

    return (
            <DropDownPicker
              style={styles.dropdown}
              open={genderOpen}
              value={genderValue} //genderValue
              items={gender}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGender}
              placeholder="Select Gender"
              placeholderStyle={styles.placeholderStyles}
              onOpen={console.log}
              onChangeValue={console.log}
              zIndex={3000}
              zIndexInverse={1000}
            />
    );
}