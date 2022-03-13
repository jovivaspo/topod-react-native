import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RowPodcast from './RowPodcast'

const Tablelist = ({ podcasts }) => {
    const renderItem = (({ item }) => <RowPodcast item={item}/>)
    return (
        <View style={{
            flex: 1,
            width: '95%',
            height: '100%',
            padding: 4,
            justifyContent: 'center',
            marginTop: 16
        }}>
            <FlatList data={podcasts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
            />
        </View>
    )
}

export default Tablelist