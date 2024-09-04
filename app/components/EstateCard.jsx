import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function EstateCard({estate}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:estate.photo}}>
          
      </Image>
      <View style={styles.info}>
            <View style={styles.addressprice}>
                <Text style={styles.text}>{estate.location}</Text>
                <View style={styles.price}>
                    <Text style={{
                        color:Colors.white,
                        textAlign:'center',
                        fontFamily:"poppins-bold",
                        fontSize:17
                    }}>{estate.pricePerM2*estate.area} €</Text>
                    <Text style={{
                        color:Colors.white,
                        textAlign:'center',
                        fontFamily:"poppins",
                        fontSize:12
                    }}>{estate.pricePerM2} €/m2</Text>
                </View>
            </View>
            <View style={styles.otherinfo}>
                <Text style={{fontFamily:'poppins-medium',fontSize:16}}>{estate.type}</Text>
                <Text style={{fontFamily:'poppins-medium',fontSize:16}}>{estate.rooms} sobe</Text>
                <Text style={{fontFamily:'poppins-medium',fontSize:16}}>{estate.area} m2</Text>
            </View>
      
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    info:{
      width:'65%'  ,
      display:'flex',
      flexDirection:"column"
    },
    image:{
    width:'35%',
    borderWidth:1,
    marginLeft:-10,
    marginTop:-16,
    marginBottom:-15,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    },
    text:{
        fontFamily:'poppins-bold'
    },
    addressprice:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:"row"
    },
    price: {
        backgroundColor:Colors.myGreen,
        paddingHorizontal:7,
        paddingVertical:5,
        shadowColor:'black',
        borderRadius:13,
        marginTop:-16,
        marginRight:-15
        
    },
    otherinfo:{

    }
})