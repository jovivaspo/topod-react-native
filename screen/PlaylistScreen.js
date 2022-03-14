import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlaylist, loadSong } from '../actions/audioPlayerActions'
import Tablelist from '../components/Tablelist'
import AlertMessage from '../components/AlertMessage'
import ProgressPercentege from '../components/ProgressPercentege'
import Modal from '../components/Modal'
import { useModal } from '../useHooks/useModal'
import { urls } from '../services/urlApi'
import * as SecureStore from 'expo-secure-store';
import { helpHttp } from '../services/helpHttp'
import Progress from '../components/Progress'




const PlaylistScreen = () => {
  const dispatch = useDispatch()
  const { working, alert, setAlert, setWorking, setLoading, loading, setPlayer, player } = useContext(GlobalContext)
  const audioPlayer = useSelector(state => state.audioPlayer)
  const user = useSelector(state => state.user)
  const podcasts = audioPlayer.playlist
  const { visible, toggleOverlay, handlerModal, content } = useModal()

  useEffect(() => {
    dispatch(loadPlaylist(user))
  }, [])

  const handlerDelete = async (podcastId,id) => {
    console.log('Borrando')
    if (working) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Espere a que termine el proceso anterior'
      })
      return false
    }


    const currentSong = await SecureStore.getItemAsync('currentSong');
    console.log(currentSong.id, podcastId)
    //const currentSong = JSON.parse(localStorage.getItem('currentSong'))
    if (currentSong) {
      if (podcastId === currentSong.id) {
        dispatch(loadSong())
        if (audioPlayer.isPlaying === true) {
          dispatch(playSong(false))
          await player.pauseAsync()
          await player.unloadAsync()
        }

      }
    }

    setAlert({
      open: true,
      type: 'warning',
      message: 'Borrando Podcast'
    })

    setLoading(true)
    setWorking(true)

    helpHttp().del(`${urls().DELETE}${id}`, {
      headers: {
        Authorization: `Bearer ${user.userInfo.token}`
      }
    })
      .then(res => {
        //console.log(res)
        if (res.error) {
          setAlert({
            open: true,
            type: 'error',
            message: res.error
          })
          setWorking(false)
          return false
        }
        setLoading(false)
        setWorking(false)
        dispatch(loadPlaylist(user))
        setAlert({
          open: true,
          type: 'success',
          message: res.message
        })
      })

  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlist</Text>
      {working && !loading && <ProgressPercentege />}
      {loading && <Progress />}
      {alert.open && <AlertMessage />}
      {podcasts && <Tablelist podcasts={podcasts} handlerModal={handlerModal} />}
      <Modal visible={visible} toggleOverlay={toggleOverlay} content={content} handlerDelete={handlerDelete} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,

  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginTop: 20,
    fontFamily: 'Montserrat_Bold',
    textAlign: 'center'
  }
})

export default PlaylistScreen