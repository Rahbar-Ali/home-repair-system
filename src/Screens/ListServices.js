import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert, Linking, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import { AsyncStorage } from 'react-native'



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

import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getUserInfo, setUserInfo } from '../components/General/LoginUserInfo';
import ProgressBar from '../components/General/ProgressBar';
import { setLogoutValue } from '../../src/store/actions/index';

import Constants from '../utils/Constants';
// import * as Animatable from 'react-native-animatable';

// import { Dimensions } from 'Dimensions';

// Formik

const { brand } = Colors;
const { darkLight } = Colors;

import { Formik } from 'formik';

//Keyboard Avoiding View
import KeyboardAvoid from '../components/KeyboardAvoid/KeyboardAvoid';

//Styles From StylesDashboard
import { ContentCardListText, LeftListIcon, StyledButtonContainer, StyledMainContainer, Card, ContentCardSlider, ContentSliderImage, ContentSliderImageView, ContentCardTextExtra, ContentCardText, ContentCardImage, ContentCardImageView, ContentCardTopServies, ContentCardServies, ContentCard, StyledCard, LineExtra, SubTitleError, Line, BackImage, SubTitle, StyledFormArea, StyledContainer, StyledInnerContainer, PageImageLogo, PageText, Colors, StyledInputLabel, StyledTextInput, StyledButton, LeftIcon, RightIcon, ButtonText } from './../styles/StylesListServices';

//Sub Services

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class ListServices extends Component {

    constructor(props) {
        super(props);
        this.state = {

            filterService: []
        }
    }

    render() {

        const CardTest = () => {
            const { navigation } = this.props;
            const subtest = navigation.state.params;
            return (
                <StyledContainer>
                    <StyledInnerContainer>

                        <ContentCardTextExtra>{subtest.name}</ContentCardTextExtra>
                        <ContentCardSlider>
                            <Card>
                                <StyledCard>
                                    <LeftListIcon>
                                        <Entypo name="heart" color='#176ba7' size={24} />
                                    </LeftListIcon>
                                    <ContentCardListText>{subtest.rating}</ContentCardListText>
                                    <ContentCardText>Average Rating</ContentCardText>
                                </StyledCard>
                            </Card>
                            <Card>
                                <StyledCard>

                                    <LeftListIcon>
                                        <Entypo name="price-tag" color='#176ba7' size={24} />
                                    </LeftListIcon>
                                    <ContentCardListText>{subtest.price}</ContentCardListText>
                                    <ContentCardText>Starting Price</ContentCardText>
                                </StyledCard>
                            </Card>
                            <Card>
                                <StyledCard>

                                    <LeftListIcon>
                                        <Entypo name="location" color='#176ba7' size={24} />
                                    </LeftListIcon>
                                    <ContentCardListText>{subtest.order}</ContentCardListText>
                                    <ContentCardText>Orders Placed</ContentCardText>
                                </StyledCard>
                            </Card>
                        </ContentCardSlider>




                    </StyledInnerContainer>
                </StyledContainer>
            )
        }

        return (

            <StyledMainContainer>

                <CardTest />
                <Formik
                    initialValues={{ location: '', upload: '', details: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Location"
                                icon="globe"
                                placeholder="Khuda ki basti"
                                keyboardType="email-address"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur("phone")}
                                value={values.phone}
                            />
                            <MyTextInput
                                label="Upload Image"
                                icon="images"
                                placeholder="In JPG Formet"
                                keyboardType="email-address"
                                onChangeText={handleChange('location')}
                                onBlur={handleBlur("location")}
                                value={values.location}
                            />
                            <MyTextInput
                                label="Details"
                                icon="laptop"
                                placeholder="Details About Problem"
                                keyboardType="email-address"
                                onChangeText={handleChange('details')}
                                onBlur={handleBlur("details")}
                                value={values.details}
                            />
                            <StyledButtonContainer>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        ORDER
                                    </ButtonText>
                                </StyledButton>
                                <StyledButton chat={true}>
                                    <ButtonText>
                                        CHAT
                                    </ButtonText>
                                </StyledButton>
                            </StyledButtonContainer>
                        </StyledFormArea>

                    )}
                </Formik>
            </StyledMainContainer>
        );

    }
}


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
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',

        //backgroundColor: '#DCDCDC',
    },
    categoriesListcontainer: {
        //backgroundColor: 'red',
        marginLeft: 7,
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
    SignInText: {
        color: 'blue',
        fontSize: 18,
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

export default connect(mapStateToProp, mapsDispatchToProps)(ListServices);