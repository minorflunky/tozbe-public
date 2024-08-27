import { View, Text, Image, FlatList, Dimensions, TextComponen, StyleSheet, SafeAreaView, Platform, StatusBar, Pressable 
} from "react-native";
import { COLORS, SIZES, bookData, Banner} from "../constants";
//import { Colors } from "react-native/Libraries/NewAppScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/home";
import Sos from "../screens/sos";
import { androidSafeArea } from "../constants/theme";
import SettingsScreen from "../screens/SettingScreen";
import InfoScreen from "../screens/infoScreen";



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={androidSafeArea}>
    <Banner />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name='Sos'
        component={Sos}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );

  }

  export default App;