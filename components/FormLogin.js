import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import {GlobalContext} from '../context/GlobalContext'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { register } from '../actions/userActions'

const initialForm={
    name:"",
    email:"",
    password:"",
    confirmPassword:""
}
const FormLogin = () => {
    const [value, setValue] = useState(true)
    const [form,setForm] = useState(initialForm)
    const {setAlert} = useContext(GlobalContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handlerSubmit = () => {
      
        if (!value) { //Inicio de sesión
          if (form.email === '' || form.password === '') {
            setAlert({
              open: true,
              type: 'error',
              message: 'Completa todos los campos'
            })
            return false
    
          }
    
        /*  dispatch(login(form, setAlert, setForm, initialForm))
          setTimeout(()=>{
            navigate('/playlist')
          },1000)*/
    
    
        } else {
          if (form.password !== form.confirmPassword) {
            setAlert({
              open: true,
              type: 'error',
              message: 'Las contraseñas no coinciden'
            })
            return false
          }
          if (form.email === '' || form.password === '' || form.name === '') {
            setAlert({
              open: true,
              type: 'error',
              message: 'Completa todos los campos'
            })
            return false
          }
    
          dispatch(register(form, setAlert, setForm, initialForm))
          setTimeout(()=>{
            navigation.navigate('Home')
          },1000)
        }
      }
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>{value ? 'Crea una cuenta' : 'Inicia sesión'}</Text>
            <ScrollView style={{ width: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.containerForm}>
                        {value && <Input
                            containerStyle={styles.containerInput}
                            inputContainerStyle={
                                styles.inputContainerStyle
                            }
                            style={styles.input}
                            placeholder='Nombre'
                            placeholderTextColor='#7F7F7F'
                            onChangeText={(value)=>setForm({...form,name:value})}

                        />}
                        <Input
                            containerStyle={styles.containerInput}
                            inputContainerStyle={
                                styles.inputContainerStyle
                            }
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor='#7F7F7F'
                            onChangeText={(value)=>setForm({...form,email:value})}
                        />
                        <Input
                            containerStyle={styles.containerInput}
                            inputContainerStyle={
                                styles.inputContainerStyle
                            }
                            style={styles.input}
                            placeholder='Contraseña'
                            placeholderTextColor='#7F7F7F'
                            onChangeText={(value)=>setForm({...form,password:value})}
                        />
                        {value && <Input
                            containerStyle={styles.containerInput}
                            inputContainerStyle={
                                styles.inputContainerStyle
                            }
                            style={styles.input}
                            placeholder='Repetir contraseña'
                            placeholderTextColor='#7F7F7F'
                            onChangeText={(value)=>setForm({...form,confirmPassword:value})}
                        />}
                        <View>
                            <Button title={value ? 'Registrate' : 'Inicia sesión'} buttonStyle={styles.button} onPress={handlerSubmit}/>
                            <Text style={{ textAlign: 'center' }}>{value ? '¿Ya tienes cuenta?' : '¿Eres nuevo?'}</Text>
                            <Button title={value ? 'Inicia sesión' : 'Registrate'} buttonStyle={styles.button} onPress={() => setValue(!value)} />
                        </View>
                    </View>
                </View>
            </ScrollView>


        </View>
    )

}

const styles = StyleSheet.create({
    containerForm: {
        flex: 1,

        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#CEA858',
        width: '80%',
        borderRadius: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        margin:16
    },
    containerInput: {
        alignContent: 'center',
        width: '90%',

    },
    inputContainerStyle: {
        borderBottomColor: 'black'
    },
    input: {
        color: 'black',
        borderBottomWidth: 0,
        paddingHorizontal: 5
    },
    button: {
        backgroundColor: '#0D0D0D',
        margin: 8
    }
})

export default FormLogin