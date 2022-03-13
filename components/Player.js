import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { usePlayer } from '../useHooks/usePlayer'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'


const Player = () => {
  const audioPlayer = useSelector(state => state.audioPlayer)
  const {loading} = useContext(GlobalContext)
  const {controlPlayer} = usePlayer()
 
  return (
    <View>
      <View style={styles.containerPlayer}>
        <Image source={{ uri: audioPlayer.currentSong.img }} style={styles.img} />
        <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
          <Text style={styles.title}>{audioPlayer.currentSong.title}</Text>
        </View>
        <TouchableOpacity style={styles.icon} onPress={controlPlayer}>
         {!loading &&  <Icon name={  (audioPlayer.isPlaying === true? 'pause-circle-outline' : "play-circle-outline")} size={35} color={'#fff'} />}
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