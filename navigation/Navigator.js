import React from 'react'
import { useSelector } from 'react-redux'
import DrawerApp from './DrawerApp'
import AuthStackApp from './AuthStackApp'
import AppLoading from 'expo-app-loading'
import useFonts from '../useHooks/useFonts'

const Navigator = () => {
    const [IsReady, SetIsReady] = React.useState(false)
    
    const LoadFonts = async () => {
        await useFonts()
      }


    const user = useSelector(state => state.user)

    if (!IsReady) {
        return (
          <AppLoading startAsync={LoadFonts}
            onFinish={() => SetIsReady(true)}
            onError={() => { }} />
        )
      } 

    return (
        <>
            {user.userInfo ? <DrawerApp/> : <AuthStackApp/>}
            
        </>
     
    )
  
}

export default Navigator