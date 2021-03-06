import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import ImageBackgroundHome from '../assets/Background-topodcast.webp'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import {  logout } from '../actions/userActions'
import Player from '../components/Player'



const HomeScreen = () => {


  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {currentSong} = useSelector(state => state.audioPlayer)



  const handlerLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={ImageBackgroundHome} resize="cover" style={styles.image} imageStyle=
          {{ opacity: 0.3 }}>
          <Text style={styles.title}>TOPODCAST</Text>
          <Text style={styles.subtitle}>DISFRUTA ESCUCHANDO TUS VÍDEOS FAVORITOS ALLÁ DONDE VAYAS</Text>
          <View style={styles.containerButton}>
            <Button
              onPress={() => navigation.navigate('Buscar')}
              title="Busca tu video"
              buttonStyle={{
                borderColor: '#fff',
              }}

              type="outline"
              titleStyle={{ color: '#fff', fontFamily: 'Bebas' }}
              containerStyle={{
                width: 130,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            /><Button
              onPress={() => navigation.navigate('Playlist')}
              title='Playlist'
              buttonStyle={{
                borderColor: '#fff',

              }}
              type="outline"
              titleStyle={{ color: '#fff', fontFamily: 'Bebas' }}
              containerStyle={{
                width: 130,
                marginHorizontal: 10,
                marginVertical: 10,
              }} />
          </View>
        </ImageBackground>
      </View>

      {currentSong &&

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D"
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  title: {
    fontSize: 56,
    color: "#fff",
    marginBottom: 20,
    fontFamily: 'Bebas',

  },
  subtitle: {
    fontFamily: 'Bebas',
    fontSize: 24,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 35

  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  }
})

export default HomeScreen