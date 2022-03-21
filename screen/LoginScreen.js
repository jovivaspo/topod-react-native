import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FormLogin from '../components/FormLogin'
import AlertMessage from '../components/AlertMessage'
import { GlobalContext } from '../context/GlobalContext'



const LoginScreen = () => {
  const {alert} = useContext(GlobalContext)
 
 
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
    //fontWeight:'bold',
    textAlign:'center',
    color:'#fff',
    marginTop:50,
    fontFamily:'Montserrat_Bold'
},
text:{
  fontSize:14,
  textAlign:'center',
  color:'#fff',
  margin:8,
  fontFamily:'Montserrat_Medium'
}
})

export default LoginScreen