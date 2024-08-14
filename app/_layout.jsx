import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import HomePage from './components/pages/HomePage'

export default function _layout() {
     useFonts({
        'poppins':require('./../assets/fonts/Poppins-Regular.ttf'),
        'poppins-medium':require('./../assets/fonts/Poppins-Medium.ttf'),
        'poppins-bold':require('./../assets/fonts/Poppins-Bold.ttf'),
        'poppins-italic':require('./../assets/fonts/Poppins-MediumItalic.ttf'),
    }) 
  return (
    <Stack/>
  )
}