import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../components/Search'

const SeacherScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca tu vídeo</Text>
      <Search/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D"
  },
  title:{
      fontSize: 36,
      fontWeight: 'bold',
      color: "#fff",
      marginTop: 20,
      fontFamily: 'Bebas',
      textAlign:'center'
  }
})

export default SeacherScreen