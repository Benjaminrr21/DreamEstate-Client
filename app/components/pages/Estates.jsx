import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as S from 'expo-secure-store'
import { useNavigation } from 'expo-router'
import axios from 'axios'
import URLs from './../../../constants/URLs'
import EstateCard from '../EstateCard'
import Nav from './../Nav'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../../constants/Colors'

export default function Estates() {
    const nav = useNavigation();
    const [estates,setEstates] = useState([]);
    const logout = () => {
        S.deleteItemAsync("token");
        S.deleteItemAsync("role");
        nav.navigate("Home")
    }

    const getAllEstates = async() => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/estates").then(
          res => {
          console.log(res);
          setEstates(res.data)
          },
          er => console.log(er)
        )
      }catch(er) {
        console.log(er);
      }
    }
    useEffect(()=>{
    getAllEstates();
    },[])
  return (
    <View style={styles.container}>
      <Nav/>
      <View style={styles.sortfiltering}>
      <TouchableOpacity style={styles.sort}>
        <Text style={styles.text}>
        <FontAwesome name="sort" size={20} color="black" /> Sortiraj oglase
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filter}>
        <Text style={{
          fontFamily:'poppins',
          textAlign:'center',
          color:Colors.white
        }}><AntDesign name="filter" size={20} color="white" /> Vise filtera</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.estates}>
      <Text style={styles.heading}>Prodaja stanova, Srbija</Text>
      <FlatList style={{
        marginTop:10
      }} data={estates}
      keyExtractor={item => item.id} renderItem={({item,index}) => (
        <TouchableOpacity
        onPress={()=>nav.navigate("EstatePage",{id:item._id})}
        style={{
          marginVertical:6,
        }}>
          <EstateCard estate={item}/>
        </TouchableOpacity>
      )}></FlatList>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
        alignItems:'center',
        paddingTop:30,
        paddingHorizontal:20,
  },
  text:{
    fontFamily:'poppins',
    textAlign:'center'
  },
  sortfiltering:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingTop:30

  },estates:{
    width:'100%',
    paddingTop:50
  },
  heading: {
    fontFamily:'poppins',
    textAlign:'center',
    fontSize:27
  },
  sort:{
    backgroundColor:Colors.light,
    width:'50%',
    height:'100%',
    paddingVertical:5,
    paddingHorizontal:8,

  },
  filter:{
    backgroundColor:Colors.myGreen,
    width:'50%',
    height:'100%',
    paddingVertical:6,
    paddingHorizontal:10,
    borderRadius:10
  }
})