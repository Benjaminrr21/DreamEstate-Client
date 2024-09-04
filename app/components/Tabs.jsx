import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Tabs() {
  return (
    <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>
            <AntDesign name="message1" size={24} color={Colors.myGreen} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>nav.navigate("components/pages/SearchEstates")} style={styles.tab}>
          <Text style={styles.tabText}>
            
            <AntDesign name="search1" size={24} color={Colors.myGreen} />
            
          </Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>
          <FontAwesome name="bookmark" size={24} color={Colors.myGreen} />
          </Text>

        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    tabs:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Colors.white,
        paddingVertical:15,
        bottom:0,
        position:'absolute'
      },
      tab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        display:'flex',
        flexDirection:'column'
      },
      tabText:{
        fontFamily:"poppins-medium",
        textAlign:"center",
       
      }
})