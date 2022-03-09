import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import PlaylistScreen from '../screen/PlaylistScreen';
import SeacherScreen from '../screen/SeacherScreen';
import Logo from '../assets/logo.png'
import { Image, TouchableOpacity } from 'react-native';


const AuthStackApp = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthStackApp