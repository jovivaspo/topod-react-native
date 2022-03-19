import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { usePlayer } from '../useHooks/usePlayer'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Slider from '@react-native-community/slider'

const Player = () => {
  const {currentSong, statusPlayback} = useSelector(state => state.audioPlayer)
  const {id, title, duration, img} = currentSong
  const {loading} = useContext(GlobalContext)
  const {handlerPlayer} = usePlayer()

  return (
    <View>
      <View style={styles.containerPlayer}>
        <Image source={{ uri: img }} style={styles.img} />
        <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.icon} onPress={()=>handlerPlayer(id, title, duration, img)}>
         {!loading &&  <Icon name={  (statusPlayback?.isPlaying === true? 'pause-circle-outline' : "play-circle-outline")} size={35} color={'#fff'} />}
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