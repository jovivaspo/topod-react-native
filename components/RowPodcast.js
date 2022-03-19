import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import secondsToString from '../services/secontToString'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { usePlayer } from '../useHooks/usePlayer'
import { GlobalContext } from '../context/GlobalContext'



const RowPodcast = ({ item, handlerModal}) => {

    const {currentSong, statusPlayback} = useSelector(state => state.audioPlayer)
   
    const {handlerPlayer} = usePlayer()

    const {loading} = useContext(GlobalContext)


    return (
        <View  style={styles.containerRow}>
            <TouchableOpacity style={{flex:1, flexDirection: 'row'} } onPress={() => handlerPlayer(item.podcastId, item.title, item.duration, item.img)}>
                <View style={styles.img}>
                    <ImageBackground source={{ uri: item.img }} resize="cover" style={styles.itemImg} imageStyle={{ opacity: currentSong?.id === item.podcastId ? 0.5 : 1 }}>
                        {currentSong?.id === item.podcastId && !loading ? <Icon name={statusPlayback.isPlaying === true? 'pause-circle-outline' : "play-circle-outline"} size={42} color={'#CEA858'} /> : <></>}
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{
                        color: currentSong?.id === item.podcastId ? '#CEA858' : '#fff',
                        fontFamily: 'Montserrat_Medium',
                        fontSize: 12,
                    }}>{item.title}</Text>
                    <Text style={{
                        color:'#fff',
                        fontFamily: 'Montserrat_Medium',
                        fontSize: 9,
                        marginTop: 4
                    }}> Duration: {secondsToString(item.duration)}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handlerModal(item.podcastId, item.title, item.img, item.id)}>
                <Icon name="ellipsis-vertical-outline" size={42}  color={'#fff'}  />
            </TouchableOpacity>
        </View>




    )
}

const styles = StyleSheet.create({
    containerRow: {
        flex: 1 / 9,
        flexDirection: 'row',
        alignItems:'center'
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