import { LOAD_SONGS, CURRENT_SONG, PLAYER_ACTIVE, CHANGE_STATUS, RESET_ALL, RESET_PLAYER, CONTROL_TIME, RESET_CURRENT_SONG, LOADING_SONG } from "../types";


const SongReducer = (state={},action) =>{
  
    switch(action.type){
        case LOAD_SONGS : {
            return {...state,playlist:action.payload}
        }
        case CURRENT_SONG : {
            return {...state, currentSong:action.payload}
        }
        case PLAYER_ACTIVE:{
            return {...state, playbackObj:action.payload}
        }
        case CHANGE_STATUS:{
            return {...state,statusPlayback:action.payload}
        }
        case LOADING_SONG:{
            return {...state, loadingSong : action.payload}
        }
        case CONTROL_TIME:{
            const previousPosition = state.currentSong.position
            const updateCurrentSong = {...state.currentSong, position : previousPosition + action.payload}
            return {...state,currentSong: updateCurrentSong}
        }
        case RESET_CURRENT_SONG:{
            const resetCurrentSongPosition = {...state.currentSong, position :0}
            return {...state,currentSong: resetCurrentSongPosition}
        }
        case RESET_PLAYER : {
            return {
                ...state,
                currentSong: null,
                playbackObj:null,
                statusPlayback:null,
                loadingSong:false}
        }
        case RESET_ALL : {
            return { playlist:[],
                currentSong: null,
                playbackObj:null,
                statusPlayback:null,
                loadingSong:false}
        }
        default:
            return state
    }
}

export {SongReducer}