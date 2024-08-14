import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import HomePage from './components/pages/HomePage'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegister from './components/pages/LoginRegister'
import Registration from './components/pages/Registration';
import Estates from './components/pages/Estates';
import EstatePage from './components/pages/EstatePage';
export default function Index() {
  const image = {uri: 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1722859171/pexels-photo-3075447_nvlwyt.webp'};
  const Stack = createNativeStackNavigator();
  const nav = useNavigation();
  useEffect(()=>{
    nav.setOptions({
      headerShown:false
    })
  },[])
  
  return (
      <ImageBackground style={styles.image} source={image} resizeMode='cover'>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginRegister" component={LoginRegister} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name="Estates" component={Estates} options={{ headerShown: false }} />
          <Stack.Screen name="EstatePage" component={EstatePage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ImageBackground>
  )
  
  
}
const styles = StyleSheet.create({
  container: {
      flex:1
  },
  image: {
      flex:1,
      justifyContent:'center',
  }
}) 
 