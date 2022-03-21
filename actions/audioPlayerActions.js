import { CHANGE_STATUS, CONTROL_TIME, CURRENT_SONG, LOAD_SONGS, PLAYER_ACTIVE, RESET_ALL, RESET_PLAYER, RESET_CURRENT_SONG, LOADING_SONG } from "../types"
import { helpHttp } from "../services/helpHttp"
import { urls } from "../services/urlApi"
import * as SecureStore from 'expo-secure-store';
import { Audio } from "expo-av";
import store from '../store/index'



export const loadPlaylist = (user) => async (dispatch) => {
    try {
       
        helpHttp().get(`${urls().PODCASTS_ALL}${user.userInfo.userId}`, {
            headers: {
                "Authorization": `Bearer ${user.userInfo.token}`
            }
        })
            .then(res => {
                if (res.error) {
                    alert(res.error)
                    return false
                }
                // console.log(res)
                dispatch({ type: LOAD_SONGS, payload: res })
            })
    } catch (err) {
        console.log('Error en loadPlaylist: ', err)
    }
}

const onPlaybackStatusUpdate = async (playbackStatus) => {

    const {currentSong, playlist, playbackObj} = store.getState().audioPlayer

    
    if (playbackStatus.isLoaded && playbackStatus.isPlaying && currentSong.position < currentSong.duration) {
       store.dispatch(controlTime())
    } else {
        if (playbackStatus.didJustFinish) {
          
            const index = playlist.findIndex(el => el.podcastId === currentSong.id)
           
            if (index + 1 === playlist.length) {
               
                return store.dispatch(resetCurrentSong(playbackObj,currentSong.id))
                
            } else {
               
                const { podcastId, title, duration, img } = playlist[index + 1]
               return store.dispatch(changeSong(podcastId, title, duration, img, playbackObj))
            }

        } else {
            return false
        }
    }
}


export const initPlayer = (id, title, duration, img, setLoading) => async (dispatch) => {

    try {

        setLoading(true)
        dispatch({type: LOADING_SONG, payload:true})

        await Audio.setAudioModeAsync({
            staysActiveInBackground: true
        })
        const sound = new Audio.Sound()


        await sound.loadAsync(
            { uri: `${urls().PLAYER}${id}` },
        )

        sound.setStatusAsync({ progressUpdateIntervalMillis: 1000 })
        const status = await sound.playAsync()

        dispatch({ type: CURRENT_SONG, payload: { id, title, duration, img, position:0 } })
        dispatch({ type: PLAYER_ACTIVE, payload: sound })
        setLoading(false)
        dispatch({type: LOADING_SONG, payload:false})
        dispatch({ type: CHANGE_STATUS, payload: status })
        
       

        return sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)

    } catch (err) {
        
        console.log('Error en initPlayer: ', err)
    }
}


export const changeStatus = (statusPlayback, playbackObj) => async (dispatch) => {
    try {
        if (statusPlayback.isPlaying) {
            const status = await playbackObj.setStatusAsync({
                shouldPlay: false
            })
            dispatch({ type: CHANGE_STATUS, payload: status })
        } else {
            const status = await playbackObj.playAsync()
            dispatch({ type: CHANGE_STATUS, payload: status })
        }
    } catch (err) {
        console.log('Error en changeStatus: ', err)
    }

}

export const changeSong = (id, title, duration, img, playbackObj) => async (dispatch) => {
    try {
       
        dispatch({type: LOADING_SONG, payload:true})
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        await playbackObj.loadAsync(
            { uri: `${urls().PLAYER}${id}` },
        )

        playbackObj.setStatusAsync({ progressUpdateIntervalMillis: 1000 })
        const status = await playbackObj.playAsync()

        dispatch({ type: CURRENT_SONG, payload: { id, title, duration, img, position: 0 } })
        dispatch({type: LOADING_SONG, payload:false})
        dispatch({ type: CHANGE_STATUS, payload: status })
       


    } catch (err) {
        
        console.log('Error en changeSong: ', err)
    }

}

export const resetPlayer = (playbackObj, statusPlayback) => async (dispatch) => {
    try {
        if (statusPlayback.isPlaying) {
            const status = await playbackObj.setStatusAsync({
                shouldPlay: false
            })
            dispatch({ type: CHANGE_STATUS, payload: status })
        }
        
        dispatch({ type: RESET_PLAYER })

    } catch (err) {
        console.log('Error en resetPlayer: ', err)
    }
}

export const resetAll = (playbackObj, statusPlayback) => async (dispatch) => {
    try {
        if(statusPlayback !== null){
            if (statusPlayback.isPlaying) {
                const status = await playbackObj.setStatusAsync({
                    shouldPlay: false
                })
                dispatch({ type: CHANGE_STATUS, payload: status })
            }
        }
       
        dispatch({ type: RESET_ALL })

    } catch (err) {
        console.log('Error en resetAll: ', err)
    }
}

export const controlTime = ()  => async (dispatch) => {
    dispatch({ type: CONTROL_TIME, payload: 1 })
}

export const resetCurrentSong = (playbackObj, id) => async (dispatch)=>{
    try{
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        const status = await playbackObj.loadAsync(
            { uri: `${urls().PLAYER}${id}` },
        )

        playbackObj.setStatusAsync({ progressUpdateIntervalMillis: 1000 })

        dispatch({ type: CHANGE_STATUS, payload: status })
        dispatch({type:RESET_CURRENT_SONG})

    }catch(err){
        console.log('Error en resetCurrentSong: ', err)
    }
   
}

