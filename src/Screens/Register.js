import React, { Component } from 'react';
import { ScrollView,StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert, Linking, TouchableWithoutFeedback, Keyboard, TouchableHighlight, Animated } from 'react-native';
import { AsyncStorage } from 'react-native'

import bgImage from '../assets/images/background.png';
import registerBg from '../assets/images/registerBackground.jpg';
import bgImage12 from '../assets/images/background12.jpeg';
import logo from '../assets/images/RHA_logo.png';

import axios from 'axios';
import { TextInput, HelperText, withTheme, Theme } from 'react-native-paper';

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { Right, Left, Form, Container, Input, Item, Button, Label } from 'native-base';
import { connect } from 'react-redux';
import { login, forgotPassword, setForgotPassword, setOTPModal } from '../store/actions/index';

import { getUserInfo, setUserInfo } from '../components/General/LoginUserInfo';
import ProgressBar from '../components/General/ProgressBar';
import { setLogoutValue } from '../../src/store/actions/index';

import Constants from '../utils/Constants';
// import * as Animatable from 'react-native-animatable';

// import { Dimensions } from 'Dimensions';


const { width } = Dimensions.get("window");

//Icons
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Custom Avoid Keyboard from KeyboardAvoid.ks
import KeyboardAvoid from '../components/KeyboardAvoid/KeyboardAvoid';

// Formik
import { Formik } from 'formik';

// Yup API for Validation 
import * as Yup from 'yup';

// Custom Style from Style.js
import { PageTextExtra, LineExtra, SubTitleError, Line, BackImage, SubTitle, StyledFormArea, StyledContainer, StyledInnerContainer, PageImageLogo, PageText, Colors, StyledInputLabel, StyledTextInput, StyledButton, LeftIcon, RightIcon, ButtonText } from './../styles/StylesRegister';

//colors object
const { brand } = Colors;
const { darkLight } = Colors;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            username: '',
            password: '',
            MobileNo: '',
            OTPText: '',
            isLogoutValue: false,
            secureTextEntry: true,
            active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
        }
    }
    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };
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

    onClickRegister = () => {
        this.props.navigation.navigate('Register');
    }
    secureTextEntryOne = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        });
    }
    render() {
        const hidePassword = this.state.hidePassword;
        const setHidePassword = this.setHidePassword;

        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;


        return (
                <StyledContainer>
                    <StyledInnerContainer>
                        <BackImage source={require('../assets/images/registerBackground.jpg')} />
                        <PageText>Register</PageText>
                        <View
                        style={{
                            flexDirection: "row",
                            marginBottom: 20,
                            height: 36,
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#fdbe61",
                                borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#007aff",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#007aff", fontSize: 18, fontWeight: 'bold',
                                }}
                            >
                                Client
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#007aff",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 1 ? "#fff" : "#007aff", fontSize: 18, fontWeight: 'bold',
                                }}
                            >
                                Worker
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >
                            <Formik
                            initialValues={{ phone: "", password: "", username: "", email: "" }}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, handleBlur, setFieldTouched, values, errors, touched }) => (
                                <StyledFormArea>
                                    <MyTextInput
                                        label="Username"
                                        icon="user"
                                        placeholder="Rahbar"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur("username")}
                                        value={values.username}
                                    />
                                    {(errors.username && touched.username) &&
                                        <SubTitleError>{errors.username}</SubTitleError>}
                                    <MyTextInput width={true}
                                        label="Email"
                                        icon="email"
                                        placeholder="rahbar@gmail.com"
                                        keyboardType="email-address"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                    {(errors.email && touched.email) &&
                                        <SubTitleError>{errors.email}</SubTitleError>}
                                    <MyTextInput width={true}
                                        label="Phone Number"
                                        icon="mobile"
                                        placeholder="03126958178"
                                        maxLength={11}
                                        keyboardType="number-pad"
                                        onChangeText={handleChange("phone")}
                                        onBlur={handleBlur("phone")}
                                        value={values.phone}
                                    />
                                    {(errors.phone && touched.phone) &&
                                        <SubTitleError>{errors.phone}</SubTitleError>}
                                    {this.state.secureTextEntry ?
                                        <MyTextInput width={true}
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
                                        <MyTextInput width={true}
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
                                    <StyledButton>
                                        <ButtonText onPress={handleSubmit}>
                                            Register
                                        </ButtonText>
                                    </StyledButton>
                                    <SubTitle>Already have a account ? Sign In </SubTitle>
                                </StyledFormArea>

                            )}
                        </Formik>
                        </Animated.View>
                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                               <Formik
                            initialValues={{ phone: "", password: "", username: "", email: "" }}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, handleBlur, setFieldTouched, values, errors, touched }) => (
                                <StyledFormArea>
                                    <MyTextInput
                                        label="Username"
                                        icon="user"
                                        placeholder="Rahbar"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur("username")}
                                        value={values.username}
                                    />
                                    {(errors.username && touched.username) &&
                                        <SubTitleError>{errors.username}</SubTitleError>}
                                    <MyTextInput width={true}
                                        label="Email"
                                        icon="email"
                                        placeholder="rahbar@gmail.com"
                                        keyboardType="email-address"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                    {(errors.email && touched.email) &&
                                        <SubTitleError>{errors.email}</SubTitleError>}
                                    <MyTextInput width={true}
                                        label="Phone Number"
                                        icon="mobile"
                                        placeholder="03126958178"
                                        maxLength={11}
                                        keyboardType="number-pad"
                                        onChangeText={handleChange("phone")}
                                        onBlur={handleBlur("phone")}
                                        value={values.phone}
                                    />
                                    {(errors.phone && touched.phone) &&
                                        <SubTitleError>{errors.phone}</SubTitleError>}
                                    {this.state.secureTextEntry ?
                                        <MyTextInput width={true}
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
                                        <MyTextInput width={true}
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
                                    <StyledButton>
                                        <ButtonText onPress={handleSubmit}>
                                            Register
                                        </ButtonText>
                                    </StyledButton>
                                    
                        <SubTitle>Already have a account ? Sign In </SubTitle>
                                </StyledFormArea>

                            )}
                        </Formik>        
                        </Animated.View>
                    </ScrollView>
                    </StyledInnerContainer>
                </StyledContainer>
        );
    }
}

const validationSchema = Yup.object().shape({
    phone: Yup.string().required().min(11).label("Phone number").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone Number is not Valid"
    ),
    password: Yup.string().required().min(8).label("Password").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email")
});

// FORM Styling ... using exported const from style.js
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {

    return (
        <View>
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
        </View>
    );
};

//     return (
//         <TouchableWithoutFeedback
//             onPress={() => {
//                 Keyboard.dismiss;
//             }}
//         >
//             <View style={styles.container}>
//                 <View style={styles.innerContainer}>
//                     <Image style={styles.bgImage} source={registerBg} />
//                     <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 0.9, marginLeft: '6%' }}>
//                         <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'blue', marginBottom: '10%' }}>REGISTER</Text>
//                         <View style={styles.inputContainer}>
//                             <TextInput
//                                 mode="outlined"
//                                 style={{ background: '#fff', height: 45, width: '88%', marginBottom: '5%' }}
//                                 keyboardType="number-pad"
//                                 label="Mobile No"
//                                 maxLength={11}
//                                 placeholder="Example: 03001234567"
//                                 value={this.state.username}
//                                 onChangeText={(username) => this.setState({ username })}
//                             />
//                             <TextInput
//                                 mode="outlined"
//                                 style={{ background: '#fff', height: 45, width: '88%', marginBottom: '5%' }}
//                                 label="Password"
//                                 secureTextEntry={true}
//                                 placeholder="Enter Password"
//                                 value={this.state.password}
//                                 onChangeText={(password) => this.setState({ password })}
//                             />
//                             <TextInput
//                                 mode="outlined"
//                                 style={{ background: '#fff', height: 45, width: '88%', marginBottom: '5%' }}
//                                 keyboardType="number-pad"
//                                 label="Mobile No"
//                                 maxLength={11}
//                                 placeholder="Example: 03001234567"
//                                 value={this.state.username}
//                                 onChangeText={(username) => this.setState({ username })}
//                             />
//                             <TextInput
//                                 mode="flat"
//                                 style={{ background: 'transparent', height: 45, width: '88%', marginBottom: '5%' }}
//                                 keyboardType="number-pad"
//                                 label="Mobile No"
//                                 maxLength={11}
//                                 placeholder="Example: 03001234567"
//                                 value={this.state.username}
//                                 onChangeText={(username) => this.setState({ username })}
//                             />
//                             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//                                 <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
//                                 >
//                                     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//                                         <Icon name="md-lock" size={26} style={{ color: 'black', paddingRight: 8 }} />
//                                         <Text style={styles.loginText}>Register</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '5%' }}>

//                                 <Text style={styles.SignInText}
//                                     onPress={() => this.props.navigation.navigate('AuthLoading')}
//                                 >Already have an account? Sign In</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//         </TouchableWithoutFeedback>

//     );
// }

const resizeMode = 'center';

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
        height: 65,
        width: '45%',
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        // marginLeft: '7%',

        // width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    SignInText: {
        color: 'blue',
        fontSize: 17,
        // paddingRight: 2,
        fontWeight: 'bold',
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
        backgroundColor: Constants.Colors.yellowThemeColor,
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
        color: 'black',
        fontSize: 20,
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
        justifyContent: 'flex-end'

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

export default connect(mapStateToProp, mapsDispatchToProps)(Register);
// export default Login;