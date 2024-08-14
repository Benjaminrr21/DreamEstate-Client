import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from '../../../constants/Colors'
import { backgroundImage } from '../../../constants/Images'
import AntDesign from '@expo/vector-icons/AntDesign';
import { GetAllEstates } from '../../services/EstateService';
import axios from 'axios'
export default function Registration() {
  const [showPassword, setShowPassword] = useState(true);
  

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [role,setRole] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const register = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:5000/api/users/register", {
        firstName,
        lastName,
        email,
        phone,
        role,
        username,
        password
      }
      );
      console.log(response);
      Alert.alert('Uspeh', 'Registracija uspešna!');
    } catch (e) {
      console.log(e);
      Alert.alert('Greška', 'Došlo je do greške prilikom registracije.');
    }
  }

  return (
    <ImageBackground src={backgroundImage.uri}>
    <View style={styles.container}>
      <Text style={styles.heading}>Registracija </Text>
      <TextInput value={firstName} onChangeText={(val)=>setFirstName(val)} style={styles.input} placeholder='Ime'></TextInput>
      <TextInput value={lastName} onChangeText={(val)=>setLastName(val)} style={styles.input} placeholder='Prezime'></TextInput>
      <TextInput value={email} onChangeText={(val)=>setEmail(val)} style={styles.input} placeholder='Email'></TextInput>
      <TextInput value={phone} onChangeText={(val)=>setPhone(val)} style={styles.input} placeholder='Broj telefona'></TextInput>
      <TextInput value={role} onChangeText={(val)=>setRole(val)} style={styles.input} placeholder='Uloga'></TextInput>
      <TextInput value={username} onChangeText={(val)=>setUsername(val)} style={styles.input} placeholder='Korisničko ime'></TextInput>
      <TextInput value={password} onChangeText={(val)=>setPassword(val)} secureTextEntry={showPassword} style={styles.input} placeholder='Lozinka'></TextInput>
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showButtonText}>{showPassword ? "Show password" : "Hide password"}</Text>
        </TouchableOpacity>
      <TouchableOpacity
      onPress={register}
       style={styles.button}>
        <AntDesign name="adduser" size={23} color={Colors.myGreen} />
        <Text style={styles.buttonText}> Registruj se</Text>
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