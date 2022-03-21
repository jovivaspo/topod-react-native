import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { usePlayer } from '../useHooks/usePlayer'
import { useNavigation } from '@react-navigation/native'


const Player = () => {
  const { currentSong, statusPlayback, loadingSong } = useSelector(state => state.audioPlayer)
  const { id, title, duration, img } = currentSong
  const { handlerPlayer } = usePlayer()
  const navigation = useNavigation()


  return (
    <View>
      <View style={styles.containerPlayer}>
        <TouchableOpacity style={styles.subContainer} onPress={()=>navigation.navigate('Player')}>
          <Image source={{ uri: img }} style={styles.img} />
          <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => handlerPlayer(id, title, duration, img)}>
          {loadingSong?  <ActivityIndicator size='large' color='#fff' /> : (<Icon name={(statusPlayback?.isPlaying === true ? 'pause-circle-outline' : "play-circle-outline")} size={35} color={'#fff'} />)}
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
  subContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width:'85%',
    borderRadius: 5,
  
  },
  title: {
    color: '#fff',
    fontFamily: 'Montserrat_Medium',
    fontSize: 10,
    marginBottom:10
  },

  img: {
    width: 42,
    height: 42,
    margin: 7,
    borderRadius: 7

  },
  icon: {
    width:'15%',
    alignItems:'center'
  }
})


export default Player