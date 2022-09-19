import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert, Linking, TouchableWithoutFeedback, Keyboard, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native'

// Yup API for Validation 
import * as Yup from 'yup';
import bgImage from '../assets/images/background.png';
import loginBg from '../assets/images/loginBackground.jpg';
import bgImage12 from '../assets/images/background12.jpeg';
import logo from '../assets/images/RHA_logo.png';

import axios from 'axios';
import { TextInput, HelperText, withTheme, Theme } from 'react-native-paper';

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { Right, Left, Form, Container, Input, Item, Button, Label } from 'native-base';
import { connect } from 'react-redux';
import { login, forgotPassword, setForgotPassword, setOTPModal } from '../store/actions/index';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getUserInfo, setUserInfo } from '../components/General/LoginUserInfo';
import ProgressBar from '../components/General/ProgressBar';
import { setLogoutValue } from '../../src/store/actions/index';

import Constants from '../utils/Constants';
// import * as Animatable from 'react-native-animatable';

// import { Dimensions } from 'Dimensions';

// Formik
import { Formik } from 'formik';

//Keyboard Avoiding View
import KeyboardAvoid from '../components/KeyboardAvoid/KeyboardAvoid';
//styles.js
import { LineExtra, SubTitleError, Line, BackImage, SubTitle, StyledFormArea, StyledContainer, StyledInnerContainer, PageImageLogo, PageText, Colors, StyledInputLabel, StyledTextInput, StyledButton, LeftIcon, RightIcon, ButtonText } from './../styles/styles';
import { BackgroundImage } from 'react-native-elements/dist/config';

//colors object
const { brand } = Colors;
const { darkLight } = Colors;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      MobileNo: '',
      OTPText: '',
      isLogoutValue: false,
      secureTextEntry: true
    }
  }


  // componentDidMount() {
  //   this.displayData();
  //   getUserInfo().then((response) => {
  //     //this callback is executed when your Promise is resolved
  //     console.log('Res : ====>' + JSON.stringify(response));
  //     var UserInfo = response.UserInfo;
  //     let PlayerId = response.PlayerId;

  //     if (UserInfo != undefined && UserInfo != null) {
  //       this.setState({
  //         username: UserInfo.Username,
  //         password: UserInfo.Password
  //       });
  //     }

  //     this.setState({
  //       PlayerId: PlayerId
  //     });
  //     if (UserInfo != undefined && UserInfo != null && this.state.isLogoutValue == "false") {
  //       this.props.OnLogin(UserInfo.Username, UserInfo.Password, PlayerId, this.props.navigation);
  //     }
  //     else {
  //       this.props.OnLogin('', '', PlayerId, this.props.navigation);
  //     }
  //   }).catch((error) => {
  //   });
  // } // end of componentDIDMount

  // SubmitLogin = (username, password) => {

  //   // this.props.sendLogoutValue(this.state.isLogoutValue);
  //   // this.IsLogined();
  // }
  // IsLogined=async()=>{
  //   //Your login logic
  //   await AsyncStorage.setItem('isLoggedIn',true)
  // }
  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      this.setState({ isLogoutValue: user });
      // alert(user);
      // console.log("display value: "+this.state.isLogoutValue);
    } catch (error) {
      alert(error)
    }
  }
  sendLoginData() {
    let logoutDetail = "false";
    AsyncStorage.setItem('user', logoutDetail);
    // console.log("Data is saved.."+logoutDetail);
  }

  onClickListener = (btn) => {
    if (btn === 'login') {
      if (this.state.username.trim() === '' || this.state.password.trim() === '') {
        alert('Username and password required!!!');
      }
      else {
        this.props.OnLogin(this.state.username, this.state.password, this.state.PlayerId, this.props.navigation);
        this.sendLoginData();
      }
    }
    else if (btn === 'forgot') {
      this.props.OnSetForgotPassword(true);
    }
    // this.props.navigation.navigate('App');
  }
  onClickRegister = () => {
    console.log('register press');
    this.props.navigation.navigate('Register');
  }

  PressOkButtonHandler = () => {
    console.log('Press');
    Linking.openURL(this.props.AppVersionInfo.Url);
  }

  ForgotPasswordClickHandler = () => {
    if (this.props.OTPVisible === true) {
      if (this.state.OTPText === this.props.LoginInfo.OTP.toString()) {
        let LoginInfo = this.props.LoginInfo;
        this.props.OnSetForgotPassword(false);
        this.SubmitLogin(LoginInfo.Username, LoginInfo.Password);
      }
      else {
        alert(Constants.DisMsg.InvalidOTP);
      }
    }
    else {
      this.SendOTP();
    }
  } // end of ForgetPasswordClickHandler

  SendOTP = () => {
    var mobileNo = this.state.MobileNo;
    var initialMoibleNoDigit = mobileNo.substr(0, 3);
    if (initialMoibleNoDigit != '923' || mobileNo.length != 12) {
      alert('Please enter valid mobile number');
    }
    else {
      this.props.OnForgotPassword(mobileNo);
    }
  } // end of SendOTP

  CloseForgotPasswordModalHandler = () => {
    this.props.OnSetForgotPassword(false);
  }

  CloseOTPModalHandler = () => {
    this.props.OnSetOTPModal(false);
  }

  RensendOTPHandler = () => {
    this.SendOTP();
  }

  // secureTextEntry = () => {
  //   this.setState({
  //     secureTextEntry: !this.state.secureTextEntry
  //   });
  // }
  // onPress = () => {
  //   this.props.setState({
  //     if (this.state.setHidePassword != this.state.hidePassword
  //   });
  // };

  secureTextEntryOne = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  render() {

    return (

      <KeyboardAvoid>
        <StyledContainer>
          <StyledInnerContainer>
            <BackImage source={require('../assets/images/SampleBg.jpg')} />
            <PageText>HOME Repair System</PageText>
            <SubTitle>Account Login</SubTitle>
            <PageImageLogo source={require('../assets/images/LogoImage.png')} />
            <Formik
              initialValues={{ phone: '', password: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Phone Number"
                    icon="mobile"
                    placeholder="03126958178"
                    maxLength={11}
                    keyboardType="number-pad"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                  />
                  {(errors.phone && touched.phone) &&
                    <SubTitleError>{errors.phone}</SubTitleError>}
                  {this.state.secureTextEntry ?
                    <MyTextInput
                      label="Password"
                      icon="lock"
                      placeholder="* * * * * * * *"
                      secureTextEntry={true}
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      isPassword={true}
                      setHidePassword={this.secureTextEntryOne}
                      hidePassword={this.state.secureTextEntry}
                    />
                    :
                    <MyTextInput
                      label="Password"
                      icon="lock"
                      placeholder="* * * * * * * *"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      isPassword={true}
                      setHidePassword={this.secureTextEntryOne}
                      hidePassword={this.state.secureTextEntry}
                    />
                  }
                  {(errors.password && touched.password) &&
                    <SubTitleError>{errors.password}</SubTitleError>}
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>
                      Login
                    </ButtonText>
                  </StyledButton>
                  <Line />
                  <StyledButton register={true}>
                    <ButtonText >
                      Register
                    </ButtonText>
                  </StyledButton>
                </StyledFormArea>

              )}
            </Formik>
          </StyledInnerContainer>
        </StyledContainer>
      </KeyboardAvoid>
    );
  }
}


const validationSchema = Yup.object().shape({
  phone: Yup.string().required().min(11).label("Phone number").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Phone Number is not Valid"),
  password: Yup.string().required().min(8).label("Password").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),
});

// FORM Styling ... using exported const from style.js
const MyTextInput = ({ label, icon, isPassword, setHidePassword, hidePassword, ...props }) => {

  return (<View>
    <LeftIcon>
      <Entypo name={icon} size={30} color={brand} />
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    {isPassword && (
      <RightIcon onPress={() => setHidePassword()}>
        <Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={30} color={darkLight} />
      </RightIcon>
    )}
  </View>);
};

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
    //flexDirection: 'column',
    //width: '100%',
    //height: '200%'
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
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    // backgroundColor: "red",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'

  },
  btnContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    marginTop: 20,
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
    marginBottom: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    width: '90%',

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
    marginTop: 10,
    height: 45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    // marginLeft: '7%',

    // width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  registerAndForgetText: {
    color: Constants.Colors.black,
    fontSize: 15,
    paddingRight: 2,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
    // marginBottom: 20,
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
    // backgroundColor: '#1F618D', //"#00b5ec",
    backgroundColor: Constants.Colors.blueThemeColor,
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
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


const mapStateToProp = state => {
  return {
    appVersionModalVisible: state.reducerLogin.appVersionModalVisible,
    AppVersionInfo: state.reducerLogin.AppVersionInfo,
    forgotPasswordModalVisible: state.reducerLogin.forgotPasswordModalVisible,
    OTPVisible: state.reducerLogin.OTPVisible,
    LoginInfo: state.reducerLogin.LoginInfo,
    // islogout: state.reducerLogin.islogout,
  };
};


const mapsDispatchToProps = dispatch => {
  return {
    OnLogin: (username, password, PlayerId, propsNavigate) => dispatch(login(username, password, PlayerId, propsNavigate)),
    OnForgotPassword: (MobileNo) => dispatch(forgotPassword(MobileNo)),
    OnSetForgotPassword: (forgotPasswordModalVisible) => dispatch(setForgotPassword(forgotPasswordModalVisible)),
    OnSetOTPModal: (OTPModalVisible) => dispatch(setOTPModal(OTPModalVisible)),
    sendLogoutValue: (isLogout) => dispatch(setLogoutValue(isLogout))
  };
}

export default connect(mapStateToProp, mapsDispatchToProps)(Login);
// export default Login;