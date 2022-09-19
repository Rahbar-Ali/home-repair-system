import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView, Animated, TouchableOpacity, Dimensions, ImageBackground, FlatList, SafeAreaView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



import { Badge } from 'react-native-paper';

class ListDemo extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.outerContainer}>
                    {/* First Row of Two Box */}
                    <View style={styles.item}>
                        {/* Box One */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>
                        {/* Box Two */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>

                    </View>

                    {/* First Row of Two Box */}
                    <View style={styles.item}>
                        {/* Box Three */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>
                        {/* Box four */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    {/* First Row of Two Box */}
                    <View style={styles.item}>
                        {/* Box Five */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>
                        {/* Box Six */}
                        <TouchableOpacity style={styles.box}>
                            <Badge style={{ top: 0, position: 'absolute', fontSize: 15, right: '-3%' }}>300</Badge>
                            <View>
                                <View style={{ marginTop: '13%', marginLeft: '15%', flexDirection: 'row' }}>
                                    <MaterialIcons name="android" size={76} style={{ color: '#fff' }} style={styles.roundButton} />
                                    {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={styles.roundButton} /> */}
                                </View>
                                <Text style={{ marginTop: -20, alignItems: 'center', fontSize: 19, textAlign: 'center', fontWeight: 'bold' }}>USERS</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    } // end of render
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
        // backgroundColor: '#c9c9c9',
        height: Dimensions.get("screen").height,
        display: 'flex'
    },
    item: {
        // backgroundColor: '#3232ff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '100%',
        flexDirection: 'row',
        // marginBottom: '2%',
        // height: '100%'
    },
    outerContainer: {
        // backgroundColor: '#3232ff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        marginBottom: '1%',
        // height: '100%'
    },
    box: {
        width: '50%',
        height: 150,
        borderColor: 'black',
        backgroundColor: 'white',
        margin: '3%',
        flex: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    roundButton: {
        width: 100,
        height: 100,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        marginLeft: '19%',
        // marginTop: '13%',
        // borderRadius: 100,
        // backgroundColor: 'orange',
    },
});
export default ListDemo;