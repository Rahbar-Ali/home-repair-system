import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'

import OTPInputView from '@twotalltotems/react-native-otp-input';
import Constants from '../utils/Constants';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { login, forgotPassword, setForgotPassword, setOTPModal, ResendCode } from '../store/actions/index';
import GLOABAL_PATH from './../utils/GlobalPath';
import axios from 'axios';
import logo from '../assets/images/otpLogo.jpg';
import ProgressBar from '../components/General/ProgressBar';
import * as Animatable from 'react-native-animatable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

class VerifyOTP extends React.Component {

    SubmitOTPSwingRef = ref2 => this.TouchableOpacity = ref2;
    ResendOTPRubberBandRef = ref => this.Text = ref;

    SubmitOTPSwing = () => this.TouchableOpacity.swing(800).then(endState2 => console.log(endState2.finished ? this.SubmitOTP() : 'bounce cancelled'));
    ResendOTPBubber = () => this.Text.rubberBand(800).then(endState3 => console.log(endState3.finished ? this.setState({ code: "" }) : 'rubberBand cancelled'));

    constructor(props) {
        super(props);

        this.state = {
            code: "",
            isOTPVerified: false,
            MobileNo: ''
        }
    }


    componentDidMount() {
        this.setState({ MobileNo: this.props.MobileNo });

        // BackAndroid.addEventListener('Back Button Pressed...', () => {return true});  // back button disable
        // this.copyCodeFromClipBoardOnAndroid();
        // setTimeout(() => {
        //     this.bringUpKeyBoardIfNeeded();
        // }, 50);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    ResendCode = () => {
        this.props.OnResendCode(this.state.MobileNo);
    }

    SubmitOTP = () => {
        if (this.state.isOTPVerified === true) {
            let url = GLOABAL_PATH.API_URL + 'Login/OTPVerify?MobileNo=' + this.state.MobileNo;
            axios.get(url)
                .then((resp) => {
                    if (resp.data.Message === Constants.ApiResponse.Success) {
                        alert('Your moible no has been verified.Please login to continue');
                        this.props.navigation.navigate(Constants.Navigation.AuthLoading);
                    }
                    else {
                        alert(resp.data.Message);
                    }

                })
                .catch((err) => {
                    console.log(err);

                });

        }
        else {
            alert('Please enter correct OTP or resend again.');
        }

    }

    verify = (code) => {
        alert(code);
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                {/*  Header Bar Start */}
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                    {/* <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('Login')}>

                        <MaterialIcons name="keyboard-arrow-left" size={32} style={{ color: Constants.Colors.appThemeColor, paddingRight: 2, fontWeight: 'bold' }} />
                    </TouchableOpacity> */}

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>VERIFICATION</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}


                <View style={styles.container}>

                    <View style={styles.innerContainer}>
                        {/* <Text>Enter OTP</Text> */}
                        {/* <View style={{ flexDirection: "row" }}> */}

                        {/* <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        style={{ background: '#fff' }}
                        keyboardType="number-pad"
                        label="Moible No"
                        maxLength={11}
                        placeholder="Enter Moible No e.g. 03001234567"
                        value={this.state.MobileNo}
                        onChangeText={(MobileNo) => this.setState({ MobileNo })}
                    />
                </View> */}
                        <Image style={styles.bgImage} source={logo} />
                        <View style={{ marginTop: '5%' }}>
                            <Text style={{ fontSize: 18, color: Constants.Colors.headerBackColor }}>Please enter OTP to verify your mobile no</Text>
                        </View>

                        <OTPInputView
                            style={{ width: '80%', height: 150 }}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={code => { this.setState({ code }) }}
                            autoFocusOnLoad={true}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                if (code === this.props.OTP) {
                                    this.setState({ isOTPVerified: true });
                                }
                                // console.log(`Code is ${code}, you are good to go!`);
                                // console.log("OTP is:" +this.props.OTP);
                            })}
                        // placeholderCharacter={'*'}
                        // placeholderTextColor={'red'}
                        />


                        <View style={{ width: 300 }} >
                            <Animatable.View ref={this.SubmitOTPSwingRef}>
                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={
                                    // () => this.SubmitOTP()
                                    this.SubmitOTPSwing
                                }>

                                    <TouchableHighlight >
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                        >
                                            <Text style={styles.loginText}>Submit</Text>
                                        </View>
                                    </TouchableHighlight>

                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View>
                            <Animatable.View ref={this.ResendOTPRubberBandRef}>
                                <TouchableOpacity style={{ marginTop: '1%' }}
                                >
                                    <Text style={{ fontSize: 18, color: Constants.Colors.headerBackColor }}
                                        onPress={
                                            // () => { this.setState({ code: "" }) }
                                            this.ResendOTPBubber
                                        }
                                    >Did not receive OTP? Resend OTP</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={{ marginTop: '5%' }}>
                            <Text style={{
                                fontSize: 18,
                                color: Constants.Colors.headerBackColor,
                                fontWeight: 'bold'
                            }}>SMS has been send to {this.props.MobileNo} </Text>
                        </View>

                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a5386',
        // backgroundColor: '#1F618D',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
    },

    borderStyleBase: {
        width: 30,
        height: 45
    },
    inputContainer: {
        width: '90%',
        marginLeft: '2%',
        elevation: 2,
        marginRight: '2%'
    },
    borderStyleHighLighted: {
        borderColor: Constants.Colors.headerBackColor,
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: Constants.Colors.headerBackColor,
        fontSize: 18,
        fontWeight: 'bold'
    },

    underlineStyleHighLighted: {
        borderColor: Constants.Colors.headerBackColor,
    },
    buttonContainer: {
        height: 45,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        // marginLeft: '7%',

        // width: 300,
        borderRadius: 30,
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
    innerContainer: {
        backgroundColor: '#ffffff',
        marginTop: '9%',
        marginRight: '3%',
        marginLeft: '3%',
        alignItems: 'center',
        // marginBottom: ,
        padding: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        borderRadius: 21,
        // borderBottomColor: '#000000',
        borderWidth: 0.8,
        // display: 'flex',
        // flexDirection: 'column',
    },
    bgImage: {
        // flex: 1,
        // resizeMode: '',
        // position: 'relative',
        width: 180,
        height: '40%',
        // resizeMode: 'contain'
        resizeMode: 'cover'
        // top: 0,
        // justifyContent: 'center',
        // flexDirection: 'column'
    },
});

const mapStateToProps = state => {
    return {
        MobileNo: state.reducerLogin.MobileNo,
        OTP: state.reducerLogin.OTP,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnResendCode: (MobileNo) => dispatch(ResendCode(MobileNo)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
// export default VerifyOTP;