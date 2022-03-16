
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './context/GlobalContext';
import { Provider } from 'react-redux';
import store from './store/index'
import Navigator from './navigation/Navigator';



export default function App() {


  return (
    <Provider store={store}>
      <GlobalProvider>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </GlobalProvider>
    </Provider>


  )
}


