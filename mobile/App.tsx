import React from 'react';
import { Text } from 'react-native';

import {useFonts} from 'expo-font';
import {PTSans_400Regular, PTSans_700Bold} from '@expo-google-fonts/pt-sans';

import Routes from './src/routes';

export default function App() {
  
  const [fontLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  });

  if(!fontLoaded){
    return <Text>Carregando...</Text>
  }
  return (
    <Routes/>
  );
}