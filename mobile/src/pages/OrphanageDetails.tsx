import React, {useState, useEffect} from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';

import mapMarkerImg from '../images/mapMarker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface ReceiveParamsDetails{
    id: number;
}

interface Orphanage{
    id: number,
    name: string,
    about: string,
    whatsapp: number,
    latitude: number,
    longitude: number,
    instructions: string,
    opening_hours: string,
    open_on_weekeds: boolean,
    images: Array<{
        id: number,
        url: string,
    }>
}

export default function OrphanageDetails() {

    const rout = useRoute();
    const [orphanage, setOrphanage] = useState<Orphanage>()

    const params = rout.params as ReceiveParamsDetails;

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response =>{
            setOrphanage(response.data);
        });
    },[params.id]);


    if(!orphanage){
        return(
            <View style={styles.description}>
                <Text>Nenhum orfanato encontrado</Text>
            </View>
        )
    }

    function handleOpemGoogleMapsRout(){
        Linking.openURL(`https://google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`)
    }

    function handleOpemWhats(){
      Linking.openURL(`https://api.whatsapp.com/send?phone=${orphanage.whatsapp}&text=${orphanage.name}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
            {orphanage.images.map(image =>{
                return(
                    <Image key={image.id} style={styles.image} source={{ uri: image.url }} />
                );
                
            })}
          

        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity style={styles.routesContainer} onPress={handleOpemGoogleMapsRout}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>

        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage.opening_hours}</Text>
          </View>
          {orphanage.open_on_weekeds ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                <Feather name="info" size={40} color="#39CC83" />
                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
            </View>
          ):(
            <View style={[styles.scheduleItem, styles.scheduleItemRed ]}>
                <Feather name="info" size={40} color="#FF669D" />
                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
            </View>
          )}
        </View>

        <RectButton style={styles.contactButton} onPress={handleOpemWhats}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 28,
    fontFamily: 'PTSans_700Bold',
  },

  description: {
    fontFamily: 'PTSans_400Regular',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'PTSans_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCd4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'PTSans_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'PTSans_700Bold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})