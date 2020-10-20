
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import {Feather} from '@expo/vector-icons';

import mapMarker from '../images/mapMarker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../services/api';

interface OrphanageItems {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function OrphanegeMap(){

  const [orphanages, setOrphanages] = useState<OrphanageItems[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });


  const navigation = useNavigation();

  function handlernavigateToOrphanageDethail(id: number){
    navigation.navigate('OrphanegeDatails', {id});
  }

  function handlerNavigateToCreateOrphanage(){
    navigation.navigate('SelectMapPosition');
  }

    return (
        <View >
      
            <MapView style={styles.map} 
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                  latitude: -21.132948,
                  longitude: -48.976935,
                  latitudeDelta: 0.08,
                  longitudeDelta: 0.08,
              }}
            >
    
            {orphanages.map(orphanage =>{
              return(
                <Marker
                  key={orphanage.id}
                  style={styles.marker}
                  icon={mapMarker}
                  calloutAnchor={{
                  x: 2.9,
                  y: 0.9,
                  }}
                  coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                  }}
              >
                  
                  <Callout tooltip onPress={()=> handlernavigateToOrphanageDethail(orphanage.id)}>
      
                  <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
      
                  </Callout>
      
              </Marker>
              );
            })}
    
            </MapView>
    
            <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
    
            <TouchableOpacity 
                style={styles.createOrphanegeButton} 
                onPress={handlerNavigateToCreateOrphanage}>
                <Feather name="plus" size={20} color="#FFF"/>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    marker:{
      height: 32,
      width: 32,
    },
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText:{
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'PTSans_700Bold',
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 46,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10,
    },
    footerText:{
      color: '#0089a5',
      fontFamily: 'PTSans_700Bold',
    },
    createOrphanegeButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 50,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  