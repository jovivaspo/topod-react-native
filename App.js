
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackApp from './navigation/StackApp';
import DrawerApp from './navigation/DrawerApp';
import { GlobalProvider } from './context/GlobalContext';
import { Provider, useSelector } from 'react-redux';
import store from './store/index'


export default function App() {

 
  return (
    <Provider store={store}>
      <GlobalProvider>
        <NavigationContainer>
          <DrawerApp />
        </NavigationContainer>
      </GlobalProvider>
    </Provider>


  )
}


