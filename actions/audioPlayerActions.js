import { CHANGE_STATUS, CURRENT_SONG, LOAD_SONGS, PLAYER_ACTIVE, RESET_ALL, RESET_PLAYER } from "../types"
import { helpHttp } from "../services/helpHttp"
import { urls } from "../services/urlApi"
import * as SecureStore from 'expo-secure-store';
import { Audio } from "expo-av";


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


export const initPlayer = (id, title, duration, img, setLoading) => async (dispatch) => {

    try {
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true
        })
        const sound = new Audio.Sound()

        setLoading(true)

        const status = await sound.loadAsync(
            { uri: `${urls().PLAYER}${id}` },
            { shouldPlay: true }
        )

        dispatch({ type: CURRENT_SONG, payload: { id, title, duration, img } })
        dispatch({ type: PLAYER_ACTIVE, payload: sound })
        dispatch({ type: CHANGE_STATUS, payload: status })

        setLoading(false)

    } catch (err) {
        setLoading(false)
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

export const changeSong = (id, title, duration, img, playbackObj, setLoading) => async (dispatch) => {
    try {
        setLoading(true)
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        const status = await playbackObj.loadAsync(
            { uri: `${urls().PLAYER}${id}` },
            { shouldPlay: true }
        )
        dispatch({ type: CURRENT_SONG, payload: { id, title, duration, img } })
        dispatch({ type: CHANGE_STATUS, payload: status })
        setLoading(false)
    } catch (err) {
        setLoading(false)
        console.log('Error en changeSong: ', err)
    }

}

export const resetPlayer = (playbackObj, statusPlayback) => async (dispatch) => {
    try{
        if (statusPlayback.isPlaying) {
            const status = await playbackObj.setStatusAsync({
                shouldPlay: false
            })
            dispatch({ type: CHANGE_STATUS, payload: status })
        }
        await SecureStore.deleteItemAsync('currentSong')
        dispatch({type: RESET_PLAYER})

    }catch(err){
        console.log('Error en resetPlayer: ', err)
    }
}

export const resetAll = (playbackObj, statusPlayback) => async (dispatch) => {
    try{
        if (statusPlayback.isPlaying) {
            const status = await playbackObj.setStatusAsync({
                shouldPlay: false
            })
            dispatch({ type: CHANGE_STATUS, payload: status })
        }
        await SecureStore.deleteItemAsync('currentSong')
        dispatch({ type: RESET_ALL })

    }catch(err){
        console.log('Error en resetAll: ', err)
    }
   
   
}

