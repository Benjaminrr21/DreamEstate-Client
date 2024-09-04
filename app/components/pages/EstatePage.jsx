import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors } from '../../../constants/Colors';
import Nav from './../Nav';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorSpace } from 'react-native-reanimated';
import Tabs from '../Tabs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EstatePage({ route }) {
  const { id, ownerId } = route.params;
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherEstates,setOtherEstates] = useState([])
  const [estates,setEstates] = useState([])

  const fetchEstate = async () => {
    try {
      const response = await axios.get('http://192.168.1.4:5000/api/estates/' + id);
      setEstate(response.data);
      setLoading(false);
      console.log("REZULTAT:",response.data);
     
   
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  const fetchOtherEstates = async() => {
    try {
      const response = await axios.get('http://192.168.1.2:5000/api/estates/owner/' + ownerId);
      console.log(response.data);
      setEstates(response.data)
    } catch (e) {
      console.log(e);
      
    }
  }

  const insertFavorite = async() => {
    try {
    const favorite = await axios.post('http://192.168.1.2:5000/api/favoritelist',{
      user:await AsyncStorage.getItem("id"),
      estate:estate._id
    })
    console.log(favorite);
  }catch(err){
    console.log(err);
  }
  }

  useEffect(() => {
    console.log(id)
    console.log(ownerId);
    fetchEstate();
  
    


  }, []);

  useEffect(() => {
    if (estate) {
      fetchOtherEstates();
    }
  }, [estate]);

  useEffect(() => {
    if (estates) {
      setOtherEstates(estates.filter(es => es._id != id))

    }
  }, [estates]);

    
const nav = useNavigation()
 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.myGreen} />
        <Text>Loading...</Text>
      </View>
    );
  }
 

  return (

<View style={styles.containerView}>
<Nav />

      <ScrollView style={styles.scrollView}>

        <Text style={styles.heading}>
          Trosoban stan na prodaju
        </Text>
        
        <Text style={styles.headings}>
      <Ionicons name="location-sharp" size={24} color={Colors.myGreen} />

          {estate.location}
        </Text>
        <TouchableOpacity style={styles.location}>
          <Text style={styles.heading3}>
            <Entypo name="location" size={24} color={Colors.myGreen} /> Prikazi na mapi
          </Text>
        </TouchableOpacity>
        <Image style={styles.image} source={{ uri: estate.photo }} />
        <View style={styles.price}>
          <Text style={styles.price1}>{estate.pricePerM2 * estate.area} €</Text>
          <Text style={styles.price2}>{estate.pricePerM2} €/m2</Text>
        </View>
        <TouchableOpacity onPress={insertFavorite} style={styles.save}>
          <Text style={{
            color:Colors.myGreen,
            fontFamily:"poppins-medium",
            fontSize:15
          }}><Ionicons name="bookmark-outline" size={22} color={Colors.myGreen}/>
          Sacuvaj oglas
          </Text>
        </TouchableOpacity>
        <Text style={styles.headings}>Opis oglasa</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
          Trosoban stan na ekskluzivnoj lokaciji u centru grada, idealan za porodični život. Stan se nalazi na trećem spratu dobro održavane zgrade, sa liftom i video nadzorom. Prostrana dnevna soba sa izlazom na terasu pruža prelep pogled na park, dok su kuhinja i trpezarija odvojene i moderno opremljene.
          </Text>
        </View>
        <Text style={styles.headings}>Karakteristike</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
          <View style={styles.featureItem}>
          <Ionicons name="logo-firebase" size={24} color={Colors.myGreen} />
            <Text style={styles.featureText}>Grejanje: {estate.heating}</Text>
          </View>
          <View style={styles.featureItem}>
          <Ionicons name="home" size={24} color={Colors.myGreen} />
            <Text style={styles.featureText}>Broj soba: {estate.rooms}</Text>
          </View>
          <View style={styles.featureItem}>
          <Ionicons name="crop" size={24} color={Colors.myGreen} />
            <Text style={styles.featureText}>Površina: {estate.area} m²</Text>
          </View>
          <View style={styles.featureItem}>
          <Ionicons name="today-sharp" size={24} color={Colors.myGreen} />
            <Text style={styles.featureText}>Godina izgradnje: {estate.yearBuilt}</Text>
          </View>
        </ScrollView>
        <View style={{
          marginVertical:15
        }}>
        <Text style={styles.headings}>Kontakt</Text>

          <TouchableOpacity style={styles.phone}>
            <Text style={styles.phoneText}>
            <FontAwesome name="phone" size={24} /> {estate.owner.phone} 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.email}>
            <Text style={styles.emailText}><Fontisto name="email" size={20}  /> Posalji mejl</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headings}>Ostali oglasi ovog oglašivača</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featuresScroll2}>
              {otherEstates.map((estate,index) => (
              <TouchableOpacity style={styles.featureItem2} onPress={()=>nav.navigate("components/pages/Estates")}>
                <Image style={styles.imageCard} source={{uri:estate.photo}}></Image>
                <View style={{
                  paddingHorizontal:5,
                  paddingVertical:3
                }}>
                  <Text style={styles.featureText}>{estate.location}</Text>
                </View>
              </TouchableOpacity>
              ))
              }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Tabs/>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: '7%',
    paddingHorizontal:"5%",
    backgroundColor:Colors.white,
    marginVertical:"7%",
    backgroundColor:Colors.white
  },
  descriptionText:{
    fontFamily:'poppins-medium',
  },
  containerView: {
    paddingVertical: '10%',
  },
  image: {
    height: 250,
    width: '100%',
  },
  imageCard: {
    height: 100,
    width: '100%',
  },
  heading: {
    fontFamily: 'poppins-medium',
    fontSize: 25,
  },
  heading2: {
    fontFamily: 'poppins',
    fontSize: 20,
  },
  heading3: {
    fontFamily: 'poppins',
    fontSize: 16,
  },
  price: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    alignItems: "flex-end",
  },
  price1: {
    backgroundColor: Colors.myGreen,
    width: '40%',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'poppins-bold',
  },
  price2: {
    backgroundColor: Colors.lightGreen,
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'poppins-bold',
    borderBottomLeftRadius: 15,
  },
  location: {
    backgroundColor: Colors.light,
    marginVertical: '2%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phone:{
    backgroundColor:Colors.myGreen,
    width:'100%',
    padding:10,
    borderRadius:8
  },
  email:{
    width:'100%',
    backgroundColor:Colors.white,
    borderRadius:8,
    borderWidth:1,
    borderColor:Colors.myGreen,
    padding:10
  },
  phoneText:{
    fontFamily:'poppins-medium',
    color:Colors.white,
    textAlign:"center",
    fontSize:16
  },
  emailText:{
    fontFamily:'poppins-medium',
    color:Colors.myGreen,
    textAlign:"center",
    fontSize:16
  },
  featuresScroll: {
    marginTop: 20,
    marginBottom: 20,
  },
  featuresScroll2: {
    marginBottom: "15%",
    width:"100%",
  },
  featureItem: {
    backgroundColor: Colors.white,
    paddingVertical: 30,
    marginRight: 10,
    borderColor:Colors.myGreen,
    paddingHorizontal:15,
    elevation:35,
    borderWidth:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'

  },
  featureItem2: {
    backgroundColor: Colors.white,
    paddingTop: 0,
    marginRight: 10,
    borderColor:Colors.myGreen,
    elevation:35,
    borderWidth:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:120,
    paddingBottom:"10%"
  },
  featureText: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color:Colors.myGreen
  },
  featureText: {
    fontFamily: 'poppins-medium',
    fontSize: 13,
    color:Colors.dark
  },
  headings: {
    fontSize:17,
    marginTop:15,
    fontFamily:'poppins-bold'
  },
  save:{
    width:"100%",
    borderRadius:15,
    borderColor:Colors.myGreen,
    borderWidth:1,
    display:"flex",
    alignItems:"center",
    marginTop:"5%",
    paddingVertical:10

  }
});
