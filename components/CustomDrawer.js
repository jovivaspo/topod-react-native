import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'


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
        fontFamily:'Montserrat_Bold',
        padding:10,
        paddingLeft:20
    }
    
})

export default CustomDrawer