import { LOAD_USER, LOGIN, LOGOUT, REGISTER } from "../types"
import { helpHttp } from "../services/helpHttp"
import { urls } from "../services/urlApi"
import * as SecureStore from 'expo-secure-store';

export const loadUser = () => async (dispatch) => {
    try{
        //const userStorage = await Keychain.getGenericPassword()
        const userStorage = await SecureStore.getItemAsync('userInfo')
        if (userStorage) dispatch({type:LOAD_USER, payload: JSON.parse(userStorage)})
        else return false
    }catch(err){
        console.log(err)
    }
}

export const login = (form, setAlert, setForm, initialForm) => async (dispatch) => {
    try {
       
        const res = await helpHttp().post(`${urls().LOGIN}`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                email: form.email,
                password: form.password
            }
        })

        if (res.error) {
            setAlert({
                open: true,
                type: 'error',
                message: res.error
            })
            return false
        }
      /* setAlert({
            open: true,
            type: 'success',
            message: res.message
        })*/
        const { userId, token, email } = res
        const userInfo = { userId, token, email }
        dispatch({ type: LOGIN, payload: { userId, token, email } })
        await SecureStore.setItemAsync('userInfo',  JSON.stringify(userInfo) );
        //await Keychain.setGenericPassword('userInfo',  JSON.stringify(userInfo))
        //localStorage.setItem('userInfo', JSON.stringify(userInfo))
        setForm(initialForm)
      

    } catch (err) {
        console.log(err)
        setAlert({
            open: true,
            type: 'error',
            message: 'Algo salió mal, inténtelo de nuevo'
        })
    }
}

export const register = (form, setAlert, setForm, initialForm) => async (dispatch) => {
    try {

        const res = await helpHttp().post(`${urls().REGISTER}`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                name: form.name,
                email: form.email,
                password: form.password
            }
        })

        if (res.error) {
            setAlert({
                open: true,
                type: 'error',
                message: res.error
            })
            return false
        }

       /* setAlert({
            open: true,
            type: 'success',
            message: res.message
        })*/
        const { userId, token, email } = res
        const userInfo = { userId, token, email }
        dispatch({ type: REGISTER, payload: { userId, token, email } })
        //localStorage.setItem('userInfo', JSON.stringify(userInfo))
        //await Keychain.setGenericPassword('userInfo',  JSON.stringify(userInfo))
        await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo) );
        setForm(initialForm)
       



    } catch (err) {
        console.log(err)
        setAlert({
            open: true,
            type: 'error',
            message: 'Algo salió mal'
        })
        return false
    }
}


export const logout = () => async (dispatch) => {
   
    await SecureStore.deleteItemAsync('userInfo')
    //await Keychain.resetGenericPassword()
    dispatch({ type: LOGOUT })
}