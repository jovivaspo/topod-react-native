import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import ImageBackgroundHome from '../assets/Background-topodcast.webp'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={ImageBackgroundHome} resize="cover" style={styles.image} imageStyle=
                {{ opacity: 0.3 }}>
                <Text style={styles.title}>TOPODCAST</Text>
                <Text style={styles.subtitle}>DISFRUTA ESCUCHANDO TUS VÍDEOS FAVORITOS ALLÁ DONDE VAYAS</Text>
                <View style={styles.containerButton}>
                <Button
                onPress={()=>navigation.navigate('Seacher')}
                title="Busca tu video"
                buttonStyle={{
                  borderColor: '#fff',
                }}
                type="outline"
                titleStyle={{ color: '#fff' }}
                containerStyle={{
                  width: 130,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              />
               <Button
                onPress={()=>navigation.navigate('Login')}
                title="Registrate"
                buttonStyle={{
                  borderColor: '#fff',
                }}
                type="outline"
                titleStyle={{ color: '#fff' }}
                containerStyle={{
                  width: 100,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              />
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#0D0D0D"
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:8
    },
    title: {
        fontSize: 46,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom:20,
        fontFamily: 'Bebas Neue',

    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center',
        marginBottom:35
    
    },
    containerButton:{
      flexDirection:'row',
    }
})

export default HomeScreen