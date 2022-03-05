import { Input, Button, LinearProgress } from 'react-native-elements';
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { helpHttp } from '../services/helpHttp';
import { urls } from '../services/urlApi';
import { color } from 'react-native-reanimated';

const Search = () => {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    const [alert, setAlert] = useState()

    console.log(urls().SEARCH_VIDEOS)

    const handlerSearch = () => {
        if (search === '') return false
        console.log(search)
        setLoading(true)
        helpHttp().get(`${urls().SEARCH_VIDEOS}${search}`)
            .then(res => {
                if (res.error) {
                    setLoading(false)
                    setAlert({
                        open: true,
                        type: 'error',
                        message: res.error
                    })
                    return false
                }
                setLoading(false)
                setVideos(res.videos)
                setSearch('')
            })
    }

    return (
        <>
            <View style={styles.containerSearch}>
                <Input
                    containerStyle={{
                        alignContent: 'center',
                        width: '70%',

                    }}
                    inputContainerStyle={{
                        borderColor: '#CEA858',
                        borderBottomWidth: 1,
                    }}
                    style={styles.input}
                    placeholder='Buscador...'
                    onChangeText={(value) => setSearch(value)}
                />
                <Button buttonStyle={styles.buttonSeacher}
                    title=""
                    icon={{
                        name: 'search',
                        type: 'font-awesome',
                        size: 20,
                        color: 'white',
                    }}
                    onPress={handlerSearch}
                />
            </View>
            <View style={{flex:1/10, flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'center', marginTop:-10}}>
                {loading && <LinearProgress style={{width:'80%'}} color='#CEA858' />}
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    containerSearch: {
        flex: 1 / 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 25
    },
    input: {
        color: '#fff',
        borderBottomWidth: 0,
        paddingHorizontal: 10
    },
    buttonSeacher: {
        width: 50,
        height: 40,
        backgroundColor: '#CEA858',
        marginBottom: 26
    }
})

export default Search