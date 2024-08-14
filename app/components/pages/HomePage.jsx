import { View, Text,Alert, StyleShhet, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import {Colors} from './../../../constants/Colors'

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import * as sec from 'expo-secure-store' 

export default function HomePage() {
  const image = {uri: 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1722859171/pexels-photo-3075447_nvlwyt.webp'};
  const [isLoggedIn,setIsLoggedIn] = useState();
  const nav = useNavigation();
  function CheckIsLoggedIn(){
    if(sec.getItem("token")!="" && sec.getItem("role")!="") setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }
  /* useEffect( () => {
    nav.setOptions({
      headerShown: false,
    });
  } , []); */
  useEffect(()=>{
    CheckIsLoggedIn()
  },[])
  const logout = async() => {
    setIsLoggedIn(false)
    nav.navigate("Home")
    
  }
  
  return (
    <ImageBackground style={styles.image} source={image} resizeMode='cover'>

    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>
         
          <FontAwesome name="building-o" size={35} color="white" /> DreamEstate</Text>
        <Text style={styles.description}>Pronadji idealnu nekretninu po najpovoljnijim cenama!</Text>
        <TouchableOpacity onPress={()=>nav.navigate('LoginRegister')} style={styles.buttons}>
        <MaterialIcons name="login" size={23} color="white" />
          <Text style={styles.buttonText}> Prijavi se</Text>
        </TouchableOpacity>
        {isLoggedIn && 
          <TouchableOpacity onPress={logout} style={styles.buttons}>
        <MaterialIcons name="login" size={23} color="white" />
          <Text style={styles.buttonText}> Odjavi se</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity onPress={()=>nav.navigate('Registration')} style={styles.buttons2}>
          <AntDesign name="adduser" size={23} color={Colors.myGreen} />
          <Text style={styles.buttonText2}> Registruj se</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.buttons2} onPress={()=>nav.navigate("Estates")}>
          <AntDesign name="google" size={23} color={Colors.myGreen} />
          <Text style={styles.buttonText2}> Prijavi se sa Google</Text>
        </TouchableOpacity>
        <Text>or</Text>
      </View>
    </View>
    </ImageBackground>

  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    paddingTop:'40%',
    height:'100%'
    },
    image: {
        flex:1,
        justifyContent:'center',
    
    },
  inner: {
    justifyContent:'center',
    alignItems:'center'
  },
  heading: {
    fontSize:45,
    fontFamily:'poppins-bold',
    color:Colors.white
  },
  description: {
    color:Colors.white,
    fontFamily:'poppins-medium',
    textAlign:'center',
    marginHorizontal:20
  },
  buttons: {
    borderRadius:25,
    marginTop:'20%',
    backgroundColor:Colors.myGreen,
    paddingHorizontal:55,
    width:'70%',
    paddingVertical:10,
    display:'flex',
    flexDirection:'row',
  },
  buttons2: {
    borderRadius:25,
    marginTop:'5%',
    backgroundColor:Colors.white,
    paddingHorizontal:50,
    width:'70%',
    paddingVertical:10,
    display:'flex',
    flexDirection:'row'
  },
  buttonText: {
    color:Colors.white,
    fontFamily:'poppins-medium',
    textAlign:"center",
    fontSize:18,

  },
  buttonText2: {
    color:Colors.myGreen,
    fontFamily:'poppins-medium',
    textAlign:"center",
    fontSize:18

  },
})