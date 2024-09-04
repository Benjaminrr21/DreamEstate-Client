import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native'
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
import { SelectList } from 'react-native-dropdown-select-list'
import Tabs from '../Tabs'

export default function Estates({route}) {
  const {urlNew} = route.params;
  const [visibleModal,setVisibleModal] = useState(false)

    const nav = useNavigation();
    const [sortUrl,setSortUrl] = useState("http://192.168.1.2:5000/api/estates/sort?sortBy=rooms&order=desc");
    const [estates, setEstates] = useState([]);
    const [loading,setLoading] = useState(true);
    //sort
    const [item,setItem] = useState("");
    const [way,setWay] = useState("");
    const sortItems = [
      {key:0,value:'Kvadratura'},
      {key:1,value:'Kvadratura'},
    ]
    const sortWay = [
      {key:0,value:'Rastuci'},
      {key:1,value:'Opadajuci'},
    ]
    const sortt = async() => {
      const item = "pricePerM2";
      const wayy = way == 0 ? "asc" : "desc";
      console.log(item,wayy);
      try {
      const sortingEstates = await axios.get("http://192.168.1.2:5000/api/estates/sort?sortBy="+item+"&order="+wayy)
      console.log(sortingEstates.data);
      setEstates(sortingEstates.data)
      hide()
      setLoading(false)
        
    }
      catch(e){
        console.log(e);
        setLoading(false)
      }
    }
    const logout = () => {
        S.deleteItemAsync("token");
        S.deleteItemAsync("role");
        nav.navigate("Home");
    }

    const show = () => setVisibleModal(true);
    const hide = () => setVisibleModal(false);


    const getAllEstates = async () => {
      try {
        console.log({urlNew});
        const response = await axios.get(urlNew).then(
          res => {
            console.log(res);
            setEstates(res.data);
            setLoading(false)
          },
          er => {
            console.log(er)
            setLoading(false)
          }
        );
      } catch (er) {
        console.log(er);
      }
    }

    useEffect(() => {
      getAllEstates();
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
      <View style={styles.container}>
       <Nav/>
        <View style={styles.sortfiltering}>
          <TouchableOpacity onPress={show} style={styles.sort}>
            <Text style={styles.text}>
              <FontAwesome name="sort" size={20} color="black" /> Sortiraj oglase
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text style={{
              fontFamily: 'poppins',
              textAlign: 'center',
              color: Colors.white
            }}> 
              <AntDesign name="filter" size={20} color="white" /> Vise filtera
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.estates}>
            <Text style={styles.heading}>Prodaja stanova, Srbija</Text>

            {estates.length==0 && <Text style={{
              textAlign:"center",
              alignItems:"center",
              color:Colors.myGreen,
              marginVertical:"50%"
            }}>Nema nekretnina koje zadovoljavaju ove kriterijume.</Text>}
            <FlatList 
              data={estates}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => nav.navigate("components/pages/EstatePage", {id: item._id, ownerId:item.owner})}
                  style={{ marginVertical: 6, elevation:20 }}
                >
                  <EstateCard estate={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }} // Dodajte padding na dnu za bolje skrolovanje
            />
          </View>
        </ScrollView>
        <Tabs style={{
        }}/>

        <Modal 
       
        visible={visibleModal}
        animationType='slide'
        transparent
        

        >
          <View  style={styles.modal} >
            <View style={styles.innerModal}>
              <Text>Sortiraj po:</Text>
              <SelectList date={sortItems} defaultOption={sortItems[0]} setSelected={setItem} style={styles.list}/>
              <Text>Redosled:</Text>
              <SelectList data={sortWay} defaultOption={sortWay[0]} setSelected={setWay} style={styles.list}/>
          <TouchableOpacity onPress={sortt} style={{
            backgroundColor:Colors.myGreen,
            padding:10,
            borderRadius:10,
            marginVertical:10,
          }} >
            <Text style={{
              color:Colors.white,
              fontFamily:'poppins-medium',
            }}>Sortiraj</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hide}>
            <Text style={{
              fontFamily:'poppins-medium'
            }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal:0,
  },
  text: {
    fontFamily: 'poppins',
    textAlign: 'center'
  },
  sortfiltering: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal:10
  },
  estates: {
    width: '100%',
    paddingTop: 20
  },
  heading: {
    fontFamily: 'poppins',
    textAlign: 'center',
    fontSize: 27
  },
  sort: {
    backgroundColor: Colors.light,
    width: '50%',
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  filter: {
    backgroundColor: Colors.myGreen,
    width: '50%',
    height: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingHorizontal:5,
  },
  modal: {
    display:'flex',
    paddingVertical:'60%',
    justifyContent:'center',
    alignItems:"center"
  },
  innerModal:{
    backgroundColor:Colors.white,
    borderColor:Colors.myGreen,
    borderWidth:2,
    shadowColor:Colors.myGreen,
    shadowOffset:0.5,
    shadowRadius:0.6,
    width:"90%",
    borderRadius:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:30
    
    
    
  },
  list:{
    marginBottom:7
  },
  loadingContainer: {
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    paddingTop:'50%'
  }
});
