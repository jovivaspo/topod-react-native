import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import secondsToString from '../services/secontToString'
import { timeAgo } from '../services/ago'

const RowPodcast = ({ item }) => {

    return (

        <TouchableOpacity style={styles.containerRow} onPress={()=>console.log('reproducciendo')}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}> Duration: {secondsToString(item.duration)}</Text>
            </View>
        </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    containerRow: {
        flex: 1 / 9,
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderWidth: 1,

    },
    title: {
        color: '#fff',
        fontFamily: 'Montserrat_Medium',
        fontSize: 12,


    },
    text: {
        color: '#fff',
        fontFamily: 'Montserrat_Medium',
        fontSize: 9,
        marginTop: 4
    },

    img: {
        width: 50,
        height: 60,
        margin: 10
    }
})

export default RowPodcast