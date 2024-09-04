import { View, Text, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as sec from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import Nav from './../Nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()


export default function HomePage() {
  const image = { uri: 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1722859171/pexels-photo-3075447_nvlwyt.webp' };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();  // Koristi useNavigation

  async function CheckIsLoggedIn() {
    //const token = await sec.getItemAsync("token");
    //const role = await sec.getItemAsync("role");
    if (await AsyncStorage.getItem("token")!=null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }




  return (
    <ImageBackground style={styles.image} source={image} resizeMode='cover'>
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.heading}>
            <FontAwesome name="building-o" size={35} color="white" /> DreamEstate
          </Text>
          <Text style={styles.description}>Pronadji idealnu nekretninu po najpovoljnijim cenama!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('components/pages/LoginRegister')} style={styles.buttons}>
            <MaterialIcons name="login" size={23} color="white" />
            <Text style={styles.buttonText}> Prijavi se</Text>
          </TouchableOpacity>
          {/* {isLoggedIn && (
            <TouchableOpacity onPress={logout} style={styles.buttons}>
              <MaterialIcons name="logout" size={23} color="white" />
              <Text style={styles.buttonText}> Odjavi se</Text>
            </TouchableOpacity>
          )} */}
          <TouchableOpacity onPress={() => navigation.navigate('components/pages/Registration')} style={styles.buttons2}>
            <AntDesign name="adduser" size={23} color={Colors.myGreen} />
            <Text style={styles.buttonText2}> Registruj se</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('components/pages/AddEstate')} style={styles.buttons2}>
            <AntDesign name="adduser" size={23} color={Colors.myGreen} />
            <Text style={styles.buttonText2}> Add</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 45,
    fontFamily: 'poppins-bold',
    color: Colors.white
  },
  description: {
    color: Colors.white,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
    marginHorizontal: 15
  },
  buttons: {
    borderRadius: 25,
    marginTop: '20%',
    backgroundColor: Colors.myGreen,
    paddingHorizontal: 50,
    width: '100%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  buttons2: {
    borderRadius: 25,
    marginTop: '5%',
    backgroundColor: Colors.white,
    paddingHorizontal: 50,
    width: '100%',
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'poppins',
    textAlign: "center",
    fontSize: 18,
  },
  buttonText2: {
    color: Colors.myGreen,
    fontFamily: 'poppins',
    textAlign: "center",
    fontSize: 18
  },
});
