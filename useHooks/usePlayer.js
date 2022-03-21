import { changeSong, changeStatus, initPlayer } from '../actions/audioPlayerActions';
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';




const usePlayer = () => {
    
    const {currentSong, playbackObj, statusPlayback} = useSelector(state => state.audioPlayer)
    const dispatch = useDispatch()
    const {setLoading} = useContext(GlobalContext)

    const handlerPlayer = (id, title, duration, img) => {
       
            //First time to load a song
            if(!playbackObj){
                return dispatch (initPlayer(id,title,duration,img,setLoading))
            }

            //Pause or Play
            if(statusPlayback.isLoaded && id === currentSong.id){
               return dispatch (changeStatus(statusPlayback, playbackObj))
            }

             //Play other song
             if(statusPlayback.isLoaded && id !== currentSong.id){
               return dispatch(changeSong(id,title,duration,img, playbackObj))
             }

    }


    return { handlerPlayer }

}

export { usePlayer }