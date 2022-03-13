import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlaylist } from '../actions/audioPlayerActions'
import Tablelist from '../components/Tablelist'
import AlertMessage from '../components/AlertMessage'
import ProgressPercentege from '../components/ProgressPercentege'
import ModalSong from '../components/ModalSong'
import { useModal } from '../useHooks/useModal'


const PlaylistScreen = () => {
  const dispatch = useDispatch()
  const { working, alert } = useContext(GlobalContext)
  const audioPlayer = useSelector(state => state.audioPlayer)
  const user = useSelector(state => state.user)
  const podcasts = audioPlayer.playlist
  const { modalVisible } = useModal()

  useEffect(() => {
    dispatch(loadPlaylist(user))
  }, [])

  console.log(modalVisible)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlist</Text>
      {working && <ProgressPercentege />}
      {alert.open && <AlertMessage />}
      {podcasts && <Tablelist podcasts={podcasts} />}
     { modalVisible && <ModalSong modalVisible={modalVisible}/>}
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