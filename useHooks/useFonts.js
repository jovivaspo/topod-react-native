import * as Font from "expo-font";

export default useFonts = async () => {
   
   await Font.loadAsync({
    'Bebas': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat_Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat_ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat_Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat_Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Inter': require('../assets/fonts/Inter-Black.otf')
    });
}