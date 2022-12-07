import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GroupsType } from '../functions/backendFetch'

export default function JoinGroup({ addGroup }: { addGroup: (group: GroupsType) => any }) {
  return (
    <View>
      <TouchableOpacity><Text>JoinGroup</Text></TouchableOpacity>
    </View>
  )
}