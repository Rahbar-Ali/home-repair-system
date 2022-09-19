import React, { Component, createRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, BackHandler, TouchableOpacity, Modal } from 'react-native';
import Constants from '../../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
class Header extends Component {
    onDrawerClick = () => {

    }
    render() {
        return (

            <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, position: 'relative', shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                    onPress={() => this.onDrawerClick()}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={32} style={{ color: Constants.Colors.appThemeColor, paddingRight: 2, fontWeight: 'bold' }} />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                        <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>QUERY DETAILS</Text>
                    </View>
                </View>
            </View>

        );
    }
}
export default Header;