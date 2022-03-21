import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Search from '../components/Search'
import Progress from '../components/Progress'
import { GlobalContext } from '../context/GlobalContext'
import AlertMessage from '../components/AlertMessage'
import GaleryVideos from '../components/GaleryVideos'
import { useSelector } from 'react-redux'
import Player from '../components/Player'

const SeacherScreen = () => {
  const { videos, loading, alert } = useContext(GlobalContext)
  const {currentSong} = useSelector(state => state.audioPlayer)

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Busca tu vídeo</Text>
        <Search />
        {loading && <Progress />}
        {alert.open && <AlertMessage />}
        {videos.length !== 0 && <GaleryVideos />}
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
    backgroundColor: "#0D0D0D",
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginTop: 20,
    fontFamily: 'Montserrat_Bold',
    textAlign: 'center'
  }
})

export default SeacherScreen