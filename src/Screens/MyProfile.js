import React, { Component } from 'react';

import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions, StatusBar, Picker, Button } from 'react-native';

import Constants from '../utils/Constants';

import AntDesign from 'react-native-vector-icons/AntDesign';


class MyProfile extends Component {
  constructor(props) {
    super(props);
  }
  onDrawerClick = () => {
    this.props.navigation.openDrawer();
  }

  // static navigationOptions =
  //   {
  //     title: 'Home'

  //   };

  render() {

    return (
      <View style={styles.Container}>

        {/*  Header Bar Start */}
        <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
          <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
            onPress={() => this.onDrawerClick()}>
            <AntDesign
              style={{ marginLeft: 2, fontWeight: 'bold' }}
              color={Constants.Colors.appThemeColor}
              name="menu-unfold"
              size={35}
            />
            {/* <Hamburger type="spinCross" active={this.state.active} onPress={() => this.onDrawerClick()} underlayColor="transparent" color='#00517b'
                                fontWeight='bold' size={30} >
                            </Hamburger> */}
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>MY PROFILE</Text>
            </View>
          </View>
        </View>
        {/*  Header Bar End */}
        <View style={styles.MainContainer}>
          
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  Container: {
    // flex: 1,
    // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MyProfile;