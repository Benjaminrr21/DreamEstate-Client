import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../pages/HomePage';

export default function HomeStack() {
  
    const Stack = createNativeStackNavigator();
    return (
    <Stack.Navigator>
        <Stack.Screen name="components/pages/HomePage" component={HomePage}/>
    </Stack.Navigator>
  )
}