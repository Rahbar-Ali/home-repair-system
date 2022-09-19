import React, { Component } from 'react';
import { Button, View, Text, ActivityIndicator, StyleSheet, Dimensions, Image, BackHandler, TouchableOpacity, FlatList, ScrollView, NativeModules, ImageBackground, TouchableHighlight, Modal, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';

// import { setLocation } from '../store/actions/index';
// import bgImage from '../assets/images/background.png';

import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";

// import {} from '../store/reducers/reducerMap';
// import { login, forgotPassword, setForgotPassword, setOTPModal } from '../store/actions/index';

import GLOABAL_PATH from '../utils/GlobalPath';
import Constants from '../utils/Constants';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getUserInfo } from '../components/General/LoginUserInfo';
import { sendLocation, setLocation } from '../store/actions/index';
import { Container } from 'native-base';

import * as Animatable from 'react-native-animatable';

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createDrawerNavigator, DrawerRouter } from 'react-navigation-drawer';

// import { TextInput } from 'react-native-paper';

var formData = new FormData();
let maxIndex = 0;
class UserPayment extends Component {

    SendFilesButtonBounceRef = ref => this.view = ref;

    // RegisterSwingRef = ref2 => this.TouchableOpacity  = ref2;
    // ForgetPasswordRubberBandRef = ref => this.TouchableHighlight = ref;

    SendFilesButtonBounce = () => this.view.swing(800).then(endState => console.log(endState.finished ? 'sds' : 'Swing cancelled'));
    // RegisterSwing = () => this.TouchableOpacity.swing(800).then(endState2 => console.log(endState2.finished ? this.onClickRegister() : 'bounce cancelled'));
    // ForgetPasswordBubber = () => this.TouchableHighlight.rubberBand(800).then(endState3 => console.log(endState3.finished ? this.onClickListener('forgot') : 'rubberBand cancelled'));




    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            comments: '',
            loading: false,
        };
    }
    componentWillMount() {

    }// end of componentWillMount

    SendPaymentAndCommentsAndLoginId = () => {
        const { navigation } = this.props;
        // console.log("Navigation Check "+JSON.stringify(navigation));
        const Login = navigation.getParam('Login_Id');
        // console.log("Login Id"+ Login);

        let url = GLOABAL_PATH.API_URL + Constants.ApiController.Login + Constants.ApiActionLogin.UserPayment;

        let JsonObj = {
            Amount: this.state.amount,
            Comments: this.state.comments,
            LoginId: Login
        }

        axios({
            method: 'post', url: url,
            data: JsonObj
        })
            .then(function (res, data) {
                // console.log('axios Post Request is ' + JSON.stringify(res));


                // this.setState({ loading: false });
                // this.setState({ loading: false });
            })
            .catch(function (error) {
                alert(error);
                // this.setState({ loading: false });
            });
        this.props.navigation.navigate('AllUsersQueryForAgent');
    } // end of getUserInfoList

    onSend = () => {
        if (this.state.amount == '' || this.state.comments == '') {
            alert("Please Enter amonut and about some program");
        }
        else {
            this.SendPaymentAndCommentsAndLoginId();
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                {/*  Header Bar Start */}
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, position: 'relative', shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                    <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('AllUserQuery')}>

                        <MaterialIcons name="keyboard-arrow-left" size={32} style={{ color: Constants.Colors.appThemeColor, paddingRight: 2, fontWeight: 'bold' }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>User Payment</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}


                <View style={styles.container}>

                    <View style={styles.innerContainer}>
                        <Text style={styles.TitleText}>Amount</Text>
                        <View style={styles.hr}></View>
                        <View style={styles.btnContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput style={[styles.inputComments, { height: 40, paddingVertical: 10 }]}
                                    keyboardType="number-pad"
                                    value={this.state.amount}
                                    onChangeText={(amount) => this.setState({ amount })}
                                    placeholder={'Enter Amount'} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.innerContainer, { marginBottom: '30%' }]}>
                        <Text style={styles.TitleText}>Tell Him about Solution</Text>
                        <View style={styles.hr}></View>
                        <View style={styles.btnContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput style={[styles.inputComments, { height: 100, paddingVertical: 10, textAlignVertical: 'top' }]} 
                                value={this.state.comments}
                                onChangeText={(comments) => this.setState({ comments })}
                                multiline={true} placeholder={'about problem'} />
                            </View>
                        </View>



                        <View style={{
                            width: '100%',
                            // alignItems: 'center', 
                            justifyContent: 'center',
                            // left: 20,
                            marginTop: '4%',
                            marginBottom: '1%',
                        }}>
                            {/* <Animatable.View ref={this.NextSwingRef}> */}
                            <TouchableOpacity style={[styles.loginButton, { height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 13 }]}
                                onPress={() => this.SendPaymentAndCommentsAndLoginId()}
                            >
                                <View style={{
                                    flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={styles.loginText}>SEND</Text>
                                    <MaterialIcons name="navigate-next" size={32} style={{ color: '#fff', paddingRight: 8 }} />

                                </View>
                            </TouchableOpacity>
                            {/* </Animatable.View> */}
                        </View>
                    </View>


                </View>
            </View>
        );
    } // end of render
}
const styles = StyleSheet.create({
    roundButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    TitleText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 4,
    },
    hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
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
        // marginLeft: '5%',

        // shadowColor: "#808080",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        elevation: 2,
    },
    btnContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
    },
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        width: 200,
        height: 200,
        // backgroundColor: 'red',
        // color: 'red'
    },
    container: {
        display: "flex",
        // backgroundColor: Constants.Colors.appThemeColor,
        backgroundColor: '#ededed',
        height: Dimensions.get("screen").height - 30,
        width: Dimensions.get("screen").width
    },
    input: {
        width: 200,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
    },
    innerContainer: {
        backgroundColor: '#ffffff',
        marginTop: '4%',
        marginRight: '3%',
        marginLeft: '3%',
        // marginBottom: ,
        padding: '4%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        borderRadius: 4,
        // borderBottomColor: '#000000',
        borderWidth: 0.8,
        // display: 'flex',
        // flexDirection: 'column',
    },
    buttonContainer: {
        height: 45,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        // marginLeft: '5%',

        // width: 300,
        borderRadius: 13,
        backgroundColor: 'transparent'
    },
    btnContainer1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
    },
    loginButton: {
        backgroundColor: '#1F618D', //"#00b5ec",
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.50,
        shadowRadius: 14.35,
        elevation: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnContinue: {
        marginTop: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '3%',
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    imgContainer: {
        borderColor: '#002efc',
        borderRadius: 2,
    },
    imgView: {
        width: 120,
        height: '7%',
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: 'red',
        // color: 'red',
        marginVertical: 10,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : "#00BCD4",
        height: 90,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        // marginTop: 80,
        marginLeft: 40,
    },
    containerModal: {
        flexDirection: 'column',
        // height: 200,
        // width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ecf0f1',
        // borderWidth: 2,
        borderColor: '#1F618D',
        // borderRadius: 10,
        // padding: 4,

    },
    middlePart: {
        flex: 0.6,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#FF6608',
        textAlign: 'center',
        textAlignVertical: 'center',
        // padding: 4,
        marginTop: 28,
        color: '#FFFFFF',
        fontSize: 16,
        marginVertical: 1
    },
    bottomPart: {
        flex: 0.4,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#FF6608',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    a: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',


        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor : "#00BCD4",
        backgroundColor: "white",
        height: 170,
        width: '80%',
        //   borderRadius:10,  
        borderWidth: 1.2,
        //   borderColor: '#fff',
        borderColor: '#000000',
        marginTop: Dimensions.get("screen").height * 0.3,
        marginLeft: Dimensions.get("screen").width * 0.1,
    },
    alertMessageTextStyle: {
        color: 'black',
        textAlign: 'justify',
        fontSize: 18,
        // padding: 2,
    },
    alertMsgButton: {
        paddingHorizontal: '18%',
        // marginVertical: 4,
        // borderRadius: 10,
        backgroundColor: '#c6c9cc',
        justifyContent: 'center',
        paddingBottom: 0
    },
    confirmButton: {
        paddingHorizontal: '18%',
        // marginVertical: 4,
        // borderRadius: 10,
        // backgroundColor: '#808FFF',
        backgroundColor: '#1F618D',
        justifyContent: 'center',
        paddingBottom: 0
    },
    alerMsgText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    item: {
        // backgroundColor: '#3232ff',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: 80,
        // margin: 3,
        marginBottom: '2%',
    },
    itemText: {
        color: '#fff',
        fontSize: 20
    },
    inputComments: {
        width: '100%',
        height: 20,
        // backgroundColor: '#f1f3f6',
        backgroundColor: Constants.Colors.lightWhite,
        borderRadius: 5,
        // paddingHorizontal: 10,
        // borderColor: 'blue',
        // borderColor: Constants.Colors.appThemeColor,
        borderColor: 'orange',
        borderWidth: 2
    }

});
const mapStateToProps = state => {
    return {
        latiRedux: state.reducerMap.latitude,
        longRedux: state.reducerMap.longitude,
        loginId: state.reducerLogin.userInfoObject.LoginId,
    };
};
const mapsDispatchToProps = dispatch => {
    return {
        onConfirm: (latitute, longitude, comments, loginId, navigation) => dispatch(sendLocation(latitute, longitude, comments, loginId, navigation)),
    };
}
export default connect(mapStateToProps, mapsDispatchToProps)(UserPayment);