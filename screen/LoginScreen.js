import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FormLogin from '../components/FormLogin'
import AlertMessage from '../components/AlertMessage'
import { GlobalContext } from '../context/GlobalContext'
import { useSelector } from 'react-redux'

const LoginScreen = () => {
  const {alert} = useContext(GlobalContext)
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToPodcast</Text>
      <Text style={styles.text}>Escucha a tus youtubers favoritos desde donde quieras</Text>
      <Text style={styles.text}>Crea tu playlist y descarga tus podcasts desde la app</Text>
      <Text style={styles.text}>3 horas de reproducción totalmente gratis</Text>
      {alert.open && <AlertMessage/>}
      <FormLogin/>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#0D0D0D'
  },
  title:{
    fontSize:38,
    fontWeight:'bold',
    textAlign:'center',
    color:'#fff',
    marginTop:20
},
text:{
  fontSize:16,
  textAlign:'center',
  color:'#fff',
  margin:8
}
})

export default LoginScreen