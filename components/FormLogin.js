import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { GlobalContext } from '../context/GlobalContext'
import { useDispatch } from 'react-redux'
import { register, login } from '../actions/userActions'
import { LinearGradient } from 'expo-linear-gradient';

const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const FormLogin = () => {
    const [value, setValue] = useState(true)
    const [form, setForm] = useState(initialForm)
    const { setAlert } = useContext(GlobalContext)
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

            dispatch(login(form, setAlert, setForm, initialForm))

        } else { //Registro
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

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{value ? 'Crea una cuenta' : 'Inicia sesión'}</Text>
            <ScrollView style={{ width: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.containerForm}>
                        <LinearGradient colors={['rgba(255,255,255,1)', 'rgba(224,201,152,1)', 'rgba(205,167,87,1)']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 0.7, y: 0.5 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 24,
                                padding:8
                            }}
                        >
                            {value && <Input
                                containerStyle={styles.containerInput}
                                inputContainerStyle={
                                    styles.inputContainerStyle
                                }
                                style={styles.input}
                                placeholder='Nombre'
                                placeholderTextColor='#7F7F7F'
                                onChangeText={(value) => setForm({ ...form, name: value })}

                            />}
                            <Input
                                containerStyle={styles.containerInput}
                                inputContainerStyle={
                                    styles.inputContainerStyle
                                }
                                style={styles.input}
                                placeholder='Email'
                                placeholderTextColor='#7F7F7F'
                                onChangeText={(value) => setForm({ ...form, email: value })}
                            />
                            <Input
                                containerStyle={styles.containerInput}
                                inputContainerStyle={
                                    styles.inputContainerStyle
                                }
                                style={styles.input}
                                placeholder='Contraseña'
                                placeholderTextColor='#7F7F7F'
                                onChangeText={(value) => setForm({ ...form, password: value })}
                            />
                            {value && <Input
                                containerStyle={styles.containerInput}
                                inputContainerStyle={
                                    styles.inputContainerStyle
                                }
                                style={styles.input}
                                placeholder='Repetir contraseña'
                                placeholderTextColor='#7F7F7F'
                                onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
                            />}
                            <View>
                                <Button title={value ? 'Registrate' : 'Inicia sesión'} buttonStyle={styles.button}  onPress={handlerSubmit} />
                                <Text style={{ textAlign: 'center' }}>{value ? '¿Ya tienes cuenta?' : '¿Eres nuevo?'}</Text>
                                <Button title={value ? 'Inicia sesión' : 'Registrate'} buttonStyle={styles.button} onPress={() => setValue(!value)} />
                            </View>
                        </LinearGradient>

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
        height: '100%',
        //backgroundColor: '#CEA858',
        //backgroundColor: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(224,201,152,1) 0%, rgba(205,167,87,1) 100%)',
        width: '80%',

    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: '#fff',
        margin: 16,
        fontFamily:'Montserrat_Bold'
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