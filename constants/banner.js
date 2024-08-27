import React from 'react'
import {Text, View, StyleSheet, StatusBar} from 'react-native'

const Banner = () => {
    return (
    <View style={styles.header}>
        <Text style={styles.headertext}>TOZBE</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    headertext : {
        paddingLeft: '5%',
        fontFamily: 'normal',
        fontSize: 27
    },

    header: {
        justifyContent : 'center',
        backgroundColor: "#374154",
        height: '7%',
    },
})

export default Banner 