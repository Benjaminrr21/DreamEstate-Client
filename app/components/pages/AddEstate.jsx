import { View, Text, ImageBackground, StyleSheet, TextInput, Button, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { SelectList } from 'react-native-dropdown-select-list';
import Ionicons from '@expo/vector-icons/Ionicons';
import Nav from '../Nav';
import Tabs from '../Tabs';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

export default function AddEstate() {
  const image = { uri: 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1722859171/pexels-photo-3075447_nvlwyt.webp' };
  const [type, setType] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [rooms, setRooms] = useState();
  const [number, setNumber] = useState();
  const [area, setArea] = useState();
  const [year, setYear] = useState();
  const [heating, setHeating] = useState();
  const [images, setImages] = useState([]);

  const types = [
    { key: '0', value: "Izaberi tip nekretnine", disabled: true },
    { key: '1', value: "Kuca" },
    { key: '2', value: "Stan" },
    { key: '3', value: "Garaza" },
  ];

  const categories = [
    { key: '0', value: "Kategorija" },
    { key: '1', value: "PRODAJA" },
    { key: '2', value: "IZDAVANJE" },
  ];

  const pickImage = async () => {
    if (images.length >= 4) {
      Alert.alert('Limit dostignut', 'Možete odabrati maksimalno 4 slike.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      let uploadedUrls = [];

      for (let imageUri of selectedImages) {
        const data = new FormData();
        data.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'image.jpg'
        });
        data.append('upload_preset', 'hci');

        try {
          const response = await fetch('https://api.cloudinary.com/v1_1/dx1ec9jse/image/upload', {
            method: 'POST',
            body: data
          });

          const responseData = await response.json();
          uploadedUrls.push(responseData.secure_url);
        } catch (error) {
          console.log(error);
          Alert.alert("Greška prilikom upload-a slike.");
        }
      }

      setImages(prevImages => [...prevImages, ...uploadedUrls]);
    }
  };

  const addEstate = async () => {
    try {
      const estate = await axios.post("http://192.168.1.2:5000/api/estates", {
        type,
        category,
        pricePerM2: price,
        city,
        location: `${street} ${number}`,
        rooms,
        area,
        heating,
        year,
        image1: images[0] || null,
        image2: images[1] || null,
        image3: images[2] || null,
        image4: images[3] || null,
      });
      console.log(estate);
      Alert.alert("Uspešno dodavanje nekretnine!");
    } catch (e) {
      console.log(e);
      Alert.alert("Neuspešno dodavanje nekretnine...");
    }
  };

  return (
    <ImageBackground style={styles.image} source={image} resizeMode='cover'>
      <Nav />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inner}>
            <Text style={styles.heading}><Ionicons name="add" size={30} color={Colors.myGreen} />Dodaj novi oglas</Text>

            <View style={styles.formelement1}>
              <SelectList style={styles.select} defaultOption={types[0]} data={types} setSelected={setType} />
            </View>
            <View style={styles.formelement1}>
              <SelectList style={styles.select} defaultOption={categories[0]} data={categories} setSelected={setCategory} />
            </View>
            <View style={styles.formelement}>
              <View style={styles.input2}>
                <Ionicons style={styles.icons} name="pricetags-outline" size={20} color={Colors.myGreen} />
                <TextInput value={price} onChangeText={(val) => setPrice(val)} placeholder=' Cena po kvadratu' style={{ flex: 2 }} inputMode='numeric'></TextInput>
                <Text>E/m2</Text>
              </View>
            </View>
            <View style={styles.formelement}>
              <View style={styles.input2}>
                <Ionicons style={styles.icons} name="location-sharp" size={24} color={Colors.myGreen} />
                <TextInput value={city} onChangeText={(val) => setCity(val)} style={{ flex: 1 }} placeholder='Grad'></TextInput>
                <TextInput value={street} onChangeText={(val) => setStreet(val)} style={{ flex: 1 }} placeholder='Ulica'></TextInput>
                <TextInput value={number} onChangeText={(val) => setNumber(val)} style={{ flex: 1 }} placeholder='Broj'></TextInput>
              </View>
            </View>

            <View style={styles.formelement}>
              <Ionicons style={styles.icons} name="home" size={24} color={Colors.myGreen} />
              <TextInput value={rooms} onChangeText={(val) => setRooms(val)} placeholder='Broj soba' inputMode='numeric'></TextInput>
            </View>
            <View style={styles.formelement}>
              <View style={styles.input2}>
                <Ionicons style={styles.icons} name="crop" size={24} color={Colors.myGreen} />
                <TextInput value={area} onChangeText={(val) => setArea(val)} style={{ flex: 2 }} placeholder='Povrsina'></TextInput>
                <Text>m2</Text>
              </View>
            </View>
            <View style={styles.formelement}>
              <Ionicons style={styles.icons} name="calendar" size={24} color={Colors.myGreen} />
              <TextInput value={year} onChangeText={(val) => setYear(val)} placeholder='Godina' inputMode='numeric'></TextInput>
            </View>
            <View style={styles.formelement}>
              <Ionicons style={styles.icons} name="logo-firebase" size={24} color={Colors.myGreen} />
              <TextInput value={heating} onChangeText={(val) => setHeating(val)} placeholder='Tip grejanja'></TextInput>
            </View>
            <View style={styles.formelement}>
              <TouchableOpacity style={styles.imagepicker} onPress={pickImage}>
                <Text style={{ color: Colors.white, textAlign: "center", fontFamily: "poppins-medium" }}>
                  <Ionicons style={styles.icons} name="images" size={20} color={Colors.white} />  Odaberite slike
                </Text>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                {images.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.selectedImage}></Image>
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={addEstate}
              style={styles.submit}>
              <Text style={{
                color: Colors.white,
                fontSize: 20,
                fontFamily: "poppins-bold",
                textAlign: 'center'
              }}> <Ionicons style={styles.icons} name="add-circle-sharp" size={20} color={Colors.white} /> Dodaj oglas</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Tabs />
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
        paddingVertical:5
    },
    inner: {
        width:"100%",
        backgroundColor:Colors.white,
        textAlign:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:15
    },
    heading:{
        fontSize:27,
        textAlign:"center",
        marginBottom:"5%",
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