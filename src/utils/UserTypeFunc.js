import React from 'react';
import Constants from './Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';



export const DeviceUniqueId = () => {
    return DeviceInfo.getUniqueId();
}


export const ShowMessage = (message, type) => {
    //Currently Same will set i future
    if (type === Constants.DisMsgType.Success) {
        alert(message);
    }
    else if (type === Constants.DisMsgType.Error) {
        alert(message);
    }
}

export const LogError = (message, Activity) => {
    console.log(message + Activity);
}

const styles = StyleSheet.create({
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: Constants.Colors.headerBackColor,
        borderRadius: 100
    },
});

