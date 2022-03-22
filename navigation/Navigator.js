import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DrawerApp from './DrawerApp'
import AuthStackApp from './AuthStackApp'
import AppLoading from 'expo-app-loading'
import useFonts from '../useHooks/useFonts'
import { loadUser } from '../actions/userActions'

const Navigator = () => {
    const [IsReady, SetIsReady] = React.useState(false)
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const LoadFonts = async () => {
        await useFonts()
      }

    const checkUser = async () =>{
      dispatch(loadUser())
    }
    

    if (!IsReady) {
        return (
          <AppLoading startAsync={async()=>{
            await checkUser()
            await LoadFonts()
          }}
            onFinish={() => SetIsReady(true)}
            onError={() => { }} />
        )
      } 

    return (
        <>
            {userInfo ? <DrawerApp/> : <AuthStackApp/>}
            
        </>
     
    )
  
}

export default Navigator