import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import CardVideo from './CardVideo'

const GaleryVideos = () => {

    const { videos } = useContext(GlobalContext)
   
        const renderItem = (({ item }) => <CardVideo video={item} />)
        return (
            <View style={{ flex:1, width: '100%', height: '100%', padding: 4, marginTop:16 }}>
                <FlatList data={videos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                />
            </View>
        )
    
}

    export default GaleryVideos