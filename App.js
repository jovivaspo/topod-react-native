import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/LoginScreen';
import PlaylistScreen from './screen/PlaylistScreen';
import SeacherScreen from './screen/SeacherScreen';
import HomeScreen from './screen/HomeScreen';
import Logo from './assets/logo.png'


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={({navigation})=>({
        headerStyle: {
          backgroundColor: "#0D0D0D"
        },
        headerTitle: ()=>null,
        headerLeft: () => <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Image source={Logo} style={{ height: 60, width: 60 }} />
        </TouchableOpacity>
      })}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="Seacher" component={SeacherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
