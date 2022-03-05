import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawer = (props) => {
    return (
        <View style={{flex:1, backgroundColor:'#0D0D0D'}}>
            <DrawerContentScrollView contentContainerStyle={{
                backgroundColor:'#0D0D0D'
            }}>
                <Text style={styles.title}>ToPodcast</Text>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    title:{

        color:'#fff',
        fontSize:28,
        fontWeight:'bold',
        padding:10,
    }
    
})

export default CustomDrawer