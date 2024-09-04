import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';
import { router, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


export default function Nav({color}) {
  const router = useRouter();
  const nav = useNavigation()
  const [isLogged,setIsLogged] = useState(false);

  const isLoggedIn = async() => {
    if(await AsyncStorage.getItem("token")) setIsLogged(true)
    setIsLogged(false)
  }
  const logout = async () =>{
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("isLoggedIn");
      setIsLogged(false)
    nav.navigate("components/pages/HomePage")
  }
  return (
    
    <View style={styles.container}>
      <Text style={styles.color} onPress={()=>router.back()}><AntDesign name="back" size={24} color={Colors.myGreen} /></Text>
      <Text onPress={logout} style={styles.color}><AntDesign name="logout" size={24} color={Colors.myGreen} /></Text>
    </View>
  
  )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100vh',
        top:0,
        flex:1,
        position:"absolute",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:Colors.dark,
        backgroundColor:Colors.white,
        paddingHorizontal:15,
        paddingVertical:15
    },
   color:{
     color:Colors.white
   }
   
})
