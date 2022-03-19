import { LOAD_SONGS, CURRENT_SONG, PLAYER_ACTIVE, CHANGE_STATUS, RESET_ALL, RESET_PLAYER } from "../types";


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
        case RESET_PLAYER : {
            return {
                ...state,
                currentSong: null,
                playbackObj:null,
                statusPlayback:null}
        }
        case RESET_ALL : {
            return { playlist:[],
                currentSong: null,
                playbackObj:null,
                statusPlayback:null}
        }
        default:
            return state
    }
}

export {SongReducer}