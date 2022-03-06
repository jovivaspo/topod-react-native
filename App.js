
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackApp from './navigation/StackApp';
import DrawerApp from './navigation/DrawerApp';
import { GlobalProvider } from './context/GlobalContext';


export default function App() {

  return (
    <GlobalProvider>
      <NavigationContainer>
        <DrawerApp />
      </NavigationContainer>
    </GlobalProvider>

  )
}


