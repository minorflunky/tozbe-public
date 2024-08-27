import { Platform, StatusBar } from "react-native";

const COLORS = {
    primary: "#312651",
    secondary: "#444262",
    tertiary: "#FF7754",
  
    gray: "#83829A",
    gray2: "#C1C0C8",
  
    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
  };


const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };

  const androidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor : "#ECECEC"
  };

  export { COLORS, SIZES, androidSafeArea};