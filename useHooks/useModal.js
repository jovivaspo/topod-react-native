import { useState } from "react";

const useModal = () => {
    const [visible, setVisible] = useState(false);
    const [content,setContent] = useState()

    const toggleOverlay = () => {
      setVisible(!visible);
    }

    const handlerModal = (podcastId, title , img, id) =>{
      
        setContent({podcastId,img,title,id})
        toggleOverlay()
    }

    return {visible, toggleOverlay, handlerModal, content}
}

export {useModal}