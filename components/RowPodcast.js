import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import secondsToString from '../services/secontToString'
import { timeAgo } from '../services/ago'
import { useSelector, useDispatch } from 'react-redux'
import { playSong, loadSong } from '../actions/audioPlayerActions'
import Icon from 'react-native-vector-icons/Ionicons'



const RowPodcast = ({ item }) => {

    const audioPlayer = useSelector(state => state.audioPlayer)
    const dispatch = useDispatch()

    const handlerSong = (id, title, duration, img) => {

        if (id === audioPlayer?.currentSong?.id) {
            if (audioPlayer.isPlaying === true) {
                dispatch(playSong(false))
            } else {
                dispatch(playSong(true))
            }
        } else {
            dispatch(loadSong(id, title, duration, img))
            dispatch(playSong(true))
        }

    }

   

    return (

        <TouchableOpacity style={styles.containerRow} onPress={() => handlerSong(item.podcastId, item.title, item.duration, item.img)}>
            <View style={styles.img}>
                <ImageBackground source={{ uri: item.img }} resize="cover" style={styles.itemImg} imageStyle={{ opacity: audioPlayer?.currentSong?.id === item.podcastId ? 0.5 : 1 }}>
                    {audioPlayer?.currentSong?.id === item.podcastId ? <Icon name={audioPlayer.isPlaying === true? 'pause-circle-outline' : "play-circle-outline"} size={42} color={'#CEA858'} /> : <></>}
                </ImageBackground>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{
                    color: audioPlayer?.currentSong?.id === item.podcastId ? '#CEA858' : '#fff',
                    fontFamily: 'Montserrat_Medium',
                    fontSize: 12,
                }}>{item.title}</Text>
                <Text style={{
                    color: audioPlayer?.currentSong?.id === item.podcastId ? '#CEA858' : '#fff',
                    fontFamily: 'Montserrat_Medium',
                    fontSize: 9,
                    marginTop: 4
                }}> Duration: {secondsToString(item.duration)}</Text>
            </View>
        </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    containerRow: {
        flex: 1 / 9,
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderWidth: 1,

    },
    img: {
        width: 50,
        height: 60,
        margin: 8
    },
    itemImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})

export default RowPodcast