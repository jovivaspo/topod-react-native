import { changeSong, changeStatus, initPlayer } from '../actions/audioPlayerActions';
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';



const usePlayer = () => {
    
    const {currentSong, playbackObj, statusPlayback} = useSelector(state => state.audioPlayer)
    const {setLoading} = useContext(GlobalContext)
    const dispatch = useDispatch()

    handlerPlayer = async (id, title, duration, img) => {
       
        try{
            //First time to load a song
            if(!playbackObj){
               
                return dispatch (initPlayer(id,title,duration,img, setLoading))
            }

            //Pause or Play
            if(statusPlayback.isLoaded && id === currentSong.id){
               return dispatch (changeStatus(statusPlayback, playbackObj))
            }

             //Play other song
             if(statusPlayback.isLoaded && id !== currentSong.id){
               return dispatch(changeSong(id,title,duration,img,playbackObj,setLoading))
             }


        }catch(err){
            console.log(err)
        }
       
    }


    return { handlerPlayer }

}

export { usePlayer }