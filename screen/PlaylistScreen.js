import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlaylist, loadSong, playSong } from '../actions/audioPlayerActions'
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

  

  const handlerDelete = async (podcastId, id) => {

    if (working) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Espere a que termine el proceso anterior'
      })
      return false
    }

    if (podcastId === audioPlayer?.currentSong?.id) {

      dispatch(loadSong())
      dispatch(playSong(false))
      player.pauseAsync()
        .then(() => player.unloadAsync())
        .then(() => setPlayer(null))

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

  const saveFile = async (fileUri) => {
    try{
      const  {status}  = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        console.log('guardando')
        const asset = await MediaLibrary.createAssetAsync(fileUri)
       
        setLoading(false)
        setWorking(false)
      }else{
        setLoading(false)
        setWorking(false)
      }
    }catch(err){
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

  const handlerDownload = async(id, title) => {
    if (working) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Espere a que termine el proceso anterior'
      })
      return false
    }
    setWorking(true)
    setLoading(true)
    setAlert({
      open: true,
      type: 'warning',
      message: 'Iniciando descarga'
    })
/*
    fetch(`${urls().DOWNLOAD}${id}`, {
      headers: {
        responseType: 'blob',
        Authorization: `Bearer ${user.userInfo.token}`
      }
    })
      .then(response => {
        //console.log(response)
        if (!response.ok) {
          let error = new Error('Ocurrió un error al descargar')
          console.log('error')
          throw error
        }
        else return response.blob()
      })
      .then(data => {
        // console.log(data)
        if (!data || data.type === "application/json") {
          setWorking(false)
          setLoading(false)
          console.log('error')
          let error = new Error('Ocurrió un error al descargar')
          throw error
        } else {
          setAlert({
            open: true,
            type: 'success',
            message: 'Descargando archivo'
          })
          fileDownload(data, `${title}.mp3`)
          setLoading(false)
          setWorking(false)
        }
      })
      .catch(error => {
        console.log('error')
        setAlert({
          open: true,
          type: 'error',
          message: error.message
        })
        setWorking(false)
        setLoading(false)
      })*/

      console.log(`${urls().DOWNLOAD}${id}`)
      try {
        const downloadFile = FileSystem.createDownloadResumable(
         `${urls().DOWNLOAD}${id}`,
          FileSystem.documentDirectory + `${title}.mp3`,
         { headers:{ responseType: 'blob',
          Authorization: `Bearer ${user.userInfo.token}` }}
        )
        const res = await downloadFile.downloadAsync()
        console.log(res)
        await saveFile(res.uri)
      }catch(err){
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
        {podcasts && <Tablelist podcasts={podcasts} handlerModal={handlerModal} />}
        <Modal visible={visible} toggleOverlay={toggleOverlay} content={content} handlerDelete={handlerDelete} handlerDownload={handlerDownload} />
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