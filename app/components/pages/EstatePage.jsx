import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors } from '../../../constants/Colors';
import Nav from './../Nav';
import Entypo from '@expo/vector-icons/Entypo';

export default function EstatePage({ route }) {
  const { id } = route.params;
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEstate = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/estates/' + id);
      setEstate(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstate();
  }, []);

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
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>
          Trosoban stan na prodaju
        </Text>
        <Text style={styles.heading2}>
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
        <View>
          <Button style={styles.phone} title={estate.owner.phone} onPress={() => alert(`Broj vlasnika: ${estate.owner.phone}`)} />
          <Button style={styles.email} title={estate.owner.email} onPress={() => alert('Email poslat!')} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: '7%',
  },
  containerView: {
    paddingVertical: '10%',
    paddingHorizontal: '3%',
  },
  image: {
    height: 250,
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
    color:Colors.dark
  }
});
