import { View, Text, Image, FlatList, Dimensions, TextComponen, StyleSheet, SafeAreaView, Platform, StatusBar, Pressable, Vibration 
} from "react-native";
import { COLORS, SIZES, bookData, Banner} from "../constants";
//import { Colors } from "react-native/Libraries/NewAppScreen";

const BookCover = ({ title, coverUri }) => (
    <Image source={coverUri} aria-label={title} style={styles.BookCover}/>
);


const Home = ({navigation}) => {
  return (
          <View style={styles.container}>
              <FlatList
              data={bookData}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <BookCover title={item.title} coverUri={item.Cover}/>}
              />
              <Pressable
              onPress={() => {
                console.log('super secret button')
                Vibration.vibrate(pattern = [100])
                navigation.navigate('Sos')
              
              }}>
              <Text>super secret button</Text>
              </Pressable>
          </View>
  )
}

const styles = StyleSheet.create({

  container: {
      paddingHorizontal: 0,
      paddingBottom: 0,
  },

  BookCover: {
      marginHorizontal :6,
      marginTop: 5,
      marginBottom : 2,
      flex: 1,
      borderWidth: 2,
      borderColor: "black",
      height: 220,
      width: 125,
  }
})

export default Home;