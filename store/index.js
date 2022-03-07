import {createStore, applyMiddleware,} from 'redux'
import reducers from '../reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as Keychain from 'react-native-keychain';


const userStorage = async () =>{
    try{
        const userStorage = await JSON.parse(Keychain.getGenericPassword())
        if(userStorage.token) return userStorage
        else return "tus muertos"
    }catch(error){
        console.log(error)
    }
}
//localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
//const songStorage = localStorage.getItem('currentSong')? JSON.parse(localStorage.getItem('currentSong')) : null
const initialStates = {
    user:{userInfo:userStorage()},
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

