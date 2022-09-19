/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ImageBackground, Image, TouchableOpacity, Button, View, Alert, StyleSheet, TouchableHighlight, ScrollView, TouchableWithoutFeedback, Keyboard, BackHandler, Dimensions , Animated } from 'react-native';
// import styles from '../styles/signup-styles';
import { TextInput } from 'react-native-paper';

//  Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import logo from '../assets/images/RHA_logo.png';


import Constants from '../utils/Constants';

import { connect } from 'react-redux';
import { register } from '../store/actions/index';
import ProgressBar from '../components/General/ProgressBar';

import bgImage12 from '../assets/images/backgroundLogo.png';
import * as Animatable from 'react-native-animatable';

import RBSheet from "react-native-raw-bottom-sheet";


import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

class Signup extends Component {

  RegisterSwingRef = ref2 => this.TouchableOpacity = ref2;
  BackToLoginRubberBandRef = ref => this.TouchableHighlight = ref;

  RegisterSwing = () => this.TouchableOpacity.swing(800).then(endState2 => console.log(endState2.finished ? this.submitSignupForm() : 'bounce cancelled'));
  BackToLoginBubber = () => this.TouchableHighlight.rubberBand(800).then(endState3 => console.log(endState3.finished ? this.props.navigation.navigate('AuthLoading') : 'rubberBand cancelled'));

  constructor() {
    super();
    this.state = {
      mobileNo: "",
      name: "",
      email: "",
      password: "",
      service: 'Washing Machine',
      uri: require('../assets/images/logo.png'),
      
    }
  }

  componentDidMount() {
    //this.props.onSubmit('23423423423', 'adasdads', 'asdasda', 'asdasda', this.props.navigation); //FOr Testing
    // BackHandler.addEventListener('Back Button Pressed...',function(){ return true; });  // back button disable
  }

  submitSignupForm() {
    const { mobileNo, password, email, name } = this.state
    if (mobileNo === '' || mobileNo.length < 10) {
      Alert.alert('Error', 'Please Enter Valid Mobile No')
    } else if (password == '') {
      Alert.alert('Error', 'pswd is mandatory')
    } else if (email == '') {
      Alert.alert('Error', 'email is mandatory')
    } else if (name == '') {
      Alert.alert('Error', 'name is mandatory')
    } else {
      this.props.onSubmit(this.state.mobileNo, this.state.name, this.state.email, this.state.password, this.props.navigation);
      // this.props.onSubmit(232323223, 'asdasd', 'm3jsad@gmail.com', '123456789', this.props.navigation);
    }

    // this.props.navigation.navigate(Constants.Navigation.VerifyOTP);

    // this.props.navigation.navigate('VerifyOTP')
  }

  login() {
    this.props.navigation.navigate('AuthLoading')
  }

  onPress = () => {
    this.setState({
        service: 'Washing Machine',
        uri: require('../assets/images/washing-machines.jpg')
    });
    console.log('services: ' + this.state.service);
    this.RBSheet.close();
};
onPress1 = () => {
    this.setState({
        service: 'Air Condition',
        uri: require('../assets/images/washing-machines.jpg')
    });
    console.log('services: ' + this.state.service);
    this.RBSheet.close();
};
onPress2 = () => {
    this.setState({
        service: 'Refrigrator',
        uri: require('../assets/images/washing-machines.jpg')
    });
    console.log('services: ' + this.state.service);
    this.RBSheet.close();
};
onPress3 = () => {
    this.setState({
        service: 'Cancel',
        uri: require('../assets/images/washing-machines.jpg')
    });
    console.log('services: ' + this.state.service);
    this.RBSheet.close();
};

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
          <View style={styles.container}>

            <View style={styles.innerContainer}>
              <Image style={styles.bgImage} source={bgImage12} />
              <View style={styles.bigCircle}></View>
              <View style={styles.smallCircle}></View>
              <View style={styles.centerizedView}>

                <View style={styles.authBox}>
                  <View style={styles.logoBox}>
                    <Image style={styles.logo} source={logo} />
                  </View>
                  <Text style={styles.loginTitleText}>REGISTER</Text>
                  <View style={styles.hr}></View>
                  <View style={styles.btnContainer}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        mode="outlined"
                        style={{ background: '#fff', height: 50 }}
                        keyboardType="number-pad"
                        label="Name"
                        maxLength={11}
                        placeholder="Ali"
                      // value={this.state.username}
                      // onChangeText={(username) => this.setState({ username })}
                      />
                      <TextInput
                        mode="outlined"
                        style={{ background: '#fff' }}
                        keyboardType="number-pad"
                        label="Mobile No"
                        maxLength={11}
                        placeholder="Example: 03001234567"
                      // value={this.state.username}
                      // onChangeText={(username) => this.setState({ username })}
                      />
                      <TextInput
                        mode="outlined"
                        style={{ background: '#fff' }}
                        keyboardType="number-pad"
                        label="Email"
                        maxLength={11}
                        placeholder="example@gmail.com"
                      // value={this.state.username}
                      // onChangeText={(username) => this.setState({ username })}
                      />

                      {/* Drop Down */}
                      <View style={styles.bottomView}>
                        <View style={styles.deatilSection}>
                            <TouchableOpacity style={{
                                justifyContent: "center",
                                flex: 1
                            }} onPress={() => this.RBSheet.open()}>
                                <View style={{
                                    justifyContent: "center",
                                    // flex: 1 
                                }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                                        <Image source={this.state.uri} style={{ width: 25, height: 25, marginLeft: 5 }} />
                                        <Text style={{ paddingLeft: 17 }}>{this.state.service}</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', paddingRight: 10 }}>
                                                <Ionicons name="ios-arrow-down" size={18} />
                                            </View>

                                        </View>
                                    </View>
                                </View>

                                <RBSheet ref={ref => { this.RBSheet = ref; }}
                                    height={220} openDuration={250} customStyles={{
                                        container: {
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 12,
                                            },
                                            shadowOpacity: 0.58,
                                            shadowRadius: 16.00,
                                            elevation: 24,
                                            borderTopLeftRadius: 30,
                                            borderTopRightRadius: 30,
                                        }
                                    }}
                                    closeOnDragDown={true}
                                >
                                    <View style={styles.containerActionSheet}>
                                        <Text style={{ marginBottom: '1%', color: Constants.Colors.appThemeColor, fontSize: 20, fontWeight: 'bold' }}>SELECT SERVICE</Text>
                                    </View>

                                    <TouchableOpacity onPress={this.onPress}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Icon name="american-football" size={20} style={{ color: '#000000', paddingRight: 6 }} /> */}
                                            <Image source={require('../assets/images/washing-machines.jpg')}
                                                style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Washing Machine</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress1}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Air Condition</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress2}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Icon name="analytics" size={20} style={{ color: '#000000', paddingRight: 6 }} /> */}
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Refrigrator</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress3}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <View style={styles.hr}></View> */}
                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}
                                </RBSheet>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', left: 20 }}>
                            <Animatable.View ref={this.NextSwingRef}>
                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.NextSwing}>
                                    <View style={{
                                        flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.loginText}>NEXT</Text>
                                        <MaterialIcons name="navigate-next" size={32} style={{ color: '#fff', paddingRight: 8 }} />

                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                            <Text style={styles.exitTitleText}>Press Back Again To EXIT The App</Text>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => BackHandler.exitApp()}
                            >
                                <Text style={styles.exitText}>EXIT</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </View>

                    {/* End drop Down */}


                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        mode="outlined"
                        style={{ background: '#fff' }}
                        label="Password"
                        secureTextEntry={true}
                        placeholder="Enter Password"
                      // value={this.state.password}
                      // onChangeText={(password) => this.setState({ password })}
                      // right={
                      // <TextInput.Icon name="eye" />
                      // <TextInput.Icon name={() => <Icon name="md-lock" size={26} style={{ color: '#000000', paddingRight: 8 }} />} />

                      // }
                      // right={<Text>sd</Text>}
                      />
                    </View>
                  </View>

                  <View style={styles.btnContainer}>
                    <View style={{ width: '50%' }}>

                    </View>

                  </View>
                </View>
              </View>

              <ProgressBar />
            </View>
          </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',

    //backgroundColor: '#DCDCDC',
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
  },
  inputItem: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: Constants.Colors.headerBackColor,
  },

  btnContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    marginTop: 20
  },
  btnItem: {
    width: '50%' // is 50% of container width
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
    width: '90%',
    marginLeft: '5%',

    // shadowColor: "#808080",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 2,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    paddingRight: 15,
    color: Constants.Colors.headerBackColor
  },
  buttonContainer: {
    height: 45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: '7%',

    // width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
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
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',

    position: 'absolute',
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
  },
  btnText: {
    color: "white",
    fontWeight: 'bold'
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    //   backgroundColor: '#ff6b81',
    backgroundColor: '#1F618D',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    //   backgroundColor: '#ff7979',
    backgroundColor: '#1F618D',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    //   width: '100%',
    //   top: '20%',
    // top: Dimensions.get('window').width - 100
    // justifyContent: 'center'
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  authBox: {
    marginBottom: '20%',
    width: '92%',
    backgroundColor: '#fafafa',
    borderRadius: 15,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    //   backgroundColor: '#eb4d4b', // red 
    backgroundColor: '#f2eded',
    borderRadius: 1000,
    borderColor: 'black',
    borderWidth: 0.3,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logo: {
    // flex: 1,
    resizeMode: 'contain',
    // position: 'absolute',
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
});


const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (mobileNo, name, email, password, propsNavigate) => dispatch(register(mobileNo, name, email, password, propsNavigate))
  }
}


export default connect(null, mapDispatchToProps)(Signup);