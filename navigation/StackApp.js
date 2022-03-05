import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import PlaylistScreen from '../screen/PlaylistScreen';
import SeacherScreen from '../screen/SeacherScreen';
import Logo from '../assets/logo.png'
import { Image, TouchableOpacity } from 'react-native';


const StackApp = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#0D0D0D"
      },
      headerTitle: () => null,
      headerLeft: () => <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
        <Image source={Logo} style={{ height: 60, width: 60 }} />
      </TouchableOpacity>
    })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="Seacher" component={SeacherScreen} />
    </Stack.Navigator>
  )
}

export default StackApp