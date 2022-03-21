import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const AlertMessage = () => {
    const { alert, setAlert } = useContext(GlobalContext)

    const colorAlert = {
        'error': 'red',
        'success': 'green',
        'warning' : '#CEA858'
    }

    useEffect(()=>{

        if(alert.open){
            const time = setTimeout(()=>{
                setAlert({
                    message:'',
                    type:'',
                    open: false
                })
            }, 2000)

            return () => clearTimeout(time)
        }else{
            return false
        }

       

    },[])

        return (<View style={{flex: 1 / 10,
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        marginTop:12,
        marginBottom:8,
       
        }}>
            <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            width:'80%',
            height:'100%',
            backgroundColor: colorAlert[alert.type],
            borderRadius:8
        }}>
            <Text style={{
                fontSize:16,
                fontWeight:'bold',
                color:'white',
                textAlign:'center',
               
              
            }}>{alert.message}</Text>
        </View></View>)
   
}

export default AlertMessage