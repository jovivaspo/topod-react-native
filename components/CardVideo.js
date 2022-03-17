import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import React,{useContext, useState} from 'react'
import secondsToString from '../services/secontToString'
import {useNavigation} from '@react-navigation/native'
import { urls } from '../services/urlApi'
import io from "socket.io-client"
import { useSelector, useDispatch } from 'react-redux';
import { GlobalContext } from '../context/GlobalContext'
import { loadPlaylist } from '../actions/audioPlayerActions'
import { schedulePushNotification } from "../services/notifications"

const CardVideo = ({ video }) => {

    const { setAlert, setProgress, working, setWorking } = useContext(GlobalContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)

    const convertVideo = async (video) => {
        try {
            if (working) {
                setAlert({
                    open: true,
                    type: 'warning',
                    message: 'Espere a que termine el proceso anterior'
                })

                return false
            }

            setWorking(true)

            const { token } = user.userInfo
            video.date = new Date
            const duration = parseInt(video.duration)

            const socket = io(urls().URI_API, {  
                auth: { token },
                query: { duration }
            })


            navigation.navigate('Playlist')

            socket.on("connect_error", (err) => {

                socket.disconnect()
                setAlert({
                    open: true,
                    type: 'error',
                    message: err.message
                })
                setWorking(false)
            });

            socket.on("error", (err) => {
                console.log(err)
                socket.disconnect()
                setAlert({
                    open: true,
                    type: 'error',
                    message: err
                })
                setWorking(false)

            });

            socket.on("message_converting", message => {
                setAlert({
                    open: true,
                    type: 'warning',
                    message
                })

            })

            socket.emit("sending_infovideo", video)

            socket.on('converting_progress', percentage => {

                setProgress(percentage.toFixed(0))
            })

            socket.on('finish', async (message) => {
                setAlert({
                    open: true,
                    type: 'success',
                    message
                })
                dispatch(loadPlaylist(user))
                socket.disconnect()
                setWorking(false)
                setProgress(0)
                await schedulePushNotification(message, video.title, '/Playlist')

            })


        } catch (err) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Algo salió mal'
            })
            setWorking(false)
        }
    }

    const handlerConvert = async () => {

        Alert.alert('ToPodcast', '¿Quieres convertir este vídeo?', [
            {
              text: 'Cancelar',
              onPress: () => {return false},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => convertVideo(video) },

    ])
}
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            margin: 10,
            borderBottomColor: '#fff',
            borderBottomWidth: 1
        }}>
            <Text style={{
                color: '#fff',
                padding: 8,
                fontFamily: 'Montserrat_Bold'
            }}>{video.title}</Text>
            <Image source={{
                uri: video.thumbnail
            }}
                style={{ width: '80%', height: 265, marginTop: 8 }}
            />
            <View style={{
                margin: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Text style={{ color: '#fff', marginRight: 8, fontFamily: 'Montserrat_Medium' }}>Duración: {secondsToString(video.duration)}</Text>
                <Text style={{ color: '#fff', marginLeft: 8, fontFamily: 'Montserrat_Medium' }}>Hace {video.uploaded}</Text>
            </View>
            <View style={{
                margin: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Image source={{ uri: video.channel.thumbnail }} style={{ width: 20, height: 20 }} />
                <Text style={{ color: '#fff', fontFamily: 'Montserrat_Medium', marginLeft: 8 }}>{video.channel.name}</Text>
            </View>
            <View style={{
                margin: 10,
                flex: 1,
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Button title="Convertir" buttonStyle={{ backgroundColor: '#CEA858' }} titleStyle={{ fontFamily: 'Montserrat_Medium' }}
                    onPress={handlerConvert}
                />
            </View>
        </View>
    )
}



export default CardVideo