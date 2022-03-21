import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import { usePlayer } from '../useHooks/usePlayer'
import { GlobalContext } from '../context/GlobalContext'
import secondsToString from '../services/secontToString'

const windowHeight = Dimensions.get('window').height;

const PlayerScreen = () => {
    const {loading} = useContext(GlobalContext)
    const { currentSong, statusPlayback, playlist, loadingSong } = useSelector(state => state.audioPlayer)
    const { id, title, duration, img, position } = currentSong
    const { handlerPlayer} = usePlayer()
    
    const nextSong = () => {
        if(loading) return false
        const index = playlist.findIndex(el => el.podcastId === id)
        if (index + 1 === playlist.length) {
            
            return false
        } else {
            
            const { podcastId, title, duration, img } = playlist[index + 1]
            handlerPlayer(podcastId, title, duration, img)
        }
    }

    const previusSong = () => {
        if(loading) return false
        const index = playlist.findIndex(el => el.podcastId === id)
        if (index === 0 ) {
           
            return false
        } else {
           
            const { podcastId, title, duration, img } = playlist[index - 1]
            handlerPlayer(podcastId, title, duration, img)
        }
    }

   const positionSlider = () => {
        if(position !== 0 && duration!==0){
           return position/duration
        }else{
            return 0
        }
   }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentSong.title}</Text>
            <Image source={{ uri: currentSong.img }} style={styles.img} />
            <View style={styles.containerButtons}>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={previusSong}>
                        {<Icon name="play-skip-back-circle-outline" size={50} color={'#fff'} style={styles.nextButton} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlerPlayer(id, title, duration, img)}>
                        {loadingSong? <ActivityIndicator size= {70 || 'large'} color='#fff' /> : (<Icon name={(statusPlayback?.isPlaying === true ? 'pause-circle-outline' : "play-circle-outline")} size={80} color={'#fff'} />)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextSong}>
                        {<Icon name="play-skip-forward-circle-outline" size={50} color={'#fff'} style={styles.nextButton} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.containerSlider}>
                <View style={styles.containerDuration}>
                        <Text>{secondsToString(position.toFixed(0))}</Text>
                        <Text>{secondsToString(currentSong?.duration)}</Text>
                    </View>
                    <Slider 
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={"#fff"}
                    maximumTrackTintColor={"#0D0D0D"}
                    value={positionSlider()}
                    disabled={true}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#0D0D0D",
        zIndex: 1,

    },
    title: {
        fontSize: 22,
        color: "#fff",
        marginTop: 20,
        fontFamily: 'Montserrat_Bold',
        textAlign: 'center'
    },
    img: {
        width: '90%',
        height: windowHeight * 0.4,
        marginVertical: 16,
        borderRadius: 32
    },
    containerButtons: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    nextButton: {
        marginTop: 20
    },
    containerSlider: {
        width: '95%',
        marginTop: 8
    },
    containerDuration:{
        flexDirection:'row',
        justifyContent:'space-between',        
        height:20
    },
    textDuration:{
        color:'#fff'
    }

})
export default PlayerScreen