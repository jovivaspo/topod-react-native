import { urls } from '../services/urlApi';
import { Audio } from 'expo-av'
import { playSong } from '../actions/audioPlayerActions';
import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadSong } from '../actions/audioPlayerActions';
import { GlobalContext } from '../context/GlobalContext';


const usePlayer = () => {
    
   const {player,setPlayer,setLoading} = useContext(GlobalContext)
    const audioPlayer = useSelector(state => state.audioPlayer)
    const dispatch = useDispatch()

    const controlPlayer = async () => {

        if (!player) return false

        if (audioPlayer.isPlaying === true) {
            dispatch(playSong(false))
            await player.pauseAsync()

        } else {
            dispatch(playSong(true))
            await player.playAsync()

        }
    }

    const handlerSong = async (id, title, duration, img) => {

        try {

            await controlPlayer()

            if (id !== audioPlayer?.currentSong?.id) {
                setLoading(true)

                if (player) {
                    await player.unloadAsync()
                }

                dispatch(loadSong(id, title, duration, img))

                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                   // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                   // shouldDuckAndroid: true,
                  //  playThroughEarpieceAndroid: true,
                  //  allowsRecordingIOS: true,
                   // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                   // playsInSilentModeIOS: true,
                  });

                const { sound } = await Audio.Sound.createAsync(
                    { uri: `${urls().PLAYER}${id}` },
                    { shouldPlay: true }
                )

                setLoading(false)

                setPlayer(sound)
    
                dispatch(playSong(true))

               
            }

        } catch (err) {
            console.log(err)
        }




    }


 /*   useEffect(() => {
        return player
            ? () => {
                console.log('Unloading Sound');
                player.unloadAsync();
            }
            : undefined;
    }, [player]);*/

    return { controlPlayer, handlerSong }

}

export { usePlayer }