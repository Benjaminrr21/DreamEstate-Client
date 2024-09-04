import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, {useState} from 'react'
import { Colors } from '../../../constants/Colors'
import { backgroundImage } from '../../../constants/Images'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function LoginRegister() {
  const [showPassword, setShowPassword] = useState(true);

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const nav = useNavigation()

  const login = async() => {
   
    try {
    const user = await axios.post("http://192.168.1.2:5000/api/users/login", {
      username,password
    })
    Alert.alert("Uspesno!")
    await AsyncStorage.setItem("token",user.data.token)
    await AsyncStorage.setItem("role",user.data.role)
    await AsyncStorage.setItem("isLoggedIn",'true')
    setIsLoggedIn(true)
    console.log(await AsyncStorage.getItem("role"));
    if(await AsyncStorage.getItem("role")=="User")
      nav.navigate("components/pages/SearchEstates")
    else if(await AsyncStorage.getItem("role")=="Admin")
      nav.navigate("components/pages/AddEstate")

    }catch(e){
      console.log(e);
      Alert.alert("Korisnicko ime ili lozinka nisu pravilno uneti.")
    }
  }
 
  return (
    <ImageBackground src={backgroundImage.uri}>
    <View style={styles.container}>
      <Text style={styles.heading}>Prijava</Text>
      
      <TextInput value={username} onChangeText={(val)=>setUsername(val)} style={styles.input} placeholder='Korisnicko ime'></TextInput>
      <TextInput value={password} onChangeText={(val)=>setPassword(val)} secureTextEntry={showPassword} style={styles.input} placeholder='Lozinka'></TextInput>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showButtonText}>{showPassword ? "Show password" : "Hide password"}</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={login} style={styles.button}>
        <MaterialIcons name="login" size={23} color="white" />
        <Text style={styles.buttonText}> Prijavi se</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    height:'100%',
    paddingHorizontal:30,
    justifyContent:'center', //centrira vertikalno
    alignItems:'center',
    
  },
  heading:{
    fontSize:38,
    marginBottom:30,
    textAlign:'center',
    fontFamily:'poppins-bold',
    color:Colors.white,
    
  },
  input: {
    padding:10,
    borderRadius:15,
    textAlign:'left',
    width:'100%',
    backgroundColor:Colors.white,
    margin:10
  },
  button:{
    backgroundColor:Colors.myGreen,
    width:'100%',
    borderRadius:13,
    padding:10,
    marginTop:'10%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },
  buttonText:{
    color:Colors.white,
    fontFamily:'poppins-medium',
    textAlign:'center',
    fontSize:18

  },
  showButton: {
    marginLeft: 10,
  },
  showButtonText: {
    color: Colors.myGreen,
    fontWeight: 'bold',
    
  },
})