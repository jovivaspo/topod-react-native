import {createStore, applyMiddleware,} from 'redux'
import reducers from '../reducer'
import thunk from 'redux-thunk'



//localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
//const songStorage = localStorage.getItem('currentSong')? JSON.parse(localStorage.getItem('currentSong')) : null

const initialStates = {
    user:{userInfo:null},
    audioPlayer:{
        playlist:[],
        //currentSong:songStorage,
        isPlaying:false
    }
}

const store = createStore(
    reducers,
    initialStates,
    applyMiddleware(thunk)

)

export default store

