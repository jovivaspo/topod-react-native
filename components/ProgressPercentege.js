import { View, Text } from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import { LinearProgress } from 'react-native-elements'
import { GlobalContext } from '../context/GlobalContext'

const ProgressPercentege = () => {
    const {progress} = useContext(GlobalContext)
    const [progressFront, setprogressFront] = useState(0)

    useEffect(() => {
        setprogressFront(parseInt(progress)/100) 
    }, [progress]);

   
  return (
    <View style={{ flex: 1 / 10, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
     <LinearProgress  value={progressFront} variant="determinate" style={{ width: '80%' }} color='#CEA858'/>
     <Text style={{color:'#fff', marginLeft:8}}>{progress + '%'}</Text>
    </View>
  )
}

export default ProgressPercentege