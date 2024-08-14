import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';


export default function NAV() {
  return (
    <View style={styles.container}>
      <Text><AntDesign name="back" size={24} color="black" /></Text>
      <Text><AntDesign name="logout" size={24} color="black" /></Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:Colors.dark,
        paddingHorizontal:15
    }
})