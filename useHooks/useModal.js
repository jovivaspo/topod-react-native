
import { useState } from "react";
const useModal = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalContent, setModalContent] = useState({
        img:"",
        title:""
    });

    const handlerModal = (id,title,img)=>{
        console.log('Cambiate')
        setModalVisible(false)
        setModalContent({img,title})
    }

    return {modalVisible, setModalVisible, handlerModal, modalContent}
}

export {useModal}