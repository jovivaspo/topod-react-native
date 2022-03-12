import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { urls } from '../services/urlApi';
import { Audio } from 'expo-av'
import { playSong } from '../actions/audioPlayerActions';

const Player = () => {
  const audioPlayer = useSelector(state => state.audioPlayer)
  const [player, setPlayer] = useState()
  const [podcast, setPodcast] = useState()
  const dispatch = useDispatch()

  const loadSound = async () => {

    try {

      if (audioPlayer.currentSong.id === podcast) {

        return false

      }

        if(player){
          await player.unloadAsync()
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: `${urls().PLAYER}${audioPlayer.currentSong.id}` },
          { shouldPlay: true }
        )

        setPlayer(sound)
        setPodcast(audioPlayer.currentSong.id)

        await sound.loadAsync()

      

      } catch (err) {
        console.log(err)
      }

    

  }

  const controlPlayer = async () => {

    if (audioPlayer.isPlaying === true) {
      dispatch(playSong(false))
      await player.pauseAsync()

    } else {
      dispatch(playSong(true))
      await player.playAsync()

    }
  }

  useEffect(() => {
      loadSound()
  }, [audioPlayer])

  useEffect(() => {
    return player
      ? () => {
        //console.log('Unloading Sound');
        player.unloadAsync();
      }
      : undefined;
  }, [player]);

 
  return (
    <View>
      <View style={styles.containerPlayer}>
        <Image source={{ uri: audioPlayer.currentSong.img }} style={styles.img} />
        <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
          <Text style={styles.title}>{audioPlayer.currentSong.title}</Text>
        </View>
        <TouchableOpacity style={styles.icon} onPress={controlPlayer}>
          <Icon name={audioPlayer.isPlaying === true ? 'pause-circle-outline' : "play-circle-outline"} size={35} color={'#fff'} />
        </TouchableOpacity>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  containerPlayer: {
    flex: 1 / 3.7,
    flexDirection: 'row',
    backgroundColor: '#CEA858',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: '100%',
    borderRadius: 5
  },
  title: {
    color: '#fff',
    fontFamily: 'Montserrat_Medium',
    fontSize: 10,
  },

  img: {
    width: 42,
    height: 42,
    margin: 7,
    borderRadius: 7

  },
  icon: {
    margin: 7,
    marginRight: 14
  }
})


export default Player