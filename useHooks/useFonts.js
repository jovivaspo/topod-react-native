import * as Font from "expo-font";

export default useFonts = async () => {
   
   await Font.loadAsync({
    'Bebas': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    'Inter': require('../assets/fonts/Inter-Black.otf')
    });
}