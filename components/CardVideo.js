import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import React from 'react'
import secondsToString from '../services/secontToString'

const CardVideo = ({ video }) => {
    const handlerConvert = () => {
        alert('Quieres convertir este video??')
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
                fontWeight: 'bold'
            }}>{video.title}</Text>
            <Image source={{
                uri: video.thumbnail
            }}
                style={{ width: '80%', height: 265, marginTop: 8 }}
            />
            <View style={{
                margin: 10,
                flex: 1,
                flexDirection:'row',
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Text style={{ color: '#fff', marginRight:8 }}>Duración: {secondsToString(video.duration)}</Text>
                <Text style={{ color: '#fff', marginLeft:8 }}>Hace {video.uploaded}</Text>
            </View>
            <View style={{
                margin: 10,
                flex: 1,
                flexDirection:'row',
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Text style={{ color: '#fff', marginRight:8 }}>{video.channel.name}</Text>
                <Image source={{ uri: video.channel.thumbnail }} style={{ width: 20, height: 20 }} />
            </View>
            <View style={{
                margin: 10,
                flex: 1,
                justifyContent: 'flex-start',
                width: '80%'
            }}>
                <Button title="Convertir" buttonStyle={{ backgroundColor: '#CEA858' }}
                    onPress={handlerConvert}
                />
            </View>
        </View>
    )
}



export default CardVideo