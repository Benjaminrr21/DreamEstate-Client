import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Alert } from 'react-native';
import { backgroundImage } from '../../../constants/Images'
import { Colors } from '../../../constants/Colors';
import { useNavigation } from 'expo-router';

export default function InsertCode({route}) {
    const [inserted,setInserted] = useState()
    const {code, role} = route.params;
    const nav=useNavigation()

    const check = () => {
      console.log(role)
       if(inserted == code){
          Alert.alert("Uspesno!!!")
          if(role == "KUPAC")
            nav.navigate("components/pages/SearchEstates")
          if(role == "PRODAVAC")
            nav.navigate("components/pages/AddEstate")
       }
       else Alert.alert("NE PODUDARA SE KOD!")
    }
  return (
      <ImageBackground src={backgroundImage.uri}>
    <View style={styles.container}>
     <View style={{
       backgroundColor:Colors.white,
       width:"100%",
       padding:20,
       alignItems:"center",
       paddingVertical:20,
       borderRadius:15,
     }}>
     <Text style={{
        color:Colors.myGreen,
        fontSize:20,
        fontFamily:"poppins"
      }}>Unesite kod koji ste dobili na mejl:</Text>
      <TextInput style={{
        padding:8,
        marginVertical:20,
        borderWidth:0.5,
        width:"90%",
        borderBottomColor:Colors.dark,
        
      }} value={inserted} onChangeText={val => setInserted(val)} placeholder='Kod...' inputMode='numeric'></TextInput>
      <TouchableOpacity onPress={check} style={{
        backgroundColor:Colors.myGreen,
        padding:10,
        borderRadius:15,


      }}>
          <Text style={{
            color:Colors.white,
            fontFamily:"poppins"
          }}>Provera</Text>
      </TouchableOpacity>
     </View>
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container:{
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:20
  }
})