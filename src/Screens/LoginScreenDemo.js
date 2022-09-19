import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import bgImage12 from '../assets/images/background12.jpeg';

import { TextInput, HelperText, withTheme, Theme } from 'react-native-paper';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';



class LoginScreenDemo extends Component {
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        
      </TouchableWithoutFeedback>

    );
  }
}
const styles = StyleSheet.create({

  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: 45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: '3%',

    // width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',

    position: 'absolute',
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
  },
  
  
  
 
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#1F618D', //"#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    // elevation: 9,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  btnContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    marginTop: 15
  },
  inputContainer: {
    // borderBottomColor: '#F5FCFF',
    // backgroundColor: '#FFFFFF',
    // borderRadius: 30,
    // borderBottomWidth: 1,
    // width: 300,
    // height: 45,
    // marginBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    // marginLeft: '1%',
    // marginRight: '2%',

    // shadowColor: "#808080",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 2,
  },
});
export default LoginScreenDemo;