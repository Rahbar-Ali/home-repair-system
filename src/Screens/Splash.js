import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SplashImage from '../assets/images/logo2.png';

class Splash extends Component {
    render() {
        return (
            <View style={styles.body}>
                {/* <Text style={styles.title}>Splash Screen</Text> */}
                <Image style={styles.bgImage} source={SplashImage} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        textAlign: "center",
        justifyContent: "center",
        // backgroundColor:"black",
        backgroundColor: "white",
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 39,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',

        position: 'absolute',
        width: '100%',
        height: 400,
        // justifyContent: 'center',
    },


})
export default Splash;