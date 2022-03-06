import { View} from 'react-native'
import React from 'react'
import { LinearProgress } from 'react-native-elements'

const Progress = () => {
  
    return (
        <View style={{ flex: 1 / 10, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
            {<LinearProgress style={{ width: '80%' }} color='#CEA858' />}
        </View>
    )
}

export default Progress