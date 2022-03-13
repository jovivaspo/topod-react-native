import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Touchable, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useModal } from "../useHooks/useModal";

const ModalSong = ({modalVisible}) => {

    const { setModalVisible, modalContent} = useModal()

    console.log(modalVisible)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}

        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ color: "#fff" }}>{modalContent.title}</Text>
                    <TouchableOpacity style={styles.containerIcon} onPress={()=>{console.log('cerrando')
                     setModalVisible(false)}}>
                        <Icon name="close-outline" size={22} color={'#fff'}  />
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        borderColor: '#CEA858',
        borderWidth: 1
    },
    containerIcon:{
        position:'absolute',
        top:4,
        right:4
    }

})


export default ModalSong