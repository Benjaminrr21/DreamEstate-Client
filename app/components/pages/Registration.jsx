import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors'
import { backgroundImage } from '../../../constants/Images'
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-web';


export default function Registration() {
  const [showPassword, setShowPassword] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const nav = useNavigation();


  const roles = [
    { key: '0', value: "Uloga" },
    { key: '1', value: "KUPAC" },
    { key: '2', value: "PRODAVAC" },
    { key: '3', value: "ADMIN" },
  ];

  const generateCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const register = async () => {
    const randomCode = generateCode(100000, 999999);
    console.log(roles[1]);
    try {
      const response = await axios.post("http://192.168.1.2:5000/api/users/register", {
        firstName,
        lastName,
        email,
        phone,
        role:roles[role].value,
        username,
        password,
        code: randomCode,
      });
      console.log(response);
      nav.navigate("components/pages/InsertCode", { code: randomCode,role:roles[role].value});
      Alert.alert('Uspeh', 'Registracija uspešna!');
    } catch (e) {
      console.log(e);
      Alert.alert('Greška', 'Došlo je do greške prilikom registracije.');
    }
  }

  

  return (
    <ImageBackground src={backgroundImage.uri} style={{
      height:"100%"
    }}>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Registracija </Text>
        <SelectList style={{
          flex:1,
          backgroundColor:Colors.white
        }} defaultOption={roles[0]} data={roles} setSelected={setRole} />

        <TextInput value={firstName} onChangeText={(val) => setFirstName(val)} style={styles.input} placeholder='Ime' />
        <TextInput value={lastName} onChangeText={(val) => setLastName(val)} style={styles.input} placeholder='Prezime' />
        <TextInput value={email} onChangeText={(val) => setEmail(val)} style={styles.input} placeholder='Email' />
        <TextInput value={phone} onChangeText={(val) => setPhone(val)} style={styles.input} placeholder='Broj telefona' />
        <TextInput value={username} onChangeText={(val) => setUsername(val)} style={styles.input} placeholder='Korisničko ime' />
        <TextInput value={password} onChangeText={(val) => setPassword(val)} secureTextEntry={showPassword} style={styles.input} placeholder='Lozinka' />
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showButtonText}>{showPassword ? "Show password" : "Hide password"}</Text>
        </TouchableOpacity>

        

        <TouchableOpacity onPress={register} style={styles.button}>
          <AntDesign name="adduser" size={23} color={Colors.myGreen} />
          <Text style={styles.buttonText}> Registruj se</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 38,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    color: Colors.white,
  },
  selectt: {
    width: '100%',
    backgroundColor: Colors.white, // Dodaj pozadinsku boju
    borderColor: Colors.myGreen,    // Dodaj boju granice ako je potrebno
    borderWidth: 1,                 // Dodaj širinu granice ako je potrebno
    borderRadius: 15,               // Dodaj radijus granice ako je potrebno
    padding: 10,                    // Dodaj unutrašnji razmak ako je potrebno
  },
  input: {
    padding: 10,
    borderRadius: 15,
    textAlign: 'left',
    width: '100%',
    backgroundColor: Colors.white,
    margin: 10
  },
  button: {
    backgroundColor: Colors.myGreen,
    width: '100%',
    borderRadius: 13,
    padding: 10,
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
    fontSize: 18
  },
  showButton: {
    marginLeft: 10,
  },
  showButtonText: {
    color: Colors.myGreen,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: Colors.myGreen,
    padding: 10,
    borderRadius: 13,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
   
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
})
