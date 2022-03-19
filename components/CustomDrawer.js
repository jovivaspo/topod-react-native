import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { resetAll } from '../actions/audioPlayerActions'


const CustomDrawer = (props) => {

    const dispatch = useDispatch()
    const {currentSong,playbackObj, statusPlayback} = useSelector(state => state.audioPlayer)

    const handlerLogout = () => {
        dispatch(resetAll(playbackObj, statusPlayback))
        dispatch(logout())
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <DrawerContentScrollView contentContainerStyle={{
                backgroundColor: '#0D0D0D'
            }}>
                <Text style={styles.title}>ToPodcast</Text>
                <DrawerItemList {...props} />
                {currentSong && <View style={{
                    flex: 1 / 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0D0D0D',
                    width: '100%',
                    borderTopColor: '#fff',
                    borderWidth: 1

                }}>
                    <Button
                        onPress={handlerLogout}
                        title='Cerrar sesión'
                        buttonStyle={{
                            borderColor: '#fff',

                        }}
                        type="outline"
                        titleStyle={{ color: '#fff', fontFamily: 'Montserrat_Medium', fontSize: 14 }}
                        containerStyle={{
                            width: '90%',
                            marginHorizontal: 10,
                            marginVertical: 10,
                        }} />
                </View>}
            </DrawerContentScrollView>
            {!currentSong && <View style={{
                    flex: 1 / 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0D0D0D',
                    width: '100%',
                    borderTopColor: '#fff',
                    borderWidth: 1

                }}>
                    <Button
                        onPress={handlerLogout}
                        title='Cerrar sesión'
                        buttonStyle={{
                            borderColor: '#fff',

                        }}
                        type="outline"
                        titleStyle={{ color: '#fff', fontFamily: 'Montserrat_Medium', fontSize: 14 }}
                        containerStyle={{
                            width: '90%',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }} />
                </View>}
        </View>


    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 28,
        fontFamily: 'Montserrat_Bold',
        padding: 10,
        paddingLeft: 20
    }

})

export default CustomDrawer