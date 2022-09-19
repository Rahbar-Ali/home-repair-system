import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';

import AppNavigator from './src/components/Navigation/AppNavigator';
import Constants from './src/utils/Constants';
// import OneSignalPushNotication from './src/components/General/OneSignalPushNotification';
import axios from 'axios';
import { connect } from 'react-redux';


console.disableYellowBox = true; //make to true to ignore warnings
class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <OneSignalPushNotication /> */}
        <AppNavigator />
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Constants.Colors.StatusBarColor} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    test: state.reducerLogin.test
  };
};

export default connect(mapStateToProps, null)(App);