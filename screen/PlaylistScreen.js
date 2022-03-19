import { View, Text, StyleSheet, } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, loadPlaylist, reset, resetPlayer } from '../actions/audioPlayerActions'
import Tablelist from '../components/Tablelist'
import AlertMessage from '../components/AlertMessage'
import ProgressPercentege from '../components/ProgressPercentege'
import Modal from '../components/Modal'
import { useModal } from '../useHooks/useModal'
import { urls } from '../services/urlApi'
import { helpHttp } from '../services/helpHttp'
import Progress from '../components/Progress'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import {schedulePushNotification} from '../services/notifications'


const PlaylistScreen = () => {
  const dispatch = useDispatch()
  const { working, alert, setAlert, setWorking, setLoading, loading } = useContext(GlobalContext)
  const user = useSelector(state => state.user)
  const {currentSong, playbackObj, statusPlayback, playlist} = useSelector(state => state.audioPlayer)
  const { visible, toggleOverlay, handlerModal, content } = useModal()
  

 
useEffect(() => {
    dispatch(loadPlaylist(user))
  }, [])


  const handlerDelete = async (podcastId, id) => {


    if (working) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Espere a que termine el proceso anterior'
      })
      return false
    }

    setLoading(true)
    setWorking(true)

    setAlert({
      open: true,
      type: 'warning',
      message: 'Borrando Podcast'
    })

    if (podcastId === currentSong?.id) {
     dispatch(resetPlayer(playbackObj, statusPlayback))
    }

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

  const saveFile = async (fileUri, title) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await schedulePushNotification('Descarga finalizada', title, fileUri)
      }
      setAlert({
        open: true,
        type: 'success',
        message: 'Archivo descargado con éxito'
      })
      setLoading(false)
      setWorking(false)

    } catch (err) {
      setWorking(false)
      setLoading(false)
      setAlert({
        open: true,
        type: 'error',
        message: 'Error al descargar'
      })
      console.log(err)
    }

  }

  const handlerDownload = async (id, title) => {
    if (working) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Espere a que termine el proceso anterior'
      })
      return false
    }

    try {
      const downloadFile = FileSystem.createDownloadResumable(
        `${urls().DOWNLOAD}${id}`,
        FileSystem.documentDirectory + `${title}.mp3`,
        {
          headers: {
            responseType: 'blob',
            Authorization: `Bearer ${user.userInfo.token}`
          }
        }
      )
      setWorking(true)
      setLoading(true)
      setAlert({
        open: true,
        type: 'warning',
        message: 'Iniciando descarga'
      })
      const res = await downloadFile.downloadAsync()
      await saveFile(res.uri, title)

    } catch (err) {
      console.log(err)
      setWorking(false)
      setLoading(false)
      setAlert({
        open: true,
        type: 'error',
        message: 'Error al descargar'
      })
    }

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlist</Text>
      {working && !loading && <ProgressPercentege />}
      {loading && <Progress />}
      {alert.open && <AlertMessage />}
      {playlist && <Tablelist podcasts={playlist} handlerModal={handlerModal} />}
      <Modal visible={visible} toggleOverlay={toggleOverlay} content={content} handlerDelete={handlerDelete} handlerDownload={handlerDownload} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: "#0D0D0D",
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