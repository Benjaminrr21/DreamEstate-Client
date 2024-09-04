import React from 'react';
import { View, Text, StyleSheet, TextBase, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/pages/HomePage';
import Nav from './components/Nav';
import LoginRegister from './components/pages/LoginRegister';
import Registration from './components/pages/Registration';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Estates from './components/pages/Estates';
import SearchEstate from './components/pages/SearchEstates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './components/stacks/HomeStack';
import { Colors } from '../constants/Colors';
import AddEstate from './components/pages/AddEstate';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EstatePage from './components/pages/EstatePage';
import InsertCode from './components/pages/InsertCode';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Layout = () => {
  const nav = useNavigation();
  const [fontsLoaded] = useFonts({
    'poppins': require('./../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('./../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'poppins-italic': require('./../assets/fonts/Poppins-MediumItalic.ttf'),
  });
  const [isLogged,setIsLogged] = useState(false);
  const checkIsLoggedIn = async() => {
    if(await AsyncStorage.getItem("token")!=null) setIsLogged(true)
    else setIsLogged(false)
  }
  useEffect(()=>{
    checkIsLoggedIn()
  },[])
  //if(checkIsLoggedIn==true){
  return (
    <View style={styles.container}>
      
      <Stack.Navigator>
        <Stack.Screen name="components/pages/HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="components/pages/LoginRegister" component={LoginRegister} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/Registration" component={Registration} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/Estates" component={Estates} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/EstatePage" component={EstatePage} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/SearchEstates" component={SearchEstate} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/AddEstate" component={AddEstate} options={{headerShown:false}}/>
        <Stack.Screen name="components/pages/InsertCode" component={InsertCode} options={{headerShown:false}}/>
      </Stack.Navigator>
       
      </View>
  );
    
    
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    fontSize: 20,
  },
  footer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    fontSize: 16,
  },
  tabs:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    paddingVertical:15
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
});

export default Layout;
