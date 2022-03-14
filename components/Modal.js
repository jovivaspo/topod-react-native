import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'



const Modal = ({ visible, toggleOverlay, content, handlerDelete }) => {
    

    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.container}>
            <Image source={{uri:content?.img}} style={styles.img} />
            <Text style={styles.title}>
                {content?.title}
            </Text>
            <View style={styles.viewContent}>
                <TouchableOpacity style={styles.viewSecondContent} onPress={()=>{
                    toggleOverlay()
                    handlerDelete(content?.podcastId, content?.id)
                }}>
                    <Icon name="trash-outline" size={25} color={'#fff'} />
                    <Text style={styles.secondText}>Borrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewSecondContent} >
                    <Icon name="cloud-download-outline" size={22} color={'#fff'} />
                    <Text style={styles.secondText}>Descargar</Text>
                </TouchableOpacity>
            </View>

        </Overlay>

    )
}

const styles = StyleSheet.create({
    container: {
        flex:1/2,
        alignItems: 'center',
        justifyContent: 'space-around',
        width:'85%',
        backgroundColor: "#0D0D0D",
        opacity:0.9,
        borderRadius:20,
       
      
    },
    title: {
        fontSize: 14,
        color: "#fff",
        margin: 12,
        fontFamily: 'Montserrat_Bold',
        textAlign: 'center'
    },
    img: {
        height: 120,
        width: 120,
        margin:12
    },
   
    viewSecondContent: {
  
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        margin:12

    },
    secondText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat_Medium',
        marginLeft:12

    }
})

export default Modal