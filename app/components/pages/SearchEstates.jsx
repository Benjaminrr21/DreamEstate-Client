import { View, Text, ImageBackground, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors';
import {SelectList} from 'react-native-dropdown-select-list'
import {launchImageLibrary} from 'react-native-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons';
import NAV from '../Nav';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from '../Nav';
import Tabs from '../Tabs';



export default function SearchEstate() {
  const image = {uri: 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1722859171/pexels-photo-3075447_nvlwyt.webp'};
  const [selected,setSelected] = useState("");
  const [selectedCategory,setSelectedCategory] = useState("");
  const [images,setImages] = useState([])
  const [loc,setLoc] = useState("");
  const [rooms,setRooms] = useState("")
  const [minArea,setMinArea] = useState("")
  const [maxArea,setMaxArea] = useState("")
  const [minPrice,setMinPrice] = useState("")
  const [maxPrice,setMaxPrice] = useState("")
  const [url,setUrl] = useState(`http://192.168.1.4:5000/api/estates/properties?`)
  const nav = useNavigation();
  const options = [
      {key:'0',value:"Izaberi tip nekretnine", disabled:true} ,
      {key:'1',value:"Kuca"},
      {key:'2',value:"Stan"},
      {key:'3',value:"Poslovni prostor"},
  ]    
  const categories = [
      {key:'0',value:"Kategorija"},
      {key:'1',value:"PRODAJA"},
      {key:'2',value:"IZDAVANJE"},
  ]    
  const pickImage = async () => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
      } else {
        if (response.assets) {
          setImages([...images, ...response.assets.map(asset => asset.uri)]);
        }
      }
    } catch (error) {
      console.log('Unexpected error: ', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const vieww = async(value) =>{
      setUrl("http://192.168.1.2:5000/api/estates/properties?city="+loc+"&category="+categories[selectedCategory].value+"&type="+options[selected].value+"&rooms="+rooms+"&minPrice="+minPrice+"&maxPrice="+maxPrice+"&minArea="+minArea+"&maxArea="+maxArea)
       //const a = await AsyncStorage.getItem("token");
       //console.log(url);
       setTimeout(() => {
           console.log(url);
       nav.navigate("components/pages/Estates",{urlNew:url})

       }, 1500);

    //console.log(a);
  
}
  return (
      <ImageBackground style={styles.image} source={image} resizeMode='cover'>
        
        <Nav/>
        <View style={styles.container}>
        
        <View style={styles.inner}>
            <Text style={styles.heading}><Ionicons name="search" size={24} color={Colors.myGreen} /> Pronadji nekretninu</Text>
            <Text style={{
                fontSize:10
            }}>*Polja za unos nisu obavezna.</Text>
            <View style={styles.formelement1}>

            <SelectList style={styles.select} defaultOption={options[0]} data={options} setSelected={setSelected}/>
            </View>
            <View style={styles.formelement1}>
            <SelectList style={styles.select} defaultOption={categories[0]} data={categories} setSelected={setSelectedCategory}/>
            </View>
            <View style={styles.formelement}>
                <View style={styles.input2}>
                    <Ionicons style={styles.icons} name="pricetags-outline" size={20} color={Colors.myGreen} /> 
                    <TextInput value={minPrice} onChangeText={val=>setMinPrice(val)} placeholder=' Cena od' style={{flex:2}} inputMode='numeric'></TextInput>
                    <TextInput value={maxPrice} onChangeText={val=>setMaxPrice(val)} placeholder=' Cena do' style={{flex:2}} inputMode='numeric'></TextInput>
                    <Text>E/m2</Text>
                </View>
            </View>
            <View style={styles.formelement}>
                <View style={styles.input2}>
                <Ionicons style={styles.icons} name="location-sharp" size={24} color={Colors.myGreen} />
                    <TextInput value={loc} onChangeText={(val=>setLoc(val.replace(/ /g, "+")))} style={{flex:1}} placeholder='Lokacija'></TextInput>
                </View>
            </View>
            <View style={styles.formelement}>
            <Ionicons style={styles.icons} name="home" size={24} color={Colors.myGreen} />
                <TextInput value={rooms} onChangeText={(val => setRooms(val))} placeholder='Broj soba' inputMode='numeric'></TextInput>
            </View>
            <View style={styles.formelement}>
                <View style={styles.input2}>
                <Ionicons style={styles.icons} name="crop" size={24} color={Colors.myGreen} />
                    <TextInput value={minArea} onChangeText={val=>setMinArea(val)}  style={{flex:1}} placeholder='Povrsina od'></TextInput>
                    <TextInput value={maxArea} onChangeText={val=>setMaxArea(val)} style={{flex:1}} placeholder='Povrsina do'></TextInput>
                    <Text>m2</Text>
                </View>
            </View>
            
            
            <TouchableOpacity onPress={vieww} style={styles.submit}>
           
                <Text style={{
                    color:Colors.white,
                    fontSize:20,
                    fontFamily:"poppins-bold",
                    textAlign:'center'
                }}> <Ionicons name="search" size={24} color={Colors.white} /> Pretraga</Text>
            </TouchableOpacity>
            
            
            
        </View>
        </View>
        <Tabs/>
      </ImageBackground>
   
  )
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
    },
    container:{
        height:"100vh",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:30,
    },
    inner: {
        width:"100%",
        backgroundColor:Colors.white,
        textAlign:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:'5%',
        borderRadius:15
    },
    heading:{
        fontSize:25,
        textAlign:"center",
        marginBottom:"10%",
        fontFamily:'poppins-medium',
        color:Colors.myGreen
    },
    formelement:{
        marginVertical:'3%',
        display:'flex',
        flexDirection:'row'
       
    },
    formelement1:{
        marginVertical:'3%',
        
       
    },
    label:{
        fontFamily:'poppins',
        fontSize:15
    },
    input2:{
        display:'flex',
        flexDirection:'row',
        width:'100%'
    },
    imageContainer:{
        flexDirection:"row",
        flexWrap:'wrap'
    },
    selectedImage:{
        width:100,
        height:100,
        margin:5
    },
    imagepicker:{
        backgroundColor:Colors.myGreen,
        padding:10,
        borderRadius:15
    },
    submit:{
        backgroundColor:Colors.myGreen,
        padding:10,
        borderRadius:15,
        marginVertical:15  
    },
    select:{
        flex:1
    },
    icons:{
        marginRight:'2%'
    }
    
})