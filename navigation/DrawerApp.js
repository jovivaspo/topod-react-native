import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity, Image } from 'react-native';
import Logo from '../assets/logo.png'
import SeacherScreen from '../screen/SeacherScreen';
import PlaylistScreen from '../screen/PlaylistScreen'
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import Player from '../components/Player';


const Drawer = createDrawerNavigator();

const DrawerApp = () => {

    const audioPlayer = useSelector(state => state.audioPlayer)


    return (

        <>
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={({ navigation }) => ({

                    headerStyle: {
                        backgroundColor: '#0D0D0D',
                    },

                    headerTintColor: '#fff',

                    headerRight: () => <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                        <Image source={Logo} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>,

                    headerTitle: () => null,
                    drawerActiveBackgroundColor: '#CEA858',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerLabelStyle: {
                        marginLeft: -25,
                        fontFamily: 'Montserrat_Medium'
                    }
                })}
            >
                <Drawer.Screen name="Home" component={HomeScreen} options={{
                    drawerIcon: () => <Icon name="home-outline" size={22} color={'#fff'} />
                }} />

                <Drawer.Screen name="Buscar" component={SeacherScreen} options={{
                    drawerIcon: () => <Icon name="search-outline" size={22} color={'#fff'} />
                }} />

                <Drawer.Screen name="Playlist" component={PlaylistScreen} options={{
                    drawerIcon: () => <Icon name="play-circle-outline" size={22} color={'#fff'} />
                }} />

            </Drawer.Navigator>

            {audioPlayer.currentSong &&

                (<View style={{
                    position: 'absolute',
                    bottom: 14,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Player />
                </View>)

            }

        </>

    )
}

export default DrawerApp